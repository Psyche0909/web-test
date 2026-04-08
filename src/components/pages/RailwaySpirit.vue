<template>
  <div class="spirit-page">
    <div class="page-header">
      <div class="container">
        <h1>铁路精神</h1>
        <p class="subtitle">忠诚担当，精益求精</p>
      </div>
    </div>
    
    <div class="container">
      <div class="page-content">
        <div class="content-intro">
          <h2>铁路工人精神</h2>
          <p>徐州铁路工人在长期的铁路建设和运营实践中，形成了以"忠诚担当、精益求精、安全至上、服务为本"为核心的铁路精神。这种精神是徐州工业文化的重要组成部分，也是红色基因传承的重要载体。</p>
        </div>
        
        <div class="spirit-content">
          <div class="spirit-image">
            <img src="@/pic/徐州老火车站.png" alt="铁路工人">
          </div>
          <div class="spirit-text">
            <p>页面内容待完善</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.spirit-page {
  margin-top: 80px;
}

.page-header {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 3rem 0;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.page-content {
  padding: 3rem 0;
}

.content-intro {
  max-width: 800px;
  margin: 0 auto 3rem;
  text-align: center;
}

.content-intro p {
  margin-bottom: 1rem;
  line-height: 1.8;
}

h2 {
  color: var(--color-primary);
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  position: relative;
  padding-bottom: 1rem;
}

h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: var(--color-accent);
}

.spirit-content {
  display: flex;
  margin-bottom: 4rem;
  gap: 2rem;
}

.spirit-image {
  flex: 0 0 40%;
}

.spirit-image img {
  width: 100%;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.spirit-text {
  flex: 0 0 60%;
}

.spirit-text p {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .spirit-content {
    flex-direction: column;
  }
  
  .spirit-image, .spirit-text {
    flex: 0 0 100%;
  }
}
</style> 