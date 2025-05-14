<template>
  <div class="heritage-page">
    <div class="page-header">
      <div class="container">
        <h1>铁路遗产</h1>
        <p class="subtitle">徐州铁路工业的历史足迹</p>
      </div>
    </div>
    
    <div class="container">
      <div class="page-content">
        <div class="content-intro">
          <h2>铁路发展历史</h2>
          <p>徐州作为重要的交通枢纽，铁路工业有着悠久的历史。自津浦铁路和陇海铁路在此交汇以来，徐州的铁路系统不断发展壮大，留下了丰富的铁路工业遗产。这些遗产见证了徐州铁路事业的发展历程，承载着几代铁路工人的奋斗精神和历史记忆。</p>
        </div>
        
        <div class="site-card">
          <div class="site-image">
            <img src="/images/heritage/railway.jpg" alt="徐州老火车站">
          </div>
          <div class="site-info">
            <h3>徐州老火车站</h3>
            <p class="site-description">内容待完善</p>
            <a href="#" class="btn btn-primary">查看详情</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.heritage-page {
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

.content-intro h2 {
  color: var(--color-primary);
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1rem;
}

.content-intro h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: var(--color-accent);
}

.site-card {
  display: flex;
  margin-bottom: 3rem;
  background-color: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.site-image {
  flex: 0 0 40%;
}

.site-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.site-info {
  flex: 0 0 60%;
  padding: 2rem;
}

.site-info h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.site-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.btn {
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .site-card {
    flex-direction: column;
  }
  
  .site-image {
    flex: 0 0 100%;
    height: 250px;
  }
  
  .site-info {
    flex: 0 0 100%;
  }
}
</style> 