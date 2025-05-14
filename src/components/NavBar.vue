<template>
  <nav class="navbar">
    <div class="hamburger" @click="toggleMobileMenu">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
    <ul class="nav-menu" :class="{ 'active': isMobileMenuOpen }">
      <li class="nav-item">
        <router-link to="/" class="nav-link" @click="closeMobileMenu">首页</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about" class="nav-link" @click="closeMobileMenu">项目介绍</router-link>
      </li>
      <li class="nav-item dropdown" :class="{ 'active': isDropdownOpen.heritage }">
        <a href="#" class="nav-link dropdown-toggle" @click.prevent="toggleDropdown('heritage')">工业遗产</a>
        <ul class="dropdown-menu">
          <li><router-link to="/heritage/coal-mine" class="dropdown-item" @click="closeMobileMenu">煤矿遗产</router-link></li>
          <li><router-link to="/heritage/railway" class="dropdown-item" @click="closeMobileMenu">铁路遗产</router-link></li>
          <li><router-link to="/heritage/textile" class="dropdown-item" @click="closeMobileMenu">纺织厂遗产</router-link></li>
          <li><router-link to="/heritage/others" class="dropdown-item" @click="closeMobileMenu">其他工业遗址</router-link></li>
        </ul>
      </li>
      <li class="nav-item dropdown" :class="{ 'active': isDropdownOpen.spirit }">
        <a href="#" class="nav-link dropdown-toggle" @click.prevent="toggleDropdown('spirit')">红色精神</a>
        <ul class="dropdown-menu">
          <li><router-link to="/spirit/coal-mine" class="dropdown-item" @click="closeMobileMenu">煤矿精神</router-link></li>
          <li><router-link to="/spirit/railway" class="dropdown-item" @click="closeMobileMenu">铁路精神</router-link></li>
          <li><router-link to="/spirit/model-worker" class="dropdown-item" @click="closeMobileMenu">劳模精神</router-link></li>
          <li><router-link to="/spirit/others" class="dropdown-item" @click="closeMobileMenu">其他工业精神</router-link></li>
        </ul>
      </li>
      <li class="nav-item">
        <router-link to="/quiz" class="nav-link" @click="closeMobileMenu">答题游戏</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/panorama" class="nav-link" @click="closeMobileMenu">全景地图</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/culture" class="nav-link" @click="closeMobileMenu">文创</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, reactive } from 'vue';

const isMobileMenuOpen = ref(false);
const isDropdownOpen = reactive({
  heritage: false,
  spirit: false
});

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  // Close all dropdowns when toggling the mobile menu
  isDropdownOpen.heritage = false;
  isDropdownOpen.spirit = false;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  // Close all dropdowns
  isDropdownOpen.heritage = false;
  isDropdownOpen.spirit = false;
};

const toggleDropdown = (dropdown) => {
  if (window.innerWidth <= 768) {
    isDropdownOpen[dropdown] = !isDropdownOpen[dropdown];
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
  margin: 0 0.5rem;
}

.nav-link {
  display: block;
  color: var(--color-white);
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: var(--color-accent);
}

.router-link-active {
  color: var(--color-accent);
}

.dropdown-toggle {
  position: relative;
  padding-right: 1.5rem;
}

.dropdown-toggle::after {
  content: '';
  position: absolute;
  right: 0.5rem;
  top: 50%;
  border: solid var(--color-white);
  border-width: 0 2px 2px 0;
  padding: 3px;
  transform: translateY(-50%) rotate(45deg);
  transition: all 0.3s ease;
}

.dropdown:hover .dropdown-toggle::after {
  transform: translateY(-50%) rotate(-135deg);
  border-color: var(--color-accent);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: rgba(139, 26, 26, 0.9); /* 毛玻璃效果 */
  backdrop-filter: blur(8px);
  min-width: 180px;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 10;
  border-radius: 4px;
  box-shadow: var(--shadow);
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  color: var(--color-white);
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-accent);
}

/* Hamburger menu */
.hamburger {
  display: none;
  cursor: pointer;
}

.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  background-color: var(--color-white);
  transition: all 0.3s ease-in-out;
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
    margin-left: auto;
  }
  
  .hamburger.active .bar:nth-child(2) {
    opacity: 0;
  }
  
  .hamburger.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  
  .hamburger.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  .nav-menu {
    position: fixed;
    top: 80px;
    right: -100%;
    flex-direction: column;
    width: 80%;
    height: calc(100vh - 80px);
    background-color: var(--color-primary);
    transition: all 0.3s ease;
    padding: 1rem;
    z-index: 99;
    overflow-y: auto;
  }

  .nav-menu.active {
    right: 0;
  }

  .nav-item {
    margin: 0.5rem 0;
    width: 100%;
  }
  
  .nav-link {
    padding: 0.75rem 1rem;
  }

  .dropdown-menu {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    background-color: rgba(255, 255, 255, 0.05);
    box-shadow: none;
    display: none;
    width: 100%;
    padding: 0;
    margin-top: 0.5rem;
  }

  .dropdown.active .dropdown-menu {
    display: block;
  }

  .dropdown-toggle::after {
    right: 1rem;
  }
}
</style> 