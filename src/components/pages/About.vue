<template>
  <div class="about-page">
    <div class="page-header">
      <div class="container">
        <h1>项目介绍</h1>
        <p class="subtitle">徐州红色工业遗产保护与传承</p>
      </div>
    </div>
    
    <div class="container">
      <div class="page-content">
        <div class="content-intro">
          <h2>关于项目</h2>
          <p>徐州红色工业遗产保护项目旨在保存、研究和展示徐州地区丰富的工业遗产，传承工业文明和红色基因。徐州作为中国重要的老工业基地，拥有大量煤矿、铁路、纺织等工业遗产，这些遗产承载着中国近现代工业发展的历史记忆，是中华民族工业化进程的重要见证。</p>
          <p>通过本项目，我们期望让更多人了解徐州工业发展的历史，感受几代工人艰苦奋斗的精神，珍视工业文明的价值，推动工业遗产的保护与活化利用。</p>
        </div>
        
        <div class="project-goals">
          <h2>项目目标</h2>
          <div class="goals-grid">
            <div class="goal-item">
              <h3>遗产保护</h3>
              <p>对徐州地区具有历史、文化、科学和艺术价值的工业建筑、设施和遗址进行系统性保护。</p>
            </div>
            <div class="goal-item">
              <h3>文化传承</h3>
              <p>收集、整理和展示工业发展过程中形成的工业技术、工艺流程和工人精神文化。</p>
            </div>
            <div class="goal-item">
              <h3>教育功能</h3>
              <p>通过展览、参观、互动体验等形式，发挥工业遗产的教育功能，传承红色基因。</p>
            </div>
            <div class="goal-item">
              <h3>旅游发展</h3>
              <p>将工业遗产与文化旅游相结合，促进文旅融合发展，推动区域经济转型。</p>
            </div>
          </div>
        </div>
        
        <div class="project-progress">
          <h2>项目进展</h2>
          <div class="progress-timeline">
            <div class="timeline-item">
              <div class="timeline-year">2018年</div>
              <div class="timeline-content">
                <h3>项目启动</h3>
                <p>徐州市政府批准《徐州工业遗产保护与利用规划》，正式启动工业遗产保护工作。</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2019年</div>
              <div class="timeline-content">
                <h3>资源普查</h3>
                <p>完成徐州地区工业遗产资源普查，建立工业遗产数据库。</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2020年</div>
              <div class="timeline-content">
                <h3>保护修缮</h3>
                <p>对重点工业遗产进行保护修缮，启动煤矿博物馆改造工程。</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2021年</div>
              <div class="timeline-content">
                <h3>展示平台</h3>
                <p>建设工业遗产展示平台，开发红色旅游路线，推出工业遗产体验活动。</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2022年至今</div>
              <div class="timeline-content">
                <h3>持续推进</h3>
                <p>持续推进工业遗产保护与利用，加强宣传推广，扩大社会影响。</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="contact-section">
          <h2>联系我们</h2>
          <p>如果您对徐州红色工业遗产保护项目有任何建议或想要参与其中，欢迎与我们联系。</p>
          <div class="contact-info">
            <p><strong>地址：</strong>徐州市XX区XX路XX号</p>
            <p><strong>电话：</strong>0516-XXXXXXXX</p>
            <p><strong>邮箱：</strong>contact@xuzhou-heritage.org</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.about-page {
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

.content-intro, .contact-section {
  max-width: 800px;
  margin: 0 auto 3rem;
  text-align: center;
}

.content-intro p, .contact-section p {
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

.goals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.goal-item {
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
  text-align: center;
}

.goal-item h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.progress-timeline {
  max-width: 800px;
  margin: 0 auto 4rem;
  position: relative;
}

.progress-timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 120px;
  height: 100%;
  width: 3px;
  background-color: var(--color-secondary);
}

.timeline-item {
  display: flex;
  margin-bottom: 2rem;
  position: relative;
}

.timeline-year {
  width: 100px;
  padding-right: 20px;
  text-align: right;
  font-weight: bold;
  color: var(--color-primary);
  flex-shrink: 0;
  padding-top: 1rem;
}

.timeline-content {
  margin-left: 40px;
  background-color: var(--color-white);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
  position: relative;
}

.timeline-content::before {
  content: '';
  position: absolute;
  top: 20px;
  left: -44px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--color-primary);
  border: 4px solid var(--color-background);
  z-index: 1;
}

.timeline-content h3 {
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.contact-info {
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .goals-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .progress-timeline::before {
    left: 80px;
  }
  
  .timeline-year {
    width: 70px;
  }
  
  .timeline-content {
    margin-left: 30px;
  }
  
  .timeline-content::before {
    left: -34px;
  }
}
</style> 