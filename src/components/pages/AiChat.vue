<template>
  <div class="chat-container">
    <div class="chat-header">
      <div class="back-button" @click="goBack">
        <i class="icon-back"></i>
      </div>
      <div class="chat-title">
        <h2>AI讲解员</h2>
        <p>徐州红色工业遗产智能助手</p>
      </div>
    </div>
    
    <div class="chat-messages" ref="chatMessagesRef">
      <div class="message-wrapper ai">
        <div class="avatar">
          <img src="../../assets/ai-avatar.png" alt="AI Avatar" />
        </div>
        <div class="message">
          <p>你好！我是小徐，徐州红色工业遗产智能助手。有关于徐州工业遗产的问题，都可以问我哦！</p>
        </div>
      </div>
      
      <div v-for="(msg, index) in messages" :key="index" 
           class="message-wrapper" :class="msg.sender">
        <template v-if="msg.sender === 'ai'">
          <div class="avatar">
            <img src="../../assets/ai-avatar.png" alt="AI Avatar" />
          </div>
          <div class="message">
            <div class="message-content" :class="{ pending: msg.pending }" v-html="renderMessageContent(getMessageRenderContent(msg))"></div>
          </div>
        </template>
        <template v-else>
          <div class="message">
            <p>{{ msg.content }}</p>
          </div>
          <div class="avatar">
            <div class="user-avatar">
              <i class="icon-user"></i>
            </div>
          </div>
        </template>
      </div>
    </div>
    
    <div class="chat-input">
      <div class="input-wrapper">
        <input 
          type="text" 
          v-model="userInput" 
          placeholder="请输入你的问题..." 
          @keyup.enter="sendMessage"
        />
        <button class="send-button" :disabled="!userInput.trim() || isSending" @click="sendMessage">
          <i class="icon-send"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userInput = ref('');
const messages = ref([]);
const chatMessagesRef = ref(null);
const isSending = ref(false);
const typingTimers = new Map();

const aiFallbackMessage = '暂时无法连接千问智能体，请稍后再试。';
const assistantSystemPrompt = [
  '你是“徐州红色工业遗产智能助手”，请用中文回答。',
  '回答要自然、准确、信息密度高，优先结合徐州煤矿、铁路、纺织和工业精神相关内容。',
  '默认采用“先给结论，再分 2 到 4 点展开，最后给一个可执行建议”的结构。',
  '如果用户的问题比较含糊，先说明可能的理解方向，再给最可能的答案，不要只复述问题。',
  '如果用户的问题与徐州红色工业遗产无关，也要正常回答，不要只返回固定模板。',
].join(' ');
const loadingMessage = '正在思考，请稍等...';

const localQaRules = [
  {
    keywords: ['你好', 'hello', 'hi'],
    answer: '你好，我是小徐。今天我可以带你快速了解徐州红色工业遗产的历史脉络与代表点位。',
  },
  {
    keywords: ['徐州', '工业遗产', '概况'],
    answer: '徐州工业遗产以煤矿、铁路和纺织为主线，既有生产设施遗址，也有工人生活与城市工业化记忆。',
  },
  {
    keywords: ['煤矿', '潘安湖', '矿坑'],
    answer: '潘安湖矿坑公园是典型的“工业遗址生态修复”案例，从采煤沉陷区转型为生态与文旅融合空间。',
  },
  {
    keywords: ['铁路', '火车站', '枢纽'],
    answer: '徐州是重要铁路枢纽，老火车站等遗存见证了区域交通与工业扩张的关键阶段。',
  },
  {
    keywords: ['纺织', '毛纺厂', '纺织厂'],
    answer: '徐州纺织遗产反映了近现代轻工业体系的发展，厂区建筑与设备布局体现了当时的生产组织方式。',
  },
  {
    keywords: ['精神', '劳模', '工匠'],
    answer: '徐州工业精神可以概括为：艰苦奋斗、协同攻坚、技术创新与工匠传承，这些精神仍在当代产业中延续。',
  },
  {
    keywords: ['路线', '参观', '打卡', '推荐'],
    answer: '演示路线建议：潘安湖矿坑公园 → 铁路遗产点 → 纺织遗产点。可按“生态修复-交通发展-产业变迁”叙事讲解。',
  },
  {
    keywords: ['谢谢', '再见', 'bye'],
    answer: '不客气，欢迎继续提问。你也可以让我按“时间线”或“主题线”再讲一遍。',
  },
];

const getLocalDemoReply = (prompt) => {
  const normalized = String(prompt || '').toLowerCase();
  const hit = localQaRules.find((rule) => rule.keywords.some((kw) => normalized.includes(kw.toLowerCase())));
  return hit?.answer || '这是本地演示回答：徐州红色工业遗产融合了工业历史、城市记忆和生态更新，是很适合做沉浸式讲解的主题。';
};

const getLocalKnowledgeHint = (prompt) => {
  const normalized = String(prompt || '').toLowerCase();
  const hit = localQaRules.filter((rule) => rule.keywords.some((kw) => normalized.includes(kw.toLowerCase())));

  return hit.length
    ? `本地参考知识：\n${hit.map((item, index) => `${index + 1}. ${item.answer}`).join('\n')}`
    : '';
};

const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const formatInlineText = (value) => escapeHtml(value)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/`([^`]+)`/g, '<code>$1</code>');

const getMessageRenderContent = (message) => message?.displayContent ?? message?.content ?? '';

const clearTypingTimer = (index) => {
  const timerId = typingTimers.get(index);
  if (timerId) {
    clearInterval(timerId);
    typingTimers.delete(index);
  }
};

const finalizeTypingMessage = (index, content) => {
  clearTypingTimer(index);
  const message = messages.value[index];
  if (!message) return;

  messages.value[index] = {
    ...message,
    content,
    displayContent: content,
    pending: false,
  };
};

const animateTypingMessage = (index, content, options = {}) => {
  const { immediate = false } = options;
  const message = messages.value[index];
  if (!message) return;

  const targetContent = String(content ?? '');

  if (immediate) {
    finalizeTypingMessage(index, targetContent);
    return;
  }

  messages.value[index] = {
    ...message,
    content: targetContent,
    displayContent: String(message.displayContent ?? message.content ?? ''),
    pending: true,
  };

  if (typingTimers.has(index)) {
    return;
  }

  const timerId = setInterval(() => {
    const currentMessage = messages.value[index];
    if (!currentMessage) {
      clearTypingTimer(index);
      return;
    }

    const visibleContent = String(currentMessage.displayContent ?? '');
    const currentTarget = String(currentMessage.content ?? '');

    if (visibleContent.length >= currentTarget.length) {
      messages.value[index] = {
        ...currentMessage,
        displayContent: currentTarget,
        pending: false,
      };
      clearTypingTimer(index);
      return;
    }

    const remaining = currentTarget.length - visibleContent.length;
    const step = Math.max(1, Math.ceil(remaining / 6));
    const nextVisible = currentTarget.slice(0, visibleContent.length + step);

    messages.value[index] = {
      ...currentMessage,
      displayContent: nextVisible,
      pending: true,
    };
  }, 24);

  typingTimers.set(index, timerId);
};

const extractDeltaText = (payload) => {
  const choice = payload?.choices?.[0] || payload?.output?.choices?.[0];
  return choice?.delta?.content
    || choice?.message?.content
    || payload?.output?.text
    || payload?.text
    || '';
};

const readStreamText = async (response, onDelta) => {
  if (!response.body) {
    throw new Error('流式响应不可用');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  const flushEvent = (eventText) => {
    const dataLines = eventText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('data:'))
      .map((line) => line.slice(5).trim());

    if (!dataLines.length) return;

    const dataText = dataLines.join('\n');
    if (!dataText || dataText === '[DONE]') return;

    try {
      const payload = JSON.parse(dataText);
      const deltaText = extractDeltaText(payload);
      if (deltaText) {
        onDelta(deltaText);
      }
    } catch (error) {
      const plainText = dataText.replace(/^"|"$/g, '');
      if (plainText && plainText !== '[DONE]') {
        onDelta(plainText);
      }
    }
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    let separatorIndex = buffer.indexOf('\n\n');
    while (separatorIndex !== -1) {
      const eventText = buffer.slice(0, separatorIndex).trim();
      buffer = buffer.slice(separatorIndex + 2);
      if (eventText) {
        flushEvent(eventText);
      }
      separatorIndex = buffer.indexOf('\n\n');
    }
  }

  const tail = buffer.trim();
  if (tail) {
    flushEvent(tail);
  }
};

const renderMessageContent = (content) => {
  const lines = String(content ?? '').replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let paragraphLines = [];
  let listItems = [];
  let listType = null;

  const flushParagraph = () => {
    if (!paragraphLines.length) return;
    blocks.push(`<p>${paragraphLines.join('<br>')}</p>`);
    paragraphLines = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    const tagName = listType === 'ordered' ? 'ol' : 'ul';
    blocks.push(`<${tagName}>${listItems.map((item) => `<li>${item}</li>`).join('')}</${tagName}>`);
    listItems = [];
    listType = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();
    const bulletMatch = trimmed.match(/^[-*•]\s+(.+)$/);
    const orderedMatch = trimmed.match(/^\d+[.)]\s+(.+)$/);

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (bulletMatch || orderedMatch) {
      flushParagraph();

      const currentType = orderedMatch ? 'ordered' : 'unordered';
      if (listType && listType !== currentType) {
        flushList();
      }

      listType = currentType;
      listItems.push(formatInlineText((bulletMatch || orderedMatch)[1]));
      continue;
    }

    flushList();
    paragraphLines.push(formatInlineText(trimmed));
  }

  flushParagraph();
  flushList();

  return blocks.join('');
};

const buildConversationMessages = (prompt) => {
  const recentMessages = messages.value
    .filter((message) => message.sender === 'user' || message.sender === 'ai')
    .filter((message) => !message.pending)
    .slice(0, -1)
    .slice(-6)
    .map((message) => ({
      role: message.sender === 'user' ? 'user' : 'assistant',
      content: message.content,
    }));

  return [
    {
      role: 'system',
      content: [assistantSystemPrompt, getLocalKnowledgeHint(prompt)].filter(Boolean).join('\n\n'),
    },
    ...recentMessages,
    {
      role: 'user',
      content: prompt,
    },
  ];
};

const getAiReply = async (prompt, onDelta) => {
  const response = await fetch('/api/qwen-chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'qwen-plus',
      messages: buildConversationMessages(prompt),
      temperature: 0.6,
      top_p: 0.85,
      stream: true,
      max_tokens: 650,
    }),
  });

  if (!response.ok) {
    let errCode = `HTTP_${response.status}`;
    let errMessage = '请求失败';

    try {
      const errData = await response.json();
      errCode = errData?.code || errCode;
      errMessage = errData?.message || errMessage;
    } catch (e) {
      // Keep default fallback if response body is not JSON.
    }

    throw new Error(`${errCode}: ${errMessage}`);
  }

  if (response.headers.get('content-type')?.includes('text/event-stream')) {
    let content = '';
    await readStreamText(response, (deltaText) => {
      content += deltaText;
      if (typeof onDelta === 'function') {
        onDelta(content);
      }
    });

    return {
      text: content.trim() || aiFallbackMessage,
      streamed: true,
    };
  }

  const data = await response.json();
  return {
    text: extractDeltaText(data).trim() || aiFallbackMessage,
    streamed: false,
  };
};

const sendMessage = async () => {
  if (isSending.value) return;

  const userMessage = userInput.value.trim();
  if (!userMessage) return;
  
  // Add user message
  messages.value.push({
    content: userMessage,
    sender: 'user'
  });
  
  userInput.value = '';
  
  // Wait for DOM update
  await nextTick();
  scrollToBottom();
  
  isSending.value = true;
  const pendingMessageIndex = messages.value.push({
    content: loadingMessage,
    displayContent: loadingMessage,
    sender: 'ai',
    pending: true,
  }) - 1;

  try {
    const aiResult = await getAiReply(userMessage, (content) => {
      animateTypingMessage(pendingMessageIndex, content);
    });

    animateTypingMessage(pendingMessageIndex, aiResult.text, { immediate: !aiResult.streamed });
  } catch (error) {
    console.error(error);
    messages.value[pendingMessageIndex] = {
      content: `连接失败：${error?.message || aiFallbackMessage}\n\n本地参考回答：${getLocalDemoReply(userMessage)}`,
      displayContent: `连接失败：${error?.message || aiFallbackMessage}\n\n本地参考回答：${getLocalDemoReply(userMessage)}`,
      sender: 'ai',
    };
  } finally {
    isSending.value = false;
    nextTick().then(() => {
      scrollToBottom();
    });
  }
};

const scrollToBottom = () => {
  if (chatMessagesRef.value) {
    chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight;
  }
};

const goBack = () => {
  router.push('/ai-agent');
};

onMounted(() => {
  scrollToBottom();
});

onBeforeUnmount(() => {
  typingTimers.forEach((timerId) => clearInterval(timerId));
  typingTimers.clear();
});

watch(messages, () => {
  nextTick().then(() => {
    scrollToBottom();
  });
}, { deep: true });
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  width: min(1200px, calc(100% - 32px));
  max-width: 1200px;
  min-width: 0;
  height: calc(100vh - 80px);
  background-color: #F5F5F5;
  margin: 0 auto;
  overflow-x: hidden;
  box-sizing: border-box;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.06);
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.back-button {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  cursor: pointer;
}

.icon-back {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-left: 2px solid #333;
  border-bottom: 2px solid #333;
  transform: rotate(45deg);
}

.chat-title {
  flex: 1;
}

.chat-title h2 {
  margin: 0;
  font-size: 18px;
  color: #226D4A;
}

.chat-title p {
  margin: 0;
  font-size: 12px;
  color: #888;
}

.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
}

.message-wrapper {
  display: flex;
  gap: 10px;
  max-width: 80%;
  min-width: 0;
}

.message-wrapper.user {
  align-self: flex-end;
}

.message-wrapper.ai {
  align-self: flex-start;
}

.avatar {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.user-avatar {
  width: 100%;
  height: 100%;
  background-color: #2FBB96;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.icon-user {
  font-size: 20px;
}

.message {
  background-color: white;
  padding: 12px 15px;
  border-radius: 18px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-width: 0;
  max-width: 100%;
}

.message-content {
  line-height: 1.7;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
  min-width: 0;
}

.message-content.pending::after {
  content: '▍';
  display: inline-block;
  margin-left: 2px;
  color: #2FBB96;
  animation: caretBlink 1s steps(1) infinite;
}

.message-content :deep(p) {
  margin: 0 0 10px;
}

.message-content :deep(p:last-child) {
  margin-bottom: 0;
}

.message-content :deep(ul),
.message-content :deep(ol) {
  margin: 0 0 10px 20px;
  padding-left: 18px;
}

.message-content :deep(li) {
  margin: 4px 0;
}

.message-content :deep(strong) {
  font-weight: 700;
}

.message-content :deep(code) {
  padding: 2px 6px;
  border-radius: 6px;
  background: #eef2f7;
  font-size: 0.92em;
  overflow-wrap: anywhere;
}

@keyframes caretBlink {
  0%, 49% {
    opacity: 1;
  }

  50%, 100% {
    opacity: 0;
  }
}

.message-wrapper.user .message {
  background-color: #2FBB96;
  color: white;
}

.message p {
  margin: 0;
  line-height: 1.5;
}

.chat-input {
  padding: 15px;
  background-color: white;
}

.input-wrapper {
  display: flex;
  border-radius: 24px;
  background-color: #F5F5F5;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.input-wrapper input {
  flex: 1;
  padding: 12px 20px;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 16px;
}

.send-button {
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2FBB96;
  border: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-button:disabled {
  background-color: #cccccc;
  cursor: default;
}

.send-button:not(:disabled):hover {
  background-color: #229A7A;
}

.icon-send {
  width: 20px;
  height: 20px;
  display: inline-block;
  background-image: url('../../assets/send-icon.svg');
  background-size: contain;
  background-repeat: no-repeat;
}

@media (max-width: 768px) {
  .message-wrapper {
    max-width: 90%;
  }

  .chat-container {
    width: min(100%, calc(100% - 16px));
    max-width: 100%;
  }
}
</style> 