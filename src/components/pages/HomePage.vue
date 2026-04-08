<template>
  <div class="home-page">
    <section class="hero-section">
      <Carousel />
    </section>
    
    <section class="container content-section introduction">
      <h2>徐州红色工业遗产</h2>
      <p>徐州红色工业遗产是中国工业化发展的重要见证，凝聚着无数工人的智慧和汗水。这些遗产不仅记录了徐州工业发展的历程，更传承着红色精神和工业文明。通过保护和利用这些珍贵的历史资源，我们旨在弘扬工业精神，传承红色基因，推动文化与旅游融合发展。</p>
    </section>

    <section class="container content-section heritage-showcase">
      <h2>精选工业遗产</h2>
      <div class="heritage-grid">
        <HeritageCard 
          v-for="heritage in heritages" 
          :key="heritage.id" 
          :title="heritage.title" 
          :image="heritage.image" 
          :description="heritage.description" 
          :link="heritage.link"
        />
      </div>
    </section>

    <section class="container content-section featured">
      <h2>今日推荐</h2>
      <div class="featured-content">
        <div class="featured-item">
          <h3>答题游戏</h3>
          <p>参与工业知识闯关，了解徐州工业历史</p>
          <router-link to="/quiz" class="btn btn-primary">立即参与</router-link>
        </div>
        <div class="featured-item">
          <h3>VR全景地图</h3>
          <p>360°体验徐州工业遗址风貌</p>
          <router-link to="/panorama" class="btn btn-primary">开始探索</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Carousel from '../Carousel.vue';
import HeritageCard from '../HeritageCard.vue';
import coalMineImage from '@/pic/贾汪韩桥煤矿.png';
import railwayImage from '@/pic/徐州老火车站.png';
import textileImage from '@/pic/徐州毛纺厂.png';
import pananLakeImage from '@/pic/潘安湖公园.png';

const heritages = [
  {
    id: 1,
    title: '贾汪煤矿遗址',
    image: coalMineImage,
    description: '始建于1958年，见证了徐州煤炭工业的发展历程',
    link: '/heritage/coal-mine'
  },
  {
    id: 2,
    title: '徐州老火车站',
    image: railwayImage,
    description: '建于1934年，是徐州铁路发展的重要历史见证',
    link: '/heritage/railway'
  },
  {
    id: 3,
    title: '徐州纺织厂',
    image: textileImage,
    description: '创建于1952年，曾是华东地区最大的纺织生产基地之一',
    link: '/heritage/textile'
  },
  {
    id: 4,
    title: '潘安湖矿坑公园',
    image: pananLakeImage,
    description: '由废弃矿坑改造而成，展示工业遗址生态修复成果',
    link: '/heritage/panhan-lake'
  }
];
</script>

<style scoped>
.hero-section {
  width: 100%;
}

.content-section {
  padding: 3rem 0;
}

.content-section h2 {
  color: var(--color-primary);
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  position: relative;
}

.content-section h2:after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background-color: var(--color-accent);
  margin: 0.5rem auto;
}

.introduction {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.introduction p {
  font-size: 1.1rem;
  line-height: 1.8;
}

.heritage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.featured-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
}

.featured-item {
  flex: 1;
  min-width: 280px;
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
  text-align: center;
}

.featured-item h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.featured-item p {
  margin-bottom: 1.5rem;
}
</style> 