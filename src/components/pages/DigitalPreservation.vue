<template>
  <div class="digital-preservation-page">
    <div class="page-header">
      <div class="container">
        <h1>数字保存</h1>
        <p class="subtitle">以数字技术延续工业文化的可见、可学与可传播</p>
      </div>
    </div>

    <div class="container">
      <div class="page-content">
        <section class="content-intro">
          <h2>数字保存</h2>
          <p>运用数字技术记录、保存和展示工业文化，实现传统与现代的融合。</p>
        </section>

        <section class="digital-grid">
          <article class="digital-item">
            <h3>三维建模与数字档案</h3>
            <p>通过摄影测量、激光扫描和BIM建模建立工业遗址三维模型，形成可持续更新的数字档案库。</p>
          </article>
          <article class="digital-item">
            <h3>口述史与多媒体采集</h3>
            <p>系统采集工人访谈、设备音频、历史影像与文献资料，构建图文音视频一体化的工业记忆数据库。</p>
          </article>
          <article class="digital-item">
            <h3>线上展示与互动传播</h3>
            <p>借助网页、全景导览、互动地图和社交媒体内容，实现工业文化资源的远程访问、共享与教育传播。</p>
          </article>
          <article class="digital-item">
            <h3>智慧保护与活化利用</h3>
            <p>结合数据监测与可视化分析，为遗址维护、公众参与和文旅开发提供决策支持，提升保护效率与社会价值。</p>
          </article>
        </section>

        <section class="archive-demo">
          <h2>数字档案演示</h2>
          <p class="archive-intro">以下示例基于历史照片构建数字档案卡片，展示“图像 + 元数据 + 预览”的基础保存形态。</p>

          <div class="archive-grid">
            <article
              v-for="item in archiveItems"
              :key="item.id"
              class="archive-card"
              @click="openPreview(item)"
            >
              <div class="archive-image-wrap">
                <img :src="item.image" :alt="item.title" class="archive-image" loading="lazy" />
              </div>
              <div class="archive-body">
                <h3>{{ item.title }}</h3>
                <p class="archive-meta">档案编号：{{ item.id }}</p>
                <p class="archive-meta">年代：{{ item.era }}</p>
                <p class="archive-meta">来源：{{ item.source }}</p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>

    <div v-if="previewItem" class="preview-modal" @click.self="closePreview">
      <div class="preview-panel">
        <button class="preview-close" @click="closePreview">关闭</button>
        <img :src="previewItem.image" :alt="previewItem.title" class="preview-image" />
        <div class="preview-info">
          <h3>{{ previewItem.title }}</h3>
          <p>档案编号：{{ previewItem.id }}</p>
          <p>年代：{{ previewItem.era }}</p>
          <p>来源：{{ previewItem.source }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import photo1 from '@/pic/oldphoto/1970年代初徐州市沛县重修后的歌风台小院.png';
import photo2 from '@/pic/oldphoto/1970年代徐州天桥.png';
import photo3 from '@/pic/oldphoto/1977年徐州淮海纪念馆.png';
import photo4 from '@/pic/oldphoto/1980年代徐州医科大学正门.png';
import photo5 from '@/pic/oldphoto/1980年代徐州火车站广场.png';
import photo6 from '@/pic/oldphoto/1980年代徐州邳县县政府大门.png';
import photo7 from '@/pic/oldphoto/1980年，徐州饭店.png';
import photo8 from '@/pic/oldphoto/1982年徐州睢宁县植物油厂.png';
import photo9 from '@/pic/oldphoto/1983年位于徐州故黄河畔的青少年宫活动大楼.png';
import photo10 from '@/pic/oldphoto/中国矿业大学.png';
import photo11 from '@/pic/oldphoto/徐州师范学院.png';
import photo12 from '@/pic/oldphoto/徐州纺织厂.png';
import photo13 from '@/pic/oldphoto/徐纺俱乐部.png';

const archiveItems = [
  { id: 'XZ-ARCH-001', title: '歌风台小院', era: '1970年代初', source: 'src/pic/oldphoto', image: photo1 },
  { id: 'XZ-ARCH-002', title: '徐州天桥', era: '1970年代', source: 'src/pic/oldphoto', image: photo2 },
  { id: 'XZ-ARCH-003', title: '淮海纪念馆', era: '1977年', source: 'src/pic/oldphoto', image: photo3 },
  { id: 'XZ-ARCH-004', title: '徐州医科大学正门', era: '1980年代', source: 'src/pic/oldphoto', image: photo4 },
  { id: 'XZ-ARCH-005', title: '徐州火车站广场', era: '1980年代', source: 'src/pic/oldphoto', image: photo5 },
  { id: 'XZ-ARCH-006', title: '邳县县政府大门', era: '1980年代', source: 'src/pic/oldphoto', image: photo6 },
  { id: 'XZ-ARCH-007', title: '徐州饭店', era: '1980年', source: 'src/pic/oldphoto', image: photo7 },
  { id: 'XZ-ARCH-008', title: '睢宁县植物油厂', era: '1982年', source: 'src/pic/oldphoto', image: photo8 },
  { id: 'XZ-ARCH-009', title: '青少年宫活动大楼', era: '1983年', source: 'src/pic/oldphoto', image: photo9 },
  { id: 'XZ-ARCH-010', title: '中国矿业大学', era: '历史影像', source: 'src/pic/oldphoto', image: photo10 },
  { id: 'XZ-ARCH-011', title: '徐州师范学院', era: '历史影像', source: 'src/pic/oldphoto', image: photo11 },
  { id: 'XZ-ARCH-012', title: '徐州纺织厂', era: '历史影像', source: 'src/pic/oldphoto', image: photo12 },
  { id: 'XZ-ARCH-013', title: '徐纺俱乐部', era: '历史影像', source: 'src/pic/oldphoto', image: photo13 },
];

const previewItem = ref(null);

const openPreview = (item) => {
  previewItem.value = item;
};

const closePreview = () => {
  previewItem.value = null;
};
</script>

<style scoped>
.digital-preservation-page {
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

.digital-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.digital-item {
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.digital-item h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.digital-item p {
  line-height: 1.7;
}

.archive-demo {
  margin-top: 4rem;
}

.archive-intro {
  max-width: 820px;
  margin: 0 auto 2rem;
  text-align: center;
  line-height: 1.8;
}

.archive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1.25rem;
}

.archive-card {
  border: 1px solid rgba(139, 26, 26, 0.15);
  border-radius: 10px;
  background: var(--color-white);
  box-shadow: var(--shadow);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.archive-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 22px rgba(0, 0, 0, 0.12);
}

.archive-image-wrap {
  height: 160px;
  background: #ececec;
}

.archive-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.archive-body {
  padding: 0.85rem 0.95rem 1rem;
}

.archive-body h3 {
  font-size: 1rem;
  color: var(--color-primary);
  margin-bottom: 0.6rem;
}

.archive-meta {
  font-size: 0.86rem;
  color: #5c5c5c;
  margin: 0.2rem 0;
}

.preview-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.66);
  z-index: 200;
  display: grid;
  place-items: center;
  padding: 1rem;
}

.preview-panel {
  width: min(900px, 96vw);
  max-height: 90vh;
  overflow: auto;
  background: var(--color-white);
  border-radius: 12px;
  padding: 1rem;
}

.preview-close {
  border: 0;
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: 6px;
  padding: 0.45rem 0.8rem;
  cursor: pointer;
  margin-bottom: 0.8rem;
}

.preview-image {
  width: 100%;
  max-height: 65vh;
  object-fit: contain;
  border-radius: 8px;
  background: #f3f3f3;
}

.preview-info {
  padding: 0.75rem 0.3rem 0.2rem;
}

.preview-info h3 {
  color: var(--color-primary);
  margin-bottom: 0.55rem;
}

.preview-info p {
  margin: 0.25rem 0;
}

@media (max-width: 768px) {
  .digital-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .archive-grid {
    grid-template-columns: 1fr;
  }
}
</style>
