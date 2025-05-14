<template>
  <div class="heritage-card">
    <div class="card-image">
      <img :src="image" :alt="title">
      <div class="card-overlay">
        <router-link :to="link" class="btn-view">查看详情</router-link>
      </div>
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.heritage-card {
  background-color: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.heritage-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.card-image {
  position: relative;
  overflow: hidden;
  height: 200px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.heritage-card:hover .card-image img {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(139, 26, 26, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.heritage-card:hover .card-overlay {
  opacity: 1;
}

.btn-view {
  color: var(--color-white);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 2px solid var(--color-white);
  border-radius: 4px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-view:hover {
  background-color: var(--color-white);
  color: var(--color-primary);
}

.card-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  color: var(--color-primary);
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.card-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 40px;
  background-color: var(--color-accent);
}

.card-description {
  color: var(--color-secondary);
  margin: 0;
  line-height: 1.5;
}
</style> 