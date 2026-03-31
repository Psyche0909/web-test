<template>
  <div class="ai-assistant-container">
    <div 
      class="ai-assistant-icon" 
      @mousedown="startDrag"
      @touchstart="startTouchDrag"
      @mouseenter="startHoverTimer"
      @mouseleave="clearHoverTimer"
      :style="{ left: position.x + 'px', top: position.y + 'px' }"
      ref="iconRef"
    >
      <img src="../assets/ai-avatar.png" alt="AI Assistant" />
      <div class="debug-hover" v-if="debugMode">
        {{ hoverTimeLeft }}s
      </div>
    </div>
    
    <!-- 简化聊天框 -->
    <div 
      v-show="showChatBox" 
      class="mini-chat-box"
      :style="chatBoxPositionStyle"
    >
      <div class="chat-connector" 
           :class="{ 'left-connector': !chatBoxPosition.isLeft }"
           style="bottom: 15px"></div>
      <div class="chat-header">
        <div class="chat-title">
          <h3>AI讲解员</h3>
          <p>徐州红色工业遗产智能助手</p>
        </div>
        <div class="chat-actions">
          <button class="expand-btn" @click="navigateToAiAgent">
            <span class="expand-icon"></span>
          </button>
          <button class="close-btn" @click="closeChatBox">
            <span class="close-icon"></span>
          </button>
        </div>
      </div>
      
      <div class="chat-messages">
        <div class="message ai-message">
          <div class="message-avatar">
            <img src="../assets/ai-avatar.png" alt="AI Avatar" />
          </div>
          <div class="message-content">
            <p>你好！我是小徐，徐州红色工业遗产智能助手。有什么可以帮助你的吗？</p>
          </div>
        </div>

        <div v-for="(msg, index) in messages" :key="index" 
             :class="['message', msg.sender === 'ai' ? 'ai-message' : 'user-message']">
          <template v-if="msg.sender === 'ai'">
            <div class="message-avatar">
              <img src="../assets/ai-avatar.png" alt="AI Avatar" />
            </div>
            <div class="message-content">
              <p>{{ msg.content }}</p>
            </div>
          </template>
          <template v-else>
            <div class="message-content user-content">
              <p>{{ msg.content }}</p>
            </div>
            <div class="message-avatar user-avatar">
              <div class="avatar-inner">
                <span>我</span>
              </div>
            </div>
          </template>
        </div>
      </div>
      
      <div class="chat-input">
        <input 
          type="text" 
          v-model="userInput" 
          placeholder="请输入你的问题..." 
          @keyup.enter="sendMessage"
        />
        <button class="send-btn" @click="sendMessage">
          <span class="send-icon"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted, computed } from 'vue';

const router = useRouter();
const iconRef = ref(null);
const isDragging = ref(false);
const isMobile = ref(false);
const position = ref({ x: 20, y: window.innerHeight - 80 });
const offset = ref({ x: 0, y: 0 });
const lastTouchTime = ref(0);
const dragStartPos = ref({ x: 0, y: 0 });
const hasDragged = ref(false);

// 悬停计时器相关变量
const hoverTimer = ref(null);
const hoverInterval = ref(null);
const hoverTimeLeft = ref(1);
const showChatBox = ref(false);
const userInput = ref('');
const messages = ref([]);
const debugMode = ref(false); // 设为true可以显示调试信息

// 检测是否为移动设备
const checkMobileDevice = () => {
  isMobile.value = window.innerWidth <= 768;
  adjustPositionForSize();
};

// 根据设备类型调整位置
const adjustPositionForSize = () => {
  // 如果位置已经保存，则不调整
  const savedPosition = localStorage.getItem('aiAssistantPosition');
  if (savedPosition) return;
  
  // 默认位置
  if (isMobile.value) {
    // 移动设备默认位置
    position.value = { x: 20, y: window.innerHeight - 80 };
  } else {
    // 桌面设备默认位置
    position.value = { x: 30, y: window.innerHeight - 100 };
  }
};

// 计算聊天框位置，根据图标位置确定
const chatBoxPosition = computed(() => {
  const iconSize = isMobile.value ? 60 : 150;
  const chatBoxWidth = isMobile.value ? 300 : 350;

  // 图标底部距离窗口底部的距离
  const bottomDistance = window.innerHeight - position.value.y - iconSize;

  // 聊天框左右位置
  const hasRightSpace = position.value.x + iconSize + chatBoxWidth <= window.innerWidth - 20;
  const hasLeftSpace = position.value.x - chatBoxWidth >= 20;
  const isLeft = !hasRightSpace && hasLeftSpace;
  let x;
  if (isLeft) {
    x = position.value.x - chatBoxWidth - 15;
  } else {
    x = position.value.x + iconSize + 15;
  }
  if (x < 10) x = 10;

  return {
    x,
    bottom: bottomDistance,
    isLeft
  };
});

// 计算聊天框样式
const chatBoxPositionStyle = computed(() => {
  return {
    left: `${chatBoxPosition.value.x}px`,
    bottom: `${chatBoxPosition.value.bottom}px`
  };
});

const navigateToAiAgent = () => {
  router.push('/ai-agent');
};

const startHoverTimer = () => {
  // 清除可能存在的计时器
  clearHoverTimer();
  
  // 重置倒计时
  hoverTimeLeft.value = 1;
  
  // 创建倒计时间隔，每秒更新一次
  if (debugMode.value) {
    hoverInterval.value = setInterval(() => {
      hoverTimeLeft.value -= 0.1;
      hoverTimeLeft.value = Math.max(0, parseFloat(hoverTimeLeft.value.toFixed(1)));
    }, 100);
  }
  
  // 设置新的计时器，1秒后显示聊天框
  hoverTimer.value = setTimeout(() => {
    showChatBox.value = true;
    console.log('显示聊天框'); // 调试信息
    
    // 清除间隔计时器
    if (hoverInterval.value) {
      clearInterval(hoverInterval.value);
      hoverInterval.value = null;
    }
  }, 1000); // 从3秒改为1秒
};

const clearHoverTimer = () => {
  if (hoverTimer.value) {
    clearTimeout(hoverTimer.value);
    hoverTimer.value = null;
  }
  
  if (hoverInterval.value) {
    clearInterval(hoverInterval.value);
    hoverInterval.value = null;
  }
};

const closeChatBox = () => {
  showChatBox.value = false;
};

const sendMessage = () => {
  if (!userInput.value.trim()) return;
  
  // 添加用户消息
  messages.value.push({
    content: userInput.value,
    sender: 'user'
  });
  
  const userMsg = userInput.value;
  
  // 清空输入框
  userInput.value = '';
  
  // 模拟AI回复
  setTimeout(() => {
    let response = "我理解你的问题，建议您点击展开按钮进入完整聊天界面，获得更详细的回答。";
    
    // 简单的关键词回复
    if (userMsg.includes('你好') || userMsg.includes('hi') || userMsg.includes('hello')) {
      response = "你好！很高兴为您服务。请问有什么关于徐州工业遗产的问题吗？";
    } else if (userMsg.includes('工业') || userMsg.includes('遗产')) {
      response = "徐州的工业遗产非常丰富，包括煤矿、铁路、纺织等多个领域。您可以点击展开按钮了解更多详情。";
    }
    
    messages.value.push({
      content: response,
      sender: 'ai'
    });
    
    // 滚动到底部
    setTimeout(() => {
      const chatMessages = document.querySelector('.chat-messages');
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }, 100);
  }, 1000);
};

const startDrag = (event) => {
  // 防止拖动时显示聊天框
  clearHoverTimer();
  
  // 阻止默认行为以避免文本选择
  event.preventDefault();
  
  // 记录起始位置以检测是否为点击或拖动
  dragStartPos.value = { x: event.clientX, y: event.clientY };
  hasDragged.value = false;
  
  // 设置拖动状态
  isDragging.value = true;
  
  // 计算点击相对于图标位置的偏移
  const rect = iconRef.value.getBoundingClientRect();
  offset.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
  
  // 添加拖动事件监听器
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
};

const startTouchDrag = (event) => {
  // 阻止默认行为以避免滚动
  event.preventDefault();
  
  // 设置拖动状态
  isDragging.value = true;
  
  // 保存触摸开始时间以区分点击和拖动
  lastTouchTime.value = new Date().getTime();
  
  // 记录起始位置以检测是否为点击或拖动
  const touch = event.touches[0];
  dragStartPos.value = { x: touch.clientX, y: touch.clientY };
  hasDragged.value = false;
  
  // 计算触摸相对于图标位置的偏移
  const rect = iconRef.value.getBoundingClientRect();
  offset.value = {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
  
  // 添加触摸拖动事件监听器
  document.addEventListener('touchmove', onTouchDrag, { passive: false });
  document.addEventListener('touchend', stopTouchDrag);
  document.addEventListener('touchcancel', stopTouchDrag);
};

const onDrag = (event) => {
  if (isDragging.value) {
    // 计算基于鼠标位置和偏移的新位置
    const newX = event.clientX - offset.value.x;
    const newY = event.clientY - offset.value.y;
    
    // 检查是否拖动超过5像素
    if (Math.abs(event.clientX - dragStartPos.value.x) > 5 || 
        Math.abs(event.clientY - dragStartPos.value.y) > 5) {
      hasDragged.value = true;
    }
    
    // 获取正确的图标尺寸
    const iconSize = isMobile.value ? 60 : 150;
    
    // 设置新位置
    position.value = {
      x: Math.max(0, Math.min(newX, window.innerWidth - iconSize)),
      y: Math.max(0, Math.min(newY, window.innerHeight - iconSize))
    };
    
    // 保存位置到localStorage
    savePosition();
  }
};

const onTouchDrag = (event) => {
  if (isDragging.value) {
    // 阻止默认行为以停止滚动
    event.preventDefault();
    
    const touch = event.touches[0];
    
    // 检查是否拖动超过5像素
    if (Math.abs(touch.clientX - dragStartPos.value.x) > 5 || 
        Math.abs(touch.clientY - dragStartPos.value.y) > 5) {
      hasDragged.value = true;
    }
    
    // 计算基于触摸位置和偏移的新位置
    const newX = touch.clientX - offset.value.x;
    const newY = touch.clientY - offset.value.y;
    
    // 获取正确的图标尺寸
    const iconSize = isMobile.value ? 60 : 150;
    
    // 设置新位置
    position.value = {
      x: Math.max(0, Math.min(newX, window.innerWidth - iconSize)),
      y: Math.max(0, Math.min(newY, window.innerHeight - iconSize))
    };
    
    // 保存位置到localStorage
    savePosition();
  }
};

const stopDrag = (event) => {
  isDragging.value = false;
  
  // 移除事件监听器
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  
  // 保存最终位置
  savePosition();
  
  // 如果是点击（非拖动），则导航
  if (!hasDragged.value) {
    navigateToAiAgent();
  }
};

const stopTouchDrag = (event) => {
  // 移除事件监听器
  document.removeEventListener('touchmove', onTouchDrag);
  document.removeEventListener('touchend', stopTouchDrag);
  document.removeEventListener('touchcancel', stopTouchDrag);
  
  // 保存最终位置
  savePosition();
  
  // 检查是否为点击（短触摸）或拖动
  const touchDuration = new Date().getTime() - lastTouchTime.value;
  
  // 如果是短触摸（小于300毫秒）且没有明显移动，则视为点击
  if (touchDuration < 300 && !hasDragged.value) {
    navigateToAiAgent();
  }
  
  isDragging.value = false;
};

const savePosition = () => {
  localStorage.setItem('aiAssistantPosition', JSON.stringify(position.value));
};

const loadPosition = () => {
  const savedPosition = localStorage.getItem('aiAssistantPosition');
  if (savedPosition) {
    position.value = JSON.parse(savedPosition);
  }
};

// 处理窗口调整大小以确保图标保持在视口内
const handleResize = () => {
  // 检查设备类型
  checkMobileDevice();
  
  // 调整位置确保图标在视口内
  const iconSize = isMobile.value ? 60 : 150;
  position.value = {
    x: Math.min(position.value.x, window.innerWidth - iconSize),
    y: Math.min(position.value.y, window.innerHeight - iconSize)
  };
  savePosition();
};

onMounted(() => {
  // 检测设备类型
  checkMobileDevice();
  
  // 加载保存的位置
  loadPosition();
  
  // 添加调整大小事件监听器
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  // 清理事件监听器
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchmove', onTouchDrag);
  document.removeEventListener('touchend', stopTouchDrag);
  document.removeEventListener('touchcancel', stopTouchDrag);
  window.removeEventListener('resize', handleResize);
  
  // 清除悬停计时器
  clearHoverTimer();
});
</script>

<style scoped>
.ai-assistant-container {
  position: relative;
}

.ai-assistant-icon {
  position: fixed;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  cursor: grab;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  user-select: none;
  touch-action: none;
}

/* 桌面端更大的图标 */
@media (min-width: 769px) {
  .ai-assistant-icon {
    width: 150px;
    height: 150px;
  }
}

.ai-assistant-icon:hover {
  transform: scale(1.1);
}

.ai-assistant-icon:active {
  cursor: grabbing;
}

.ai-assistant-icon img {
  width: 90%;
  height: 90%;
  border-radius: 50%;
  object-fit: cover;
  pointer-events: none;
}

.debug-hover {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
}

/* 简化聊天框样式 */
.mini-chat-box {
  position: fixed;
  width: 300px;
  height: 400px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 999;
  overflow: hidden;
}

/* 连接器样式 */
.chat-connector {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: white;
  transform: rotate(45deg);
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  z-index: -1;
}

.chat-connector.left-connector {
  right: -10px;
  left: auto;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
}

.chat-connector:not(.left-connector) {
  left: -10px;
  box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.1);
}

/* 桌面端更大的聊天框 */
@media (min-width: 769px) {
  .mini-chat-box {
    width: 350px;
    height: 450px;
  }
}

/* 桌面端连接器位置调整 */
@media (min-width: 769px) {
  .chat-connector {
    width: 24px;
    height: 24px;
  }
  
  .chat-connector.left-connector {
    right: -12px;
  }
  
  .chat-connector:not(.left-connector) {
    left: -12px;
  }
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 15px;
  background-color: #226D4A;
  color: white;
}

.chat-title h3 {
  margin: 0;
  font-size: 16px;
}

.chat-title p {
  margin: 0;
  font-size: 12px;
  opacity: 0.8;
}

.chat-actions {
  display: flex;
  gap: 8px;
}

.expand-btn, .close-btn {
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.expand-btn:hover, .close-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.expand-icon {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-top: 2px solid white;
  border-right: 2px solid white;
  transform: rotate(45deg);
}

.close-icon {
  display: inline-block;
  width: 14px;
  height: 14px;
  position: relative;
}

.close-icon:before, .close-icon:after {
  content: '';
  position: absolute;
  width: 14px;
  height: 2px;
  background-color: white;
  top: 50%;
  left: 0;
}

.close-icon:before {
  transform: rotate(45deg);
}

.close-icon:after {
  transform: rotate(-45deg);
}

.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background-color: #F5F5F5;
}

.message {
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  align-items: flex-start;
}

.user-message {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  margin-bottom: 15px;
  gap: 8px;
}

.message-avatar {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
}

/* 桌面端更大的头像 */
@media (min-width: 769px) {
  .message-avatar {
    width: 36px;
    height: 36px;
  }
}

.message-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.user-avatar .avatar-inner {
  width: 100%;
  height: 100%;
  background-color: #2FBB96;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
}

/* 桌面端更大的字体 */
@media (min-width: 769px) {
  .user-avatar .avatar-inner {
    font-size: 14px;
  }
}

.message-content {
  background-color: white;
  padding: 10px 12px;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  max-width: 80%;
}

.message-content p {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
}

/* 桌面端更大的字体 */
@media (min-width: 769px) {
  .message-content p {
    font-size: 15px;
  }
}

.ai-message .message-content {
  background-color: #E6F7F2;
}

.user-content {
  background-color: #2FBB96 !important;
  color: white;
}

.chat-input {
  display: flex;
  padding: 10px;
  background-color: white;
  border-top: 1px solid #EEEEEE;
}

.chat-input input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #DDDDDD;
  border-radius: 20px;
  outline: none;
  font-size: 14px;
}

/* 桌面端更大的输入框 */
@media (min-width: 769px) {
  .chat-input input {
    padding: 10px 15px;
    font-size: 15px;
  }
}

.chat-input input:focus {
  border-color: #226D4A;
}

.send-btn {
  width: 32px;
  height: 32px;
  margin-left: 8px;
  background-color: #2FBB96;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 桌面端更大的发送按钮 */
@media (min-width: 769px) {
  .send-btn {
    width: 36px;
    height: 36px;
  }
}

.send-btn:hover {
  background-color: #229A7A;
}

.send-icon {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-left: 10px solid white;
  border-bottom: 6px solid transparent;
  margin-left: 2px;
}

/* 桌面端更大的发送图标 */
@media (min-width: 769px) {
  .send-icon {
    border-top: 7px solid transparent;
    border-left: 12px solid white;
    border-bottom: 7px solid transparent;
  }
}
</style>