<template>
  <div class="spirit-page">
    <div class="page-header">
      <div class="container">
        <h1>煤矿精神</h1>
        <p class="subtitle">艰苦奋斗，无私奉献</p>
      </div>
    </div>
    
    <div class="container">
      <div class="page-content">
        <div class="content-intro">
          <h2>煤矿工人精神</h2>
          <p>徐州煤矿工人在长期的煤炭开采实践中，形成了以"艰苦奋斗、无私奉献、团结协作、安全生产"为核心的煤矿精神。这种精神是徐州工业文化的重要组成部分，也是红色基因传承的重要载体。</p>
        </div>
        
        <div class="spirit-content">
          <div class="spirit-image">
            <img src="/images/heritage/coal-mine.jpg" alt="煤矿工人">
          </div>
          <div class="spirit-text">
            <h3>艰苦奋斗</h3>
            <p>徐州煤矿工人不惧艰险、不怕困难，在极其恶劣的环境中坚持工作，体现了中国工人阶级的优良品质。</p>
            
            <h3>无私奉献</h3>
            <p>煤矿工人不计个人得失，把满足国家能源需求放在首位，展现了崇高的奉献精神。</p>
            
            <h3>团结协作</h3>
            <p>在危险的井下环境中，煤矿工人形成了紧密的团队协作精神，相互帮助、共同进步。</p>
            
            <h3>安全生产</h3>
            <p>煤矿工人始终把安全放在首位，严格遵守操作规程，保障生命安全和生产安全。</p>
          </div>
        </div>
        
        <div class="model-workers">
          <h2>煤矿劳模风采</h2>
          <p class="section-intro">徐州煤矿产生了一批优秀的劳动模范，他们是煤矿精神的杰出代表。</p>
          
          <div class="model-worker-card">
            <div class="worker-info">
              <h3>劳动模范（示例）</h3>
              <p>内容待完善</p>
            </div>
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

.spirit-text h3 {
  color: var(--color-primary);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.spirit-text h3:first-child {
  margin-top: 0;
}

.spirit-text p {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.section-intro {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
}

.model-worker-card {
  background-color: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
  padding: 2rem;
  margin-bottom: 2rem;
}

.worker-info h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
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