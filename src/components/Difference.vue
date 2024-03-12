<template>
    <div class="difference">
      <h2>Verschil</h2>
      <p>{{ energyDifferenceText }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const energyDifference = ref(0);
  
  watch(energyDifference, () => {
    if (energyDifference.value > 0) {
      energyDifferenceText.value = `+${Math.abs(energyDifference.value).toFixed(2)} kWh`;
    } else if (energyDifference.value < 0) {
      energyDifferenceText.value = `-${Math.abs(energyDifference.value).toFixed(2)} kWh`;
    } else {
      energyDifferenceText.value = '0.00 kWh';
    }
  });
  
  const energyDifferenceText = ref('');
  </script>
  
  <style scoped>
  /* Stijlen voor de Difference-component */
  .difference {
    text-align: center;
  }
  </style>
  