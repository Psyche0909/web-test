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
            <div
              v-for="item in artItems"
              :key="item.title"
              class="art-item"
              tabindex="0"
            >
              <div class="art-front">
                <h3>{{ item.title }}</h3>
                <p>{{ item.summary }}</p>
              </div>
              <div class="art-hover-text">
                <h4>{{ item.hoverTitle }}</h4>
                <p v-for="line in item.details" :key="line">{{ line }}</p>
              </div>
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
              <router-link to="/culture/creative" class="way-item way-link">
                <h3>文化创意</h3>
                <p>将工业元素融入文创产品设计，以现代审美重新诠释工业文化内涵。</p>
              </router-link>
              <div class="way-item">
                <h3>旅游体验</h3>
                <p>开发工业旅游线路，通过沉浸式体验让游客感受工业文化魅力。</p>
              </div>
              <router-link to="/culture/digital-preservation" class="way-item way-link">
                <h3>数字保存</h3>
                <p>运用数字技术记录、保存和展示工业文化，实现传统与现代的融合。</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const artItems = [
  {
    title: '文学作品',
    summary: '徐州工业题材文学以真实人物与事件为线索，记录产业发展与工人群像。',
    hoverTitle: '文学作品展示',
    details: [
      '纪实文学《追光——徐州有电110年》全景记录电力工业百年变迁。',
      '作家沙凡创作了《星之叹》等煤矿题材作品，展现工人奋斗与奉献。',
      '围绕徐工集团的工业故事作品，生动呈现科研攻关与工匠精神。',
    ],
  },
  {
    title: '影视作品',
    summary: '影视与舞台作品以更直观的方式传播徐州工业精神与时代叙事。',
    hoverTitle: '影视作品展示',
    details: [
      '电影《攀登者》所呈现的“勇攀高峰”精神，常与徐工技术攻坚历程呼应。',
      '工业题材歌舞剧《攀登·攀登》以徐工集团为蓝本，讲述千吨级起重机研发故事。',
      '该剧已在省内外巡演百余场，成为徐州工业文化传播的代表性作品。',
    ],
  },
  {
    title: '音乐艺术',
    summary: '音乐作品通过旋律与节奏表达劳动赞歌，增强工业文化的情感感染力。',
    hoverTitle: '音乐艺术展示',
    details: [
      '徐州市原创音乐展演汇集工业主题歌曲，致敬劳动者与城市工业发展。',
      '《咱们工人有力量》等经典曲目与新时代工人歌曲形成时代对话。',
      '《攀登·攀登》音乐融合劳动号子与交响语言，重现车间生产场景。',
    ],
  },
  {
    title: '美术摄影',
    summary: '绘画与摄影从视觉艺术角度呈现工业遗产、生产现场与劳动之美。',
    hoverTitle: '美术摄影展示',
    details: [
      '工业摄影聚焦起重机、生产线与工人特写，兼具纪实与审美价值。',
      '艺术家通过光影与构图，凸显徐州工业遗产的结构之美与时代感。',
      '工业主题绘画以油画、国画等形式再现“大国重器”与劳动精神。',
    ],
  },
]
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
  position: relative;
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
  text-align: center;
  min-height: 280px;
  overflow: hidden;
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}

.art-item:hover,
.art-item:focus-within {
  transform: translateY(-4px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.14);
}

.art-front {
  transition: opacity 0.25s ease;
}

.art-item h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.art-item p {
  line-height: 1.6;
}

.art-hover-text {
  position: absolute;
  inset: 0;
  background: linear-gradient(165deg, rgba(139, 26, 26, 0.96), rgba(92, 18, 18, 0.95));
  color: var(--color-white);
  text-align: left;
  padding: 1.2rem;
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.28s ease, transform 0.28s ease;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.art-hover-text h4 {
  margin: 0;
  font-size: 1.1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
  padding-bottom: 0.45rem;
}

.art-hover-text p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.5;
}

.art-item:hover .art-front,
.art-item:focus-within .art-front {
  opacity: 0.08;
}

.art-item:hover .art-hover-text,
.art-item:focus-within .art-hover-text {
  opacity: 1;
  transform: translateY(0);
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

.way-link {
  text-decoration: none;
  color: inherit;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.way-link:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.14);
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

  .art-item {
    min-height: 320px;
  }
}
</style> 