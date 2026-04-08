<template>
  <div class="quiz-page">
    <div class="page-header">
      <div class="container">
        <h1>工业知识问答机器人</h1>
        <p class="subtitle">用对话式问答，测试你对徐州红色工业遗产的了解</p>
      </div>
    </div>

    <div class="container">
      <div class="quiz-container">
        <div v-if="gameState === 'intro'" class="quiz-intro">
          <div class="robot-hero">
            <div class="robot-avatar-card">
              <div class="robot-avatar-wrap">
                <img src="../../assets/ai-avatar.png" alt="答题机器人" />
                <span class="robot-status-dot"></span>
              </div>
              <span class="robot-badge">问答机器人在线</span>
            </div>

            <div class="hero-copy">
              <p class="eyebrow">Industrial QA Bot</p>
              <h2>工业知识问答机器人</h2>
              <p class="hero-description">
                机器人会逐题向你发问，并即时给出判定、解析和积分反馈，让答题更像一次智能对话。
              </p>

              <div class="game-rules compact">
                <h3>机器人工作规则</h3>
                <ul>
                  <li>每题限时30秒，超时自动判定为未作答</li>
                  <li>答对得10分，连续3题正确会触发额外加分</li>
                  <li>机器人会在你作答后立即反馈解析</li>
                  <li>完成全部题目即可获得专属称号</li>
                </ul>
              </div>

              <button class="btn btn-primary start-btn" @click="startGame">启动问答机器人</button>
            </div>
          </div>
        </div>

        <div v-else-if="gameState === 'playing'" class="quiz-playing">
          <div class="quiz-status">
            <div class="status-meta">
              <span class="badge">第{{ currentLevel }}关 · {{ levelName }}</span>
              <span class="question-count">第 {{ currentIndex + 1 }} / {{ totalQuestions }} 题</span>
            </div>
            <div class="timer-wrap" :class="{ danger: timeLeft <= 10 }">
              <span>机器人倒计时</span>
              <strong>{{ timeLeft }}s</strong>
            </div>
          </div>

          <div class="progress-line">
            <div class="progress-value" :style="{ width: `${progress}%` }"></div>
          </div>

          <div class="robot-console">
            <div class="console-header">
              <div class="console-avatar">
                <img src="../../assets/ai-avatar.png" alt="答题机器人" />
              </div>
              <div class="console-meta">
                <strong>小徐问答机器人</strong>
                <span>正在分析题目并等待你的选择</span>
              </div>
            </div>

            <div class="console-body">
              <div class="chat-stream">
                <div class="chat-bubble bot">
                  <div class="bubble-avatar">
                    <img src="../../assets/ai-avatar.png" alt="答题机器人" />
                  </div>
                  <div class="bubble-card">
                    <span class="bubble-label">机器人提问</span>
                    <h2>{{ currentQuestion.question }}</h2>
                    <p>请选择最符合的答案，机器人会在你提交后给出判断和解析。</p>
                  </div>
                </div>

                <div v-if="isAnswered" class="chat-bubble user">
                  <div class="bubble-card user-card">
                    <span class="bubble-label">你的回答</span>
                    <h3>{{ selectedOptionText || '超时未作答' }}</h3>
                  </div>
                  <div class="bubble-avatar user-avatar">你</div>
                </div>

                <div
                  v-if="isAnswered"
                  class="chat-bubble bot"
                  :class="{ correct: lastAnswerCorrect, wrong: !lastAnswerCorrect }"
                >
                  <div class="bubble-avatar">
                    <img src="../../assets/ai-avatar.png" alt="答题机器人" />
                  </div>
                  <div class="bubble-card feedback-card">
                    <span class="bubble-label">机器人反馈</span>
                    <p>{{ feedbackMessage }}</p>
                    <div class="feedback-state" :class="{ correct: lastAnswerCorrect, wrong: !lastAnswerCorrect }">
                      {{ lastAnswerCorrect ? '判定结果：正确' : '判定结果：错误' }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="options-panel">
                <p class="panel-title">选择你的答案</p>
                <div class="options">
                  <button
                    v-for="(option, index) in currentQuestion.options"
                    :key="option"
                    class="option-btn"
                    :class="optionClass(index)"
                    :disabled="isAnswered"
                    @click="selectAnswer(index)"
                  >
                    <span class="option-label">{{ String.fromCharCode(65 + index) }}</span>
                    <span>{{ option }}</span>
                  </button>
                </div>

                <div v-if="isAnswered" class="answer-feedback" :class="{ correct: lastAnswerCorrect, wrong: !lastAnswerCorrect }">
                  <button class="btn btn-primary" @click="goNextQuestion">
                    {{ isLastQuestion ? '查看机器人总结' : '进入下一题' }}
                  </button>
                </div>
              </div>
            </div>

            <div class="score-panel">
              <div class="score-item">
                <small>当前积分</small>
                <strong>{{ score }}</strong>
              </div>
              <div class="score-item">
                <small>当前连击</small>
                <strong>{{ streak }}</strong>
              </div>
              <div class="score-item">
                <small>答对题数</small>
                <strong>{{ correctCount }}</strong>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="quiz-result">
          <div class="result-content robot-result">
            <div class="result-robot-header">
              <div class="console-avatar">
                <img src="../../assets/ai-avatar.png" alt="答题机器人" />
              </div>
              <div>
                <p class="eyebrow">问答完成</p>
                <h2>机器人已生成你的答题报告</h2>
              </div>
            </div>

            <p class="result-title">{{ titleByScore }}</p>
            <div class="result-grid">
              <div class="result-card">
                <small>总得分</small>
                <strong>{{ score }}</strong>
              </div>
              <div class="result-card">
                <small>正确率</small>
                <strong>{{ accuracy }}%</strong>
              </div>
              <div class="result-card">
                <small>最高连击</small>
                <strong>{{ bestStreak }}</strong>
              </div>
            </div>

            <div class="result-actions">
              <button class="btn btn-primary" @click="restartGame">再次启动机器人</button>
              <button class="btn btn-outline" @click="gameState = 'intro'">返回介绍</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'

const QUESTION_TIME = 30
const BASE_SCORE = 10
const BONUS_PER_STREAK = 5

const quizQuestions = [
  {
    level: 1,
    question: '徐州煤矿工业遗产中，被称为近代煤炭工业重要见证的是哪一处？',
    options: ['潘安湖公园', '贾汪韩桥煤矿旧址', '徐州老火车站', '徐州毛纺厂'],
    answer: 1,
    explanation: '贾汪韩桥煤矿旧址承载了徐州煤炭工业发展的关键历史。',
  },
  {
    level: 1,
    question: '徐州老火车站主要体现了哪一类工业遗产价值？',
    options: ['矿业开采', '纺织制造', '铁路交通', '军工制造'],
    answer: 2,
    explanation: '徐州老火车站代表了区域铁路交通与工业物流的发展脉络。',
  },
  {
    level: 2,
    question: '“煤矿工人精神”最核心的价值导向是？',
    options: ['消费主义', '投机创新', '实干奉献与集体协作', '个人英雄主义'],
    answer: 2,
    explanation: '煤矿工人精神强调艰苦奋斗、实干奉献与集体力量。',
  },
  {
    level: 2,
    question: '徐州毛纺厂相关遗产最适合归入哪个工业文化主题？',
    options: ['能源工业', '轻纺工业', '港口工业', '航空工业'],
    answer: 1,
    explanation: '毛纺厂是典型轻纺工业遗产，反映了城市制造业变迁。',
  },
  {
    level: 3,
    question: '工业遗产活化利用中，“保护优先”最合理的做法是？',
    options: ['拆旧建新提高容积率', '仅保留外立面，其余全部重建', '保留核心历史要素并导入新功能', '完全封闭禁止公众接触'],
    answer: 2,
    explanation: '保留核心历史要素并进行适度再利用，是可持续活化的关键。',
  },
  {
    level: 3,
    question: '以下哪项最能体现红色工业遗产的教育价值？',
    options: ['单一商业招商', '沉浸式史料展示与劳动精神课程', '全部改成住宅区', '仅做网红打卡装置'],
    answer: 1,
    explanation: '沉浸式展示结合课程更能系统传承工业历史与精神价值。',
  },
  {
    level: 1,
    question: '徐州工业遗产导览中，最能代表煤炭运输历史记忆的设施是？',
    options: ['老矿区运煤铁路专用线', '城市商业步行街', '现代高架桥', '新区写字楼群'],
    answer: 0,
    explanation: '运煤铁路专用线直接承载了煤炭外运与工业物流的历史功能。',
  },
  {
    level: 2,
    question: '在工业遗产展示设计中，哪种方式更有助于公众理解“工人群体贡献”？',
    options: ['仅展示企业LOGO', '弱化历史叙事强调娱乐互动', '结合口述史与岗位场景复原', '删除所有旧设备'],
    answer: 2,
    explanation: '口述史与场景复原能够具体呈现工人劳动过程和时代价值。',
  },
  {
    level: 3,
    question: '工业遗产数字化保护最关键的基础工作是？',
    options: ['先做大型商业演出', '建立可追溯的档案与三维数据采集', '全部涂刷新漆', '只保留社交媒体短视频'],
    answer: 1,
    explanation: '完整、可追溯的数字档案和三维采集是后续研究与修复的基础。',
  },
  {
    level: 3,
    question: '若要平衡“遗产保护”与“文旅开发”，最合理的策略是？',
    options: ['牺牲历史真实性换取统一商业风格', '分区管理：核心区严格保护，外围区适度运营', '取消公众参观', '整体异地迁建后再复制外观'],
    answer: 1,
    explanation: '分区管理兼顾核心价值保护与公共利用，是常见且有效的平衡路径。',
  },
]

const gameState = ref('intro')
const currentIndex = ref(0)
const score = ref(0)
const streak = ref(0)
const bestStreak = ref(0)
const correctCount = ref(0)
const timeLeft = ref(QUESTION_TIME)
const selectedIndex = ref(null)
const isAnswered = ref(false)
const lastAnswerCorrect = ref(false)

let timerId = null

const totalQuestions = computed(() => quizQuestions.length)
const currentQuestion = computed(() => quizQuestions[currentIndex.value] ?? quizQuestions[0])
const currentLevel = computed(() => currentQuestion.value.level)
const progress = computed(() => {
  if (totalQuestions.value === 0) return 0
  return Math.round(((currentIndex.value + 1) / totalQuestions.value) * 100)
})
const isLastQuestion = computed(() => currentIndex.value === totalQuestions.value - 1)
const selectedOptionText = computed(() => {
  if (selectedIndex.value === null || selectedIndex.value < 0) return ''
  return currentQuestion.value.options[selectedIndex.value] ?? ''
})
const accuracy = computed(() => {
  if (totalQuestions.value === 0) return 0
  return Math.round((correctCount.value / totalQuestions.value) * 100)
})

const levelName = computed(() => {
  if (currentLevel.value === 1) return '初探关'
  if (currentLevel.value === 2) return '进阶关'
  return '达人关'
})

const titleByScore = computed(() => {
  if (score.value >= 75) return '工业文化达人'
  if (score.value >= 55) return '工业文化进阶者'
  return '工业文化探索者'
})

const feedbackMessage = computed(() => {
  const explanation = currentQuestion.value.explanation
  if (lastAnswerCorrect.value) {
    const bonusMessage = streak.value > 0 && streak.value % 3 === 0 ? '触发连击加成 +5 分！' : ''
    return `回答正确！${explanation} ${bonusMessage}`.trim()
  }
  return `回答错误。${explanation}`
})

function startTimer() {
  stopTimer()
  timerId = window.setInterval(() => {
    if (timeLeft.value > 1) {
      timeLeft.value -= 1
      return
    }

    timeLeft.value = 0
    stopTimer()
    if (!isAnswered.value) {
      submitAnswer(-1)
    }
  }, 1000)
}

function stopTimer() {
  if (timerId !== null) {
    window.clearInterval(timerId)
    timerId = null
  }
}

function startGame() {
  gameState.value = 'playing'
  currentIndex.value = 0
  score.value = 0
  streak.value = 0
  bestStreak.value = 0
  correctCount.value = 0
  selectedIndex.value = null
  isAnswered.value = false
  lastAnswerCorrect.value = false
  timeLeft.value = QUESTION_TIME
  startTimer()
}

function selectAnswer(index) {
  if (isAnswered.value) return
  submitAnswer(index)
}

function submitAnswer(index) {
  isAnswered.value = true
  selectedIndex.value = index
  stopTimer()

  const isCorrect = index === currentQuestion.value.answer
  lastAnswerCorrect.value = isCorrect

  if (isCorrect) {
    streak.value += 1
    correctCount.value += 1
    score.value += BASE_SCORE

    if (streak.value % 3 === 0) {
      score.value += BONUS_PER_STREAK
    }

    if (streak.value > bestStreak.value) {
      bestStreak.value = streak.value
    }
  } else {
    streak.value = 0
  }
}

function goNextQuestion() {
  if (isLastQuestion.value) {
    gameState.value = 'result'
    return
  }

  currentIndex.value += 1
  selectedIndex.value = null
  isAnswered.value = false
  lastAnswerCorrect.value = false
  timeLeft.value = QUESTION_TIME
  startTimer()
}

function optionClass(index) {
  if (!isAnswered.value) return ''

  if (index === currentQuestion.value.answer) {
    return 'correct'
  }

  if (index === selectedIndex.value && index !== currentQuestion.value.answer) {
    return 'wrong'
  }

  return 'muted'
}

function restartGame() {
  startGame()
}

onBeforeUnmount(() => {
  stopTimer()
})
</script>

<style scoped>
.quiz-page {
  margin-top: 80px;
  background:
    radial-gradient(circle at top left, rgba(212, 175, 55, 0.16), transparent 28%),
    radial-gradient(circle at top right, rgba(139, 26, 26, 0.12), transparent 24%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.5), rgba(248, 244, 233, 0.9));
}

.page-header {
  background: linear-gradient(135deg, #8b1a1a 0%, #5d1111 100%);
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
  max-width: 1100px;
  margin: 3rem auto;
  background-color: rgba(255, 255, 255, 0.88);
  border-radius: 24px;
  box-shadow: 0 18px 50px rgba(85, 42, 18, 0.14);
  overflow: hidden;
  border: 1px solid rgba(139, 26, 26, 0.08);
}

.quiz-intro {
  padding: 2rem;
}

.quiz-playing,
.result-content {
  padding: 2rem;
}

.robot-hero {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  align-items: center;
}

.robot-avatar-card {
  background: linear-gradient(180deg, rgba(139, 26, 26, 0.08), rgba(212, 175, 55, 0.12));
  border-radius: 24px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid rgba(139, 26, 26, 0.08);
}

.robot-avatar-wrap {
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto 1rem;
}

.robot-avatar-wrap img,
.console-avatar img,
.bubble-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.robot-status-dot {
  position: absolute;
  right: 12px;
  bottom: 18px;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #22c55e;
  box-shadow: 0 0 0 8px rgba(34, 197, 94, 0.16);
}

.robot-badge,
.eyebrow {
  display: inline-block;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: var(--color-primary);
  font-weight: 700;
}

.hero-copy h2,
.result-robot-header h2 {
  color: var(--color-primary);
  font-size: 2.2rem;
  margin-top: 0.4rem;
}

.hero-description {
  line-height: 1.8;
  margin: 1rem 0 0.5rem;
}

.game-rules {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: rgba(139, 26, 26, 0.05);
  border-left: 4px solid var(--color-primary);
  border-radius: 8px;
}

.game-rules.compact {
  margin: 1.5rem 0;
  background: rgba(139, 26, 26, 0.04);
}

.game-rules h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.game-rules ul {
  padding-left: 1.5rem;
  line-height: 1.8;
}

.start-btn {
  margin-top: 0.5rem;
}

.quiz-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.status-meta {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.badge {
  display: inline-block;
  width: fit-content;
  background: rgba(139, 26, 26, 0.1);
  color: var(--color-primary);
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
}

.question-count {
  color: var(--color-secondary);
  font-size: 0.95rem;
}

.timer-wrap {
  background: rgba(255, 255, 255, 0.92);
  border-radius: 999px;
  padding: 0.5rem 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  border: 1px solid rgba(139, 26, 26, 0.1);
}

.timer-wrap strong {
  color: var(--color-primary);
}

.timer-wrap.danger strong {
  color: #d32f2f;
}

.progress-line {
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: #efe7d3;
  overflow: hidden;
  margin-bottom: 1.6rem;
}

.progress-value {
  height: 100%;
  background: linear-gradient(90deg, #8b1a1a, #d4af37);
  transition: width 0.3s ease;
}

.robot-console {
  background: rgba(255, 255, 255, 0.96);
  border-radius: 24px;
  padding: 1.25rem;
  border: 1px solid rgba(139, 26, 26, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85);
}

.console-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.console-avatar {
  width: 58px;
  height: 58px;
  flex-shrink: 0;
}

.console-meta {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.console-meta strong {
  color: var(--color-primary);
}

.console-meta span {
  color: var(--color-secondary);
  font-size: 0.95rem;
}

.console-body {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 1.25rem;
}

.chat-stream {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chat-bubble {
  display: flex;
  gap: 0.8rem;
  align-items: flex-end;
}

.chat-bubble.user {
  justify-content: flex-end;
}

.bubble-avatar {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
}

.user-avatar {
  background: linear-gradient(135deg, var(--color-primary), #6e1515);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.bubble-card {
  flex: 1;
  background: #f8f6f0;
  border: 1px solid rgba(139, 26, 26, 0.08);
  border-radius: 20px;
  padding: 1rem 1.1rem;
  box-shadow: 0 8px 24px rgba(85, 42, 18, 0.06);
}

.chat-bubble.user .bubble-card {
  background: linear-gradient(135deg, rgba(139, 26, 26, 0.08), rgba(212, 175, 55, 0.15));
}

.bubble-label,
.panel-title {
  display: inline-block;
  color: var(--color-secondary);
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.45rem;
}

.bubble-card h2 {
  color: var(--color-primary);
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.bubble-card h3 {
  color: var(--color-primary);
  margin: 0;
}

.bubble-card p {
  line-height: 1.7;
}

.feedback-card p {
  margin-bottom: 0.75rem;
}

.feedback-state {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.86rem;
  font-weight: 700;
}

.feedback-state.correct {
  color: #2e7d32;
  background: rgba(46, 125, 50, 0.1);
}

.feedback-state.wrong {
  color: #c62828;
  background: rgba(198, 40, 40, 0.1);
}

.options-panel {
  background: linear-gradient(180deg, rgba(139, 26, 26, 0.03), rgba(255, 255, 255, 0.92));
  border-radius: 20px;
  padding: 1rem;
  border: 1px solid rgba(139, 26, 26, 0.08);
}

.options {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
}

.option-btn {
  text-align: left;
  border: 1px solid #e3ddd1;
  background: #fff;
  border-radius: 14px;
  padding: 0.9rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

.option-btn:hover:not(:disabled) {
  border-color: #d4af37;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.12);
}

.option-btn:disabled {
  cursor: default;
}

.option-label {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: rgba(139, 26, 26, 0.1);
  color: var(--color-primary);
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.option-btn.correct {
  border-color: #2e7d32;
  background: rgba(46, 125, 50, 0.08);
}

.option-btn.wrong {
  border-color: #c62828;
  background: rgba(198, 40, 40, 0.08);
}

.option-btn.muted {
  opacity: 0.72;
}

.answer-feedback {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.answer-feedback.correct,
.answer-feedback.wrong {
  background: transparent;
  border: none;
  padding: 0;
}

.score-panel {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
}

.score-item {
  background: linear-gradient(180deg, rgba(249, 246, 239, 0.95), rgba(255, 255, 255, 0.95));
  border-radius: 14px;
  padding: 0.85rem;
  text-align: center;
  border: 1px solid rgba(139, 26, 26, 0.06);
}

.score-item small {
  display: block;
  color: var(--color-secondary);
}

.score-item strong {
  font-size: 1.4rem;
  color: var(--color-primary);
}

.quiz-result {
  text-align: center;
}

.robot-result {
  padding: 2.5rem;
}

.result-robot-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.result-title {
  margin-bottom: 1.4rem;
  color: var(--color-primary);
  font-weight: 700;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
  margin: 1rem 0 1.5rem;
}

.result-card {
  background: linear-gradient(180deg, rgba(249, 246, 239, 0.95), rgba(255, 255, 255, 0.95));
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid rgba(139, 26, 26, 0.06);
}

.result-card small {
  display: block;
  color: var(--color-secondary);
}

.result-card strong {
  font-size: 1.5rem;
  color: var(--color-primary);
}

.result-actions {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
}

.btn-outline:hover {
  background: rgba(139, 26, 26, 0.08);
}

.btn-primary {
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .quiz-intro,
  .quiz-playing,
  .result-content {
    padding: 1.25rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .quiz-status,
  .answer-feedback,
  .result-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .robot-hero,
  .console-body {
    grid-template-columns: 1fr;
  }

  .result-robot-header {
    flex-direction: column;
  }

  .score-panel,
  .result-grid {
    grid-template-columns: 1fr;
  }

  .btn-primary {
    margin-top: 1rem;
  }
}
</style>
