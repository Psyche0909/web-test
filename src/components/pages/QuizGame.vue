<template>
  <div class="quiz-page">
    <div class="page-header">
      <div class="container">
        <h1>工业知识闯关</h1>
        <p class="subtitle">测试你对徐州红色工业遗产的了解</p>
      </div>
    </div>
    
    <div class="container">
      <div class="quiz-container">
        <div class="quiz-intro">
          <div class="intro-content">
            <h2>工业知识挑战</h2>
            <p>通过回答关于徐州工业遗产的问题，测试你的工业文化知识水平！</p>
            <p>每一关都包含不同难度的题目，答对即可获得相应的积分。</p>
            <div class="game-rules">
              <h3>游戏规则</h3>
              <ul>
                <li>每题限时30秒，超时视为答错</li>
                <li>答对得10分，答错不扣分</li>
                <li>连续答对可获得额外加分</li>
                <li>完成所有关卡可获得"工业文化达人"称号</li>
              </ul>
            </div>
            <button class="btn btn-primary">开始挑战</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.quiz-page {
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

.quiz-container {
  max-width: 900px;
  margin: 3rem auto;
  background-color: var(--color-white);
  border-radius: 12px;
  box-shadow: var(--shadow);
  overflow: hidden;
}

.intro-content {
  padding: 3rem;
}

.intro-content h2 {
  color: var(--color-primary);
  margin-bottom: 1.5rem;
}

.intro-content p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.game-rules {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: rgba(139, 26, 26, 0.05);
  border-left: 4px solid var(--color-primary);
  border-radius: 4px;
}

.game-rules h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.game-rules ul {
  padding-left: 1.5rem;
  line-height: 1.8;
}

.btn-primary {
  margin-top: 2rem;
}
</style>
