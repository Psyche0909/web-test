<script setup>
import NavBar from './components/NavBar.vue'
import Carousel from './components/Carousel.vue'
import HeritageCard from './components/HeritageCard.vue'
</script>

<template>
  <div class="app-container">
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <h1>徐州红色工业遗产</h1>
          </div>
          <NavBar />
        </div>
      </div>
    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-info">
            <p>版权所有 © 2023 中矿大徐州红色工业遗产保护大创团队</p>
            <p>地址：江苏省徐州市中国矿业大学</p>
          </div>
          <div class="footer-links">
            <a href="#">关于我们</a>
            <a href="#">联系方式</a>
            <a href="#">隐私政策</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
@import './assets/main.css';

:root {
  --color-primary: #8B1A1A; /* 故宫红 */
  --color-secondary: #666; /* 工业灰 */
  --color-accent: #D4AF37; /* 鎏金 */
  --color-background: #F8F4E9; /* 米黄色 */
  --color-white: #fff;
  --color-black: #333;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

body {
  background-color: var(--color-background);
  color: var(--color-black);
  font-family: "Microsoft YaHei", "SimSun", sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  background-color: var(--color-primary);
  color: var(--color-white);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  box-shadow: var(--shadow);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

main {
  margin-top: 80px;
  flex: 1;
}

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

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.btn-primary:hover {
  background-color: #7a1717;
}

.footer {
  background-color: var(--color-secondary);
  color: var(--color-white);
  padding: 2rem 0;
  width: 100%;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  color: var(--color-white);
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
  color: var(--color-accent);
}

@media (max-width: 768px) {
  .logo h1 {
    font-size: 1.2rem;
  }
  
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .footer-links {
    margin-top: 1rem;
  }
}
</style>
