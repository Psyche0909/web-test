<template>
  <div class="spirit-page">
    <div class="page-header">
      <div class="container">
        <h1>其他工业精神</h1>
        <p class="subtitle">协同攻坚，守正创新</p>
      </div>
    </div>

    <div class="container">
      <div class="page-content">
        <div class="content-intro">
          <h2>徐州工业精神的延展</h2>
          <p>除了煤矿、铁路和纺织等典型行业外，徐州在机械制造、能源保障、城市建设等领域也形成了丰富的工业精神积淀。这些精神共同构成了徐州工业文化的完整图谱。</p>
        </div>

        <div class="values-grid">
          <div class="value-item">
            <h3>协同攻坚</h3>
            <p>面对复杂工程与生产任务，工人、技术人员和管理团队密切协作，共同完成关键项目。</p>
          </div>
          <div class="value-item">
            <h3>守正创新</h3>
            <p>在传承成熟工艺和管理经验的基础上，不断探索新技术、新流程和新应用。</p>
          </div>
          <div class="value-item">
            <h3>精益求精</h3>
            <p>以高标准要求生产与服务，持续打磨细节，提升质量与效率。</p>
          </div>
          <div class="value-item">
            <h3>扎根基层</h3>
            <p>把岗位作为事业的起点，在平凡岗位上沉淀出不平凡的价值。</p>
          </div>
        </div>

        <div class="spirit-note">
          <h2>精神内核</h2>
          <p>这些工业精神并非孤立存在，而是在徐州不同工业门类中相互交织、共同生长，构成了这座城市的产业底色与文化自信。</p>
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

.content-intro p,
.spirit-note p {
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

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.value-item {
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.value-item h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.value-item p {
  line-height: 1.7;
}

.spirit-note {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

@media (max-width: 768px) {
  .values-grid {
    grid-template-columns: 1fr;
  }
}
</style>