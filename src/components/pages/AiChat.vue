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
            <p>{{ msg.content }}</p>
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
import { ref, onMounted, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userInput = ref('');
const messages = ref([]);
const chatMessagesRef = ref(null);
const isSending = ref(false);
const demoMode = String(import.meta.env.VITE_AI_DEMO || '').toLowerCase() === 'true';

const aiFallbackMessage = '暂时无法连接千问智能体，请稍后再试。';

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

const getAiReply = async (prompt) => {
  const response = await fetch('/api/qwen-agent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: {
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
      parameters: {
        incremental_output: false,
      },
      debug: {},
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

  const data = await response.json();
  return data?.output?.text?.trim()
    || data?.output?.choices?.[0]?.message?.content?.trim()
    || aiFallbackMessage;
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

  if (demoMode) {
    messages.value.push({
      content: getLocalDemoReply(userMessage),
      sender: 'ai'
    });
    isSending.value = false;
    nextTick().then(() => {
      scrollToBottom();
    });
    return;
  }

  try {
    const aiResponse = await getAiReply(userMessage);

    messages.value.push({
      content: aiResponse,
      sender: 'ai'
    });
  } catch (error) {
    console.error(error);
    messages.value.push({
      content: `连接失败：${error?.message || aiFallbackMessage}\n\n已切换为本地演示回答：${getLocalDemoReply(userMessage)}`,
      sender: 'ai'
    });
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
  height: calc(100vh - 80px);
  background-color: #F5F5F5;
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
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message-wrapper {
  display: flex;
  gap: 10px;
  max-width: 80%;
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
}
</style> 