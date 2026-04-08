<template>
  <div class="culture-creative-page">
    <div class="page-header">
      <div class="container">
        <h1>文化创意</h1>
        <p class="subtitle">工业元素的当代表达与生活化转译</p>
      </div>
    </div>

    <div class="container">
      <div class="page-content">
        <section class="content-intro">
          <h2>文化创意</h2>
          <p>将工业元素融入文创产品设计，以现代审美重新诠释工业文化内涵。</p>
        </section>

        <section class="demo-section">
          <h2>文创销售概念演示</h2>
          <div class="sales-demo">
            <article class="product-card">
              <div class="product-image-wrap">
                <img :src="productDemo.image" :alt="productDemo.title" class="product-image" />
              </div>
              <div class="product-content">
                <h3>{{ productDemo.title }}</h3>
                <p>{{ productDemo.description }}</p>
                <div class="product-meta">
                  <span>建议售价：{{ productDemo.price }}</span>
                  <span>定位人群：{{ productDemo.target }}</span>
                </div>
                <div class="purchase-panel">
                  <div class="qty-control">
                    <span>数量</span>
                    <button class="qty-btn" @click="decreaseQty">-</button>
                    <strong>{{ selectedQty }}</strong>
                    <button class="qty-btn" @click="increaseQty">+</button>
                  </div>
                  <div class="purchase-actions">
                    <button class="primary-btn" @click="addToCart">加入购物车</button>
                    <button class="ghost-btn" @click="isCartOpen = true">查看购物车</button>
                  </div>
                  <p v-if="addedHint" class="added-hint">{{ addedHint }}</p>
                </div>
              </div>
            </article>

            <div class="concept-grid">
              <article v-for="point in salesConceptPoints" :key="point.title" class="concept-item">
                <h4>{{ point.title }}</h4>
                <p>{{ point.text }}</p>
              </article>
            </div>
          </div>
        </section>

        <section class="demo-section">
          <h2>工业遗址改造概念演示</h2>
          <p class="demo-intro">以下为遗址改造效果概念图，演示从“保留工业肌理”到“导入公共文化功能”的分阶段更新路径。</p>
          <div class="reconstruction-grid">
            <article
              v-for="item in reconstructionDemos"
              :key="item.title"
              class="reconstruction-card"
            >
              <img :src="item.image" :alt="item.title" class="reconstruction-image" />
              <div class="reconstruction-body">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </article>
          </div>
        </section>

        <section class="demo-section plan-section">
          <h2>文化创意方案</h2>
          <p class="demo-intro">结合徐州工业文化传播目标，以下方案可用于课程汇报、活动策划或产品落地前的概念验证。</p>
          <div class="plan-accordion">
            <article
              v-for="(plan, index) in creativePlans"
              :key="plan.title"
              class="plan-card"
            >
              <button class="plan-header" @click="togglePlan(index)">
                <div>
                  <h3>{{ plan.title }}</h3>
                  <p class="plan-desc">{{ plan.desc }}</p>
                </div>
                <span class="plan-arrow" :class="{ open: activePlanIndex === index }">▾</span>
              </button>

              <div v-if="activePlanIndex === index" class="plan-detail">
                <p class="plan-value"><strong>预期价值：</strong>{{ plan.value }}</p>
                <div class="plan-block">
                  <h4>执行步骤</h4>
                  <ol>
                    <li v-for="step in plan.steps" :key="step">{{ step }}</li>
                  </ol>
                </div>
                <div class="plan-block-inline">
                  <p><strong>预算区间：</strong>{{ plan.budget }}</p>
                  <p><strong>时间排期：</strong>{{ plan.schedule }}</p>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>

    <div v-if="isCartOpen" class="cart-modal" @click.self="isCartOpen = false">
      <div class="cart-panel">
        <div class="cart-header">
          <h3>购物车演示</h3>
          <button class="ghost-btn" @click="isCartOpen = false">关闭</button>
        </div>

        <div v-if="cartQty > 0" class="cart-body">
          <p class="cart-item-title">{{ productDemo.title }}</p>
          <p>单价：{{ currency(cartUnitPrice) }}</p>
          <p>数量：{{ cartQty }}</p>
          <p class="cart-total">小计：{{ currency(cartTotal) }}</p>
          <div class="cart-actions">
            <button class="ghost-btn" @click="isCartOpen = false">继续浏览</button>
            <button class="primary-btn" @click="clearCart">清空购物车</button>
          </div>
        </div>

        <div v-else class="cart-empty">
          <p>购物车为空，先把文创产品加入购物车吧。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import culturalProductImg from '@/pic/culturalproduct/冰箱贴文创.png';
import reconstructionImg1 from '@/pic/reconstruction/改造1.png';
import reconstructionImg2 from '@/pic/reconstruction/改造2.png';
import reconstructionImg3 from '@/pic/reconstruction/改造3.png';

const productDemo = {
  title: '工业主题冰箱贴（概念款）',
  description: '提取矿井井架、齿轮和轨道等工业符号，融合城市地标轮廓，形成兼具纪念属性与日常实用性的文创单品。',
  price: '29-39 元',
  unitPrice: 39,
  target: '游客、研学群体、城市青年',
  image: culturalProductImg,
};

const selectedQty = ref(1);
const cartQty = ref(0);
const addedHint = ref('');
const isCartOpen = ref(false);
const activePlanIndex = ref(0);

const cartUnitPrice = productDemo.unitPrice;
const cartTotal = computed(() => cartQty.value * cartUnitPrice);

const increaseQty = () => {
  selectedQty.value += 1;
};

const decreaseQty = () => {
  if (selectedQty.value > 1) {
    selectedQty.value -= 1;
  }
};

const addToCart = () => {
  cartQty.value += selectedQty.value;
  addedHint.value = `已加入购物车：${selectedQty.value} 件`;
};

const clearCart = () => {
  cartQty.value = 0;
  addedHint.value = '';
};

const currency = (value) => `￥${value.toFixed(2)}`;

const togglePlan = (index) => {
  activePlanIndex.value = activePlanIndex.value === index ? -1 : index;
};

const salesConceptPoints = [
  {
    title: '销售场景',
    text: '景区文创店 + 线上小程序同步发售，满足现场购买与异地复购需求。',
  },
  {
    title: '产品结构',
    text: '基础款、节日限定款、联名款三层产品线，提升持续上新能力。',
  },
  {
    title: '传播机制',
    text: '通过打卡集章、短视频挑战和城市礼物评选，提升社交传播与二次到访率。',
  },
  {
    title: '数据运营',
    text: '以销量、复购率和停留时长为核心指标，反向优化产品主题与陈列策略。',
  },
];

const reconstructionDemos = [
  {
    title: '阶段一：结构保留与安全修复',
    description: '优先保留厂房主体结构和关键工业构件，完成加固、防水与安全动线梳理。',
    image: reconstructionImg1,
  },
  {
    title: '阶段二：公共空间导入',
    description: '在尊重原有空间尺度基础上，导入展陈、工作坊、休闲社交等复合公共功能。',
    image: reconstructionImg2,
  },
  {
    title: '阶段三：夜游与文旅联动',
    description: '通过灯光叙事、数字导览与文创市集联动，形成可持续运营的工业文化消费场景。',
    image: reconstructionImg3,
  },
];

const creativePlans = [
  {
    title: 'IP联动计划',
    desc: '与本地博物馆、高校社团、城市节庆活动共创工业主题 IP 形象，形成限定版文创产品与主题展位联动。',
    value: '增强传播辨识度，提升跨圈层触达和社交平台自然扩散。',
    steps: [
      '确定 1 个主 IP 与 2 个联动机构，统一视觉规范。',
      '上线联名限定款并配套主题快闪展位。',
      '通过短视频挑战和线下打卡活动扩大传播。',
    ],
    budget: '2 万 - 5 万元',
    schedule: '4-6 周（策划 2 周 + 执行 2-4 周）',
  },
  {
    title: '工业记忆系列化产品',
    desc: '围绕“矿井、铁路、纺织”三条主线，持续推出冰箱贴、徽章、手账贴纸、帆布袋等系列化产品。',
    value: '建立稳定产品矩阵，便于分批上新和长期运营。',
    steps: [
      '梳理三大主题素材并完成首批款式打样。',
      '建立基础款 + 限定款的季度上新节奏。',
      '在景区门店与线上渠道同步上架。',
    ],
    budget: '3 万 - 8 万元',
    schedule: '6-10 周（打样 3 周 + 生产与上架 3-7 周）',
  },
  {
    title: '研学体验共创方案',
    desc: '在工业遗址导览中加入文创手作工坊，让参观者现场完成简易工业元素拼贴或徽章设计。',
    value: '提升参与感与停留时长，促进“体验+购买”转化。',
    steps: [
      '设计 45-60 分钟标准化体验流程。',
      '配置导师、材料包与现场动线引导。',
      '设置作品展示区并绑定文创购买优惠。',
    ],
    budget: '1.5 万 - 4 万元',
    schedule: '3-5 周（教案与物料 2 周 + 试运行 1-3 周）',
  },
  {
    title: '线上传播与会员沉淀',
    desc: '通过短视频栏目、数字徽章打卡和线上限定款预售，形成活动话题与用户社群沉淀机制。',
    value: '提高复购率与活动复访率，降低后续推广成本。',
    steps: [
      '搭建账号内容矩阵，发布周更主题内容。',
      '上线数字勋章打卡任务与积分体系。',
      '结合活动节点发起限定款预售。',
    ],
    budget: '2 万 - 6 万元',
    schedule: '8-12 周（冷启动 2 周 + 稳定运营 6-10 周）',
  },
];
</script>

<style scoped>
.culture-creative-page {
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

.demo-section {
  margin-bottom: 4rem;
}

.demo-intro {
  max-width: 840px;
  margin: 0 auto 1.5rem;
  text-align: center;
  line-height: 1.7;
}

.sales-demo {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1.5rem;
}

.product-card {
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: var(--shadow);
  overflow: hidden;
}

.product-image-wrap {
  height: 280px;
  background-color: #ececec;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-content {
  padding: 1.2rem 1.1rem 1.3rem;
}

.product-content h3 {
  color: var(--color-primary);
  margin-bottom: 0.75rem;
  font-size: 1.3rem;
}

.product-content p {
  line-height: 1.7;
  margin-bottom: 0.9rem;
}

.product-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.92rem;
  color: #5c5c5c;
}

.purchase-panel {
  margin-top: 1rem;
  border-top: 1px solid #ececec;
  padding-top: 0.9rem;
}

.qty-control {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
}

.purchase-actions {
  margin-top: 0.8rem;
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
}

.primary-btn,
.ghost-btn {
  border-radius: 6px;
  padding: 0.5rem 0.9rem;
  border: 1px solid var(--color-primary);
  cursor: pointer;
}

.primary-btn {
  background: var(--color-primary);
  color: var(--color-white);
}

.ghost-btn {
  background: transparent;
  color: var(--color-primary);
}

.added-hint {
  margin-top: 0.7rem;
  color: #357a38;
  font-size: 0.9rem;
}

.concept-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.concept-item {
  background-color: var(--color-white);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: var(--shadow);
}

.concept-item h4 {
  color: var(--color-primary);
  margin-bottom: 0.55rem;
}

.concept-item p {
  line-height: 1.65;
}

.reconstruction-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.reconstruction-card {
  background-color: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.reconstruction-image {
  width: 100%;
  height: 210px;
  object-fit: cover;
  display: block;
}

.reconstruction-body {
  padding: 0.95rem;
}

.reconstruction-body h3 {
  color: var(--color-primary);
  font-size: 1.05rem;
  margin-bottom: 0.55rem;
}

.reconstruction-body p {
  line-height: 1.6;
  margin: 0;
}

.cart-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.48);
  z-index: 120;
  display: grid;
  place-items: center;
  padding: 1rem;
}

.cart-panel {
  width: min(460px, 100%);
  background: var(--color-white);
  border-radius: 10px;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.2);
  padding: 1rem;
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
}

.cart-header h3 {
  color: var(--color-primary);
}

.cart-item-title {
  font-weight: 700;
}

.cart-total {
  margin-top: 0.35rem;
  font-size: 1.05rem;
  color: var(--color-primary);
}

.cart-actions {
  margin-top: 0.9rem;
  display: flex;
  gap: 0.7rem;
}

.cart-empty {
  padding: 0.8rem 0.2rem;
  color: #666;
}

.plan-section {
  margin-bottom: 1rem;
}

.plan-accordion {
  display: grid;
  gap: 0.85rem;
}

.plan-card {
  background: var(--color-white);
  border-left: 4px solid var(--color-primary);
  border-radius: 8px;
  box-shadow: var(--shadow);
  overflow: hidden;
}

.plan-header {
  width: 100%;
  border: none;
  background: transparent;
  text-align: left;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
}

.plan-card h3 {
  color: var(--color-primary);
  margin-bottom: 0.55rem;
}

.plan-arrow {
  font-size: 1.1rem;
  color: var(--color-primary);
  transition: transform 0.2s ease;
}

.plan-arrow.open {
  transform: rotate(180deg);
}

.plan-desc {
  line-height: 1.65;
  margin-bottom: 0.55rem;
}

.plan-detail {
  border-top: 1px solid #ececec;
  padding: 0.9rem 1rem 1rem;
  background: #fffdfc;
}

.plan-value {
  color: #555;
  margin: 0 0 0.7rem;
}

.plan-block h4 {
  color: var(--color-primary);
  margin-bottom: 0.45rem;
}

.plan-block ol {
  margin: 0 0 0.75rem 1.1rem;
  line-height: 1.65;
}

.plan-block-inline {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
}

.plan-block-inline p {
  margin: 0;
  color: #555;
}

@media (max-width: 768px) {
  .sales-demo {
    grid-template-columns: 1fr;
  }

  .reconstruction-grid {
    grid-template-columns: 1fr;
  }

  .product-image-wrap {
    height: 220px;
  }

  .plan-block-inline {
    grid-template-columns: 1fr;
  }
}
</style>
