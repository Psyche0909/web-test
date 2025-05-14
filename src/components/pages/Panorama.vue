<template>
  <div class="panorama-page">
    <div class="page-header">
      <div class="container">
        <h1>全景展示</h1>
        <p class="subtitle">徐州工业遗产虚拟漫游</p>
      </div>
    </div>
    
    <div class="container">
      <div class="page-content">
        <div class="content-intro">
          <h2>工业遗产全景体验</h2>
          <p>通过现代VR技术，我们为您提供徐州工业遗址的全景虚拟体验。足不出户，即可身临其境地参观徐州的煤矿、铁路、纺织厂等工业遗产场所，感受工业文明的历史风貌。</p>
        </div>
        
        <div class="panorama-container">
          <div class="panorama-placeholder">
            <div class="placeholder-content">
              <h3>全景功能开发中</h3>
              <p>敬请期待全景虚拟漫游功能的上线！</p>
            </div>
          </div>
          
          <div class="panorama-instruction">
            <h3>全景浏览指南</h3>
            <ul>
              <li>点击场景中的热点可以切换到不同的场景</li>
              <li>拖动鼠标可以360°环视当前场景</li>
              <li>使用鼠标滚轮可以放大缩小视图</li>
              <li>点击信息图标可以查看相关历史介绍</li>
            </ul>
          </div>
        </div>
        
        <div class="panorama-locations">
          <h2>全景地点</h2>
          <div class="locations-grid">
            <div class="location-card">
              <div class="location-image">
                <img src="/images/heritage/coal-museum.jpg" alt="徐州煤矿博物馆">
              </div>
              <div class="location-info">
                <h3>徐州煤矿博物馆</h3>
                <p>全景浏览煤矿博物馆，了解煤矿的历史展览</p>
                <button class="btn btn-primary" disabled>即将上线</button>
              </div>
            </div>
            
            <div class="location-card">
              <div class="location-image">
                <img src="/images/heritage/railway.jpg" alt="徐州老火车站">
              </div>
              <div class="location-info">
                <h3>徐州老火车站</h3>
                <p>虚拟参观老火车站，感受铁路发展历史</p>
                <button class="btn btn-primary" disabled>即将上线</button>
              </div>
            </div>
            
            <!-- <div class="location-card">
              <div class="location-image">
                <img src="/images/heritage/textile.jpg" alt="徐州纺织厂">
              </div>
              <div class="location-info">
                <h3>徐州纺织厂</h3>
                <p>全景体验纺织厂区，了解纺织工业历史</p>
                <button class="btn btn-primary" disabled>即将上线</button>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.panorama-page {
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

.panorama-container {
  display: flex;
  gap: 2rem;
  margin-bottom: 4rem;
}

.panorama-placeholder {
  flex: 0 0 60%;
  background-color: var(--color-secondary);
  height: 400px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  text-align: center;
}

.placeholder-content h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.panorama-instruction {
  flex: 0 0 40%;
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.panorama-instruction h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.panorama-instruction ul {
  padding-left: 1.5rem;
}

.panorama-instruction li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.locations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.location-card {
  background-color: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.location-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.location-info {
  padding: 1.5rem;
}

.location-info h3 {
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.location-info p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #a52a2a;
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .panorama-container {
    flex-direction: column;
  }
  
  .panorama-placeholder, .panorama-instruction {
    flex: 0 0 100%;
  }
  
  .panorama-placeholder {
    height: 300px;
  }
  
  .locations-grid {
    grid-template-columns: 1fr;
  }
}
</style> 