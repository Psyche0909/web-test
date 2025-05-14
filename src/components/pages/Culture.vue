<template>
  <div class="culture-page">
    <div class="page-header">
      <div class="container">
        <h1>工业文化</h1>
        <p class="subtitle">徐州工业遗产背后的文化内涵</p>
      </div>
    </div>
    
    <div class="container">
      <div class="page-content">
        <div class="content-intro">
          <h2>工业文化的内涵</h2>
          <p>工业文化是以工业生产为基础，在长期的工业实践中形成的物质文化和精神文化的总和。徐州的工业文化植根于煤矿、铁路、纺织等传统工业，既包含了工业遗产这一物质文化载体，也蕴含着工人精神这一宝贵的精神财富。</p>
        </div>
        
        <div class="culture-grid">
          <div class="culture-item">
            <h3>物质文化</h3>
            <div class="culture-content">
              <p>工业建筑、生产设备、工具器具、产品样品等构成了徐州工业的物质文化，这些实物见证了徐州工业发展的历史进程，承载着丰富的技术和工艺信息。</p>
              <ul>
                <li>工厂厂房：具有时代特色的工业建筑</li>
                <li>生产设备：各时期的机器设备和工具</li>
                <li>产品实物：煤炭、纺织品等工业产品</li>
                <li>技术资料：图纸、手册、操作规程等</li>
              </ul>
            </div>
          </div>
          
          <div class="culture-item">
            <h3>非物质文化</h3>
            <div class="culture-content">
              <p>工业技术、工艺流程、管理制度、工人精神等构成了徐州工业的非物质文化，这些无形的文化遗产同样是工业文明的重要组成部分。</p>
              <ul>
                <li>技术技能：传统工艺和操作技能</li>
                <li>劳动组织：工业生产的组织形式</li>
                <li>工业精神：艰苦奋斗、团结协作等精神品质</li>
                <li>工业记忆：工人的生活故事和回忆</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="culture-section">
          <h2>文学艺术中的徐州工业</h2>
          <div class="art-grid">
            <div class="art-item">
              <h3>文学作品</h3>
              <p>徐州的工业题材文学作品，描绘了工人的生活和劳动场景，表现了工人阶级的精神面貌。</p>
            </div>
            
            <div class="art-item">
              <h3>影视作品</h3>
              <p>以徐州工业为背景的影视作品，记录了工业发展的历史变迁，讲述了工人的感人故事。</p>
            </div>
            
            <div class="art-item">
              <h3>音乐艺术</h3>
              <p>徐州工业题材的歌曲和音乐作品，表达了对工业发展的赞美和对工人的敬意。</p>
            </div>
            
            <div class="art-item">
              <h3>美术摄影</h3>
              <p>以徐州工业为题材的绘画、摄影作品，从艺术角度展现了工业遗产的美学价值。</p>
            </div>
          </div>
        </div>
        
        <div class="culture-heritage">
          <h2>工业文化的传承与创新</h2>
          <div class="heritage-content">
            <p>徐州工业文化的传承与创新，既要保护好工业遗产，也要赋予其新的时代内涵，推动工业文化与现代生活的融合。</p>
            <div class="heritage-ways">
              <div class="way-item">
                <h3>教育传承</h3>
                <p>通过学校教育、社会教育等方式，向年轻一代传授工业知识，传承工业精神。</p>
              </div>
              <div class="way-item">
                <h3>文化创意</h3>
                <p>将工业元素融入文创产品设计，以现代审美重新诠释工业文化内涵。</p>
              </div>
              <div class="way-item">
                <h3>旅游体验</h3>
                <p>开发工业旅游线路，通过沉浸式体验让游客感受工业文化魅力。</p>
              </div>
              <div class="way-item">
                <h3>数字保存</h3>
                <p>运用数字技术记录、保存和展示工业文化，实现传统与现代的融合。</p>
              </div>
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
.culture-page {
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

.culture-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

.culture-item {
  background-color: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.culture-item h3 {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 1rem;
  margin: 0;
  text-align: center;
  font-size: 1.5rem;
}

.culture-content {
  padding: 2rem;
}

.culture-content p {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.culture-content ul {
  padding-left: 1.5rem;
}

.culture-content li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.culture-section {
  margin-bottom: 4rem;
}

.art-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.art-item {
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
  text-align: center;
}

.art-item h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.art-item p {
  line-height: 1.6;
}

.heritage-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.heritage-content > p {
  margin-bottom: 2rem;
  line-height: 1.8;
}

.heritage-ways {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.way-item {
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
  text-align: center;
}

.way-item h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.way-item p {
  line-height: 1.6;
}

@media (max-width: 768px) {
  .culture-grid {
    grid-template-columns: 1fr;
  }
  
  .art-grid, .heritage-ways {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style> 