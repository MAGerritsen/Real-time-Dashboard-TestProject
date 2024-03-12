<template>
    <div class="chart-container" ref="chartContainer"></div>
  </template>
  
  <script setup>
  import Highcharts from 'highcharts';
  import { onMounted, ref, defineProps } from 'vue';
  
  const { energyConsumptionData, powerGenerationData } = defineProps();
  const chartContainer = ref(null);
  
  onMounted(() => {
    Highcharts.chart(chartContainer.value, {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Energieverbruik en stroomopbrengst'
      },
      xAxis: {
        type: 'category',
        categories: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`)
      },
      series: [{
        name: 'Energieverbruik',
        data: energyConsumptionData
      },
      {
        name: 'Stroomopbrengst',
        data: powerGenerationData
      }]
    });
  });
  </script>
  
  <style scoped>
  /* Stijlen voor het lijndiagram */
  .chart-container {
    width: 100%;
    height: 400px; /* Pas de hoogte aan indien nodig */
  }
  </style>
  