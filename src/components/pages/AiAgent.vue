<template>
  <div class="ai-agent-container">
    <div class="ai-agent-content">
      <div class="ai-avatar-section">
        <div class="avatar-container">
          <div class="avatar-header">
            <h2>AI讲解员</h2>
            <p class="avatar-subtitle">徐州红色工业遗产</p>
          </div>
          <div class="avatar-image" @click="goToChat">
            <img src="../../assets/ai-avatar.png" alt="AI Avatar" />
          </div>
          <div class="avatar-welcome">
            <p>你好！期待与你畅聊工业文化~</p>
          </div>
          <div class="action-buttons">
            <button class="btn-chat" @click="goToChat">
              <i class="icon-chat"></i>
              开始对话
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bottom-nav">
      <div class="nav-item" @click="navigateTo('/panorama')">
        <i class="icon-map"></i>
        <span>全景地图</span>
      </div>
      <div class="nav-item" @click="navigateTo('/culture')">
        <i class="icon-culture"></i>
        <span>工业文化</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};

const goToChat = () => {
  router.push('/ai-chat');
};
</script>

<style scoped>
.ai-agent-container {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px);
  background-color: #ECFBF3; /* 浅绿背景 */
  padding: 20px;
  position: relative;
}

.ai-agent-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ai-avatar-section {
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.avatar-container {
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 20px auto;
}

.avatar-header {
  margin-bottom: 20px;
}

.avatar-header h2 {
  font-size: 28px;
  color: #226D4A; /* 深绿色 */
  margin-bottom: 5px;
}

.avatar-subtitle {
  color: #888;
  font-size: 14px;
}

.avatar-image {
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.avatar-image:hover {
  transform: scale(1.05);
}

.avatar-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.avatar-welcome {
  margin-bottom: 30px;
  color: #333;
}

.action-buttons {
  display: flex;
  justify-content: center;
}

.btn-chat {
  background-color: #2FBB96; /* 绿色按钮 */
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 30px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s;
}

.btn-chat:hover {
  background-color: #229A7A;
}

.icon-chat {
  width: 20px;
  height: 20px;
  background-image: url('../../assets/chat-icon.svg');
  background-size: contain;
  background-repeat: no-repeat;
}

.bottom-nav {
  display: flex;
  justify-content: center;
  gap: 60px;
  padding: 15px 0;
  background-color: white;
  border-radius: 20px;
  margin-top: auto;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 10px 20px;
  color: #888;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #2FBB96;
}

.nav-item i {
  font-size: 24px;
  margin-bottom: 5px;
}

.icon-map {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url('../../assets/map-icon.svg');
  background-size: contain;
  background-repeat: no-repeat;
}

.icon-culture {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url('../../assets/culture-icon.svg');
  background-size: contain;
  background-repeat: no-repeat;
}

@media (max-width: 768px) {
  .avatar-container {
    padding: 20px;
  }
  
  .avatar-header h2 {
    font-size: 24px;
  }
  
  .avatar-image {
    width: 150px;
    height: 150px;
  }
  
  .bottom-nav {
    gap: 30px;
  }
}
</style> 