<template>
  <div class="spirit-page">
    <div class="page-header">
      <div class="container">
        <h1>劳动模范精神</h1>
        <p class="subtitle">献身工业、无私奉献的榜样力量</p>
      </div>
    </div>
    
    <div class="container">
      <div class="page-content">
        <div class="content-intro">
          <h2>劳动模范精神</h2>
          <p>徐州的工业发展史上，涌现出许多优秀的劳动模范，他们是工人阶级的杰出代表，是工业精神的集中体现。这些劳动模范爱岗敬业、艰苦奋斗、勇于创新、无私奉献，为徐州的工业发展作出了重要贡献。</p>
        </div>
        
        <div class="model-workers">
          <div class="worker-card">
            <div class="worker-image">
              <img src="@/pic/煤矿工人照片.png" alt="煤矿劳模">
            </div>
            <div class="worker-info">
              <h3>煤矿劳模</h3>
              <p class="worker-description">煤矿行业的优秀代表，在井下环境中坚守岗位，为保障国家能源安全作出突出贡献。</p>
            </div>
          </div>
          
          <div class="worker-card">
            <div class="worker-image">
              <img src="@/pic/徐州老火车站.png" alt="铁路劳模">
            </div>
            <div class="worker-info">
              <h3>铁路劳模</h3>
              <p class="worker-description">铁路系统的杰出代表，在岗位上兢兢业业，保障铁路运输安全高效。</p>
            </div>
          </div>
          
          <div class="worker-card">
            <div class="worker-image">
              <img src="@/pic/徐州毛纺厂.png" alt="纺织劳模">
            </div>
            <div class="worker-info">
              <h3>纺织劳模</h3>
              <p class="worker-description">纺织行业的杰出代表，精益求精，追求产品质量，推动纺织工业发展。</p>
            </div>
          </div>
        </div>
        
        <div class="spirit-values">
          <h2>劳模精神的核心价值</h2>
          <div class="values-grid">
            <div class="value-item">
              <h3>爱岗敬业</h3>
              <p>热爱本职工作，专心致志，精益求精，追求卓越。</p>
            </div>
            <div class="value-item">
              <h3>艰苦奋斗</h3>
              <p>不畏艰难困苦，克服各种困难，坚持不懈地努力工作。</p>
            </div>
            <div class="value-item">
              <h3>勇于创新</h3>
              <p>不满足于现状，勇于探索新方法、新技术，不断提高工作效率和质量。</p>
            </div>
            <div class="value-item">
              <h3>无私奉献</h3>
              <p>不计个人得失，为集体利益和社会发展无私奉献。</p>
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

.model-workers {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.worker-card {
  background-color: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.worker-image img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.worker-info {
  padding: 1.5rem;
}

.worker-info h3 {
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.worker-description {
  line-height: 1.6;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.value-item {
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
  text-align: center;
}

.value-item h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.value-item p {
  line-height: 1.6;
}

@media (max-width: 768px) {
  .model-workers {
    grid-template-columns: 1fr;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style> 