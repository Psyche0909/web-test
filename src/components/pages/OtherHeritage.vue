<template>
  <div class="heritage-page">
    <div class="page-header">
      <div class="container">
        <h1>其他工业遗址</h1>
        <p class="subtitle">徐州多元化工业遗产展示</p>
      </div>
    </div>
    
    <div class="container">
      <div class="page-content">
        <div class="content-intro">
          <h2>多样化工业遗产</h2>
          <p>除了煤矿、铁路和纺织厂外，徐州还有丰富多彩的其他类型工业遗址，包括机械制造、冶金、电力、轻工业等多个领域的历史见证。这些工业遗产共同构成了徐州完整的工业文明记忆。</p>
        </div>
        
        <div class="site-card">
          <div class="site-image">
            <img src="/images/heritage/panhan-lake.jpg" alt="潘安湖矿坑公园">
          </div>
          <div class="site-info">
            <h3>潘安湖矿坑公园</h3>
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