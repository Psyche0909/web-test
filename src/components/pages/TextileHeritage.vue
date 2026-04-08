<template>
  <div class="heritage-page">
    <div class="page-header">
      <div class="container">
        <h1>纺织厂遗产</h1>
        <p class="subtitle">徐州纺织工业的历史沿革</p>
      </div>
    </div>
    
    <div class="container">
      <div class="page-content">
        <div class="content-intro">
          <h2>纺织工业历史</h2>
          <p>徐州纺织工业始于20世纪50年代，是计划经济时期徐州重要的工业部门之一。经过数十年的发展，徐州纺织工业留下了丰富的工业文化遗产，这些遗产记录了徐州纺织工业的发展历程和纺织工人的辛勤劳动。</p>
        </div>
        
        <div class="site-card">
          <div class="site-image">
            <img src="@/pic/徐州毛纺厂.png" alt="徐州纺织厂">
          </div>
          <div class="site-info">
            <h3>徐州纺织厂</h3>
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