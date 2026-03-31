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
        <button class="send-button" :disabled="!userInput.trim()" @click="sendMessage">
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

const aiResponses = {
  default: "我理解你的问题，让我思考一下怎么回答...",
  greeting: "你好！很高兴见到你。我可以回答你关于徐州红色工业遗产的问题。",
  history: "徐州是中国重要的工业城市，有着丰富的工业遗产。从煤矿、铁路到纺织工业，徐州的工业历史可以追溯到19世纪末和20世纪初。这些工业设施见证了中国工业化的进程和徐州的发展。",
  mine: "潘安湖矿坑公园是以废弃露天矿坑为基础改造的生态公园，是工业遗址生态修复的典范。公园内保留了原有的工业设施，同时进行了生态修复，形成了独特的景观。",
  railway: "徐州铁路遗产包括徐州老火车站、徐州铁路博物馆等。徐州是中国重要的铁路枢纽，铁路的发展对徐州的工业发展起到了重要推动作用。",
  textile: "徐州的纺织工业遗产主要包括老纺织厂和相关设施。这些遗产反映了徐州纺织工业的发展历程，是徐州工业文化的重要组成部分。"
};

const sendMessage = async () => {
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
  
  // Simulate thinking delay
  setTimeout(() => {
    // Generate AI response based on user input
    let aiResponse = aiResponses.default;
    
    if (userMessage.includes('你好') || userMessage.includes('hi') || userMessage.includes('hello')) {
      aiResponse = aiResponses.greeting;
    } else if (userMessage.includes('历史') || userMessage.includes('工业历史')) {
      aiResponse = aiResponses.history;
    } else if (userMessage.includes('煤矿') || userMessage.includes('潘安湖')) {
      aiResponse = aiResponses.mine;
    } else if (userMessage.includes('铁路')) {
      aiResponse = aiResponses.railway;
    } else if (userMessage.includes('纺织')) {
      aiResponse = aiResponses.textile;
    }
    
    messages.value.push({
      content: aiResponse,
      sender: 'ai'
    });
    
    // Wait for DOM update
    nextTick().then(() => {
      scrollToBottom();
    });
  }, 1000);
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