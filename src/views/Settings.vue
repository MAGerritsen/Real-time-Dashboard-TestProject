<template>
    <main id="settings-page">
      <h1>Instellingen</h1>
      <p>Hieronder kunnen instellingen gewijzigd worden.</p>
      
      <!-- Knop voor het thema -->
      <div class="theme-toggle">
        <button class="theme-button" :class="{ 'active': darkTheme }" @click="toggleTheme">
          <span class="slider"></span>
        </button>
        <label for="theme-switch">Donker thema</label>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const darkTheme = ref(localStorage.getItem('darkTheme') === 'true');
  
  const toggleTheme = () => {
    // Toggle dark theme
    darkTheme.value = !darkTheme.value;
    // Sla de instelling op in de Local Storage
    localStorage.setItem('darkTheme', darkTheme.value.toString());
    // Pas het thema aan
    applyTheme();
  }
  
  // Pas het thema aan bij het laden van de pagina
  onMounted(() => {
    applyTheme();
  });
  
  // Pas de themakleuren toe
  const applyTheme = () => {
    const root = document.documentElement;
    if (darkTheme.value) {
      // Donker thema
      root.style.setProperty('--primary', '#334155');
      root.style.setProperty('--primary-alt', '#64748b');
      root.style.setProperty('--grey', '#f1f5f9');
      root.style.setProperty('--dark', '#4ade80');
      root.style.setProperty('--dark-alt', '#22c55e');
      root.style.setProperty('--light', '#1e293b');
    } else {
      // Licht thema (standaard)
      root.style.setProperty('--primary', '#4ade80');
      root.style.setProperty('--primary-alt', '#22c55e');
      root.style.setProperty('--grey', '#64748b');
      root.style.setProperty('--dark', '#1e293b');
      root.style.setProperty('--dark-alt', '#334155');
      root.style.setProperty('--light', '#f1f5f9');
    }
  }
  </script>
  
  <style scoped>
  /* Stijlen voor de instellingenpagina */
  .theme-toggle {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
  }
  
  .theme-toggle .theme-button {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    background-color: #ccc;
    border-radius: 34px;
    transition: background-color 0.3s;
    cursor: pointer;
    border: none;
  }
  
  .theme-toggle .theme-button .slider {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 28px;
    height: 28px;
    background-color: #fff;
    border-radius: 50%;
    transition: transform 0.3s;
  }
  
  .theme-toggle .theme-button.active {
    background-color: #4ade80;
  }
  
  .theme-toggle .theme-button.active .slider {
    transform: translateX(26px);
  }
  
  .theme-toggle label {
    margin-left: 10px;
  }
  </style>
  