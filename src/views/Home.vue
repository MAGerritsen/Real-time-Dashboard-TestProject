<template>
	<main id="Home-page">
	  <h1>Real-time Dashboard</h1>
	  <p>Hieronder is een real-time dashboard te zien.</p>
	
	  <!-- Lijndiagram -->
	  <div class="chart-container">
		<div id="line-chart"></div>
	  </div>
  
	  <!-- Afbeeldingen voor Energieverbruik en Stroomopbrengst -->
	  <div class="image-container">
		<img src="../assets/opbrengst.jpg" alt="Stroomopbrengst" />
		<img src="../assets/verbruik.jpg" alt="Energieverbruik" />
	  </div>
  
	  <!-- Verschil tussen energieverbruik en stroomopbrengst -->
	  <div class="difference">
		<h2>Verschil</h2>
		<p>{{ energyDifferenceText }}</p>
	  </div>
  
	  <!-- Digital Twin -->
	  <div class="digital-twin">
		<div class="data-item">
		  <h2>Stroomopbrengst</h2>
		  <p>{{ powerGenerationTotal.toFixed(1) }} kWh</p>
		</div>
		<div class="data-item">
		  <h2>Energieverbruik</h2>
		  <p>{{ energyConsumptionTotal.toFixed(1) }} kWh</p>
		</div>
	  </div>
	</main>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import Highcharts from 'highcharts';
  
  const darkTheme = ref(localStorage.getItem('darkTheme') === 'true');
  const energyConsumptionData = ref([]);
  const powerGenerationData = ref([]);
  
  function generateRandomData() {
	const data = [];
	const sunriseHour = 8; // Zonsopgang rond 8u
	const sunsetHour = 20; // Zonsondergang rond 20u
  
	for (let i = 0; i < 24; i++) {
	  let value = 0;
	  // Controleer of het uur binnen het tijdsbestek van zonsopgang en zonsondergang valt
	  if (i >= sunriseHour && i <= sunsetHour) {
		// Tussen zonsopgang en zonsondergang is er stroomopbrengst vanwege zonne-energie
		if (i >= 8 && i <= 11) {
		  // Geleidelijke opbouw naar de piek tussen 12u en 15u
		  value = Math.random() * 30 + Math.random() * 30; // Verklein het verschil
		} else if (i >= 12 && i <= 14) {
		  // Piek tussen 12u en 15u
		  value = Math.random() * 150 + Math.random() * 50;
		} else if (i >= 15 && i <= 19) {
		  // Geleidelijke afbouw tot aan zonsondergang
		  value = Math.random() * 30 + Math.random() * 30; // Verklein het verschil
		}
	  }
	  data.push(parseFloat(value.toFixed(2)));
	}
	return data;
  }
  
  watch(darkTheme, () => {
	applyTheme();
  });
  
  const applyTheme = () => {
	Highcharts.setOptions({
	  colors: [darkTheme.value ? '#ffffff' : '#000000']
	});
  }
  
  const lineChartOptions = {
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
	  data: generateRandomData()
	},
	{
	  name: 'Stroomopbrengst',
	  data: generateRandomData()
	}]
  };
  
  onMounted(() => {
	Highcharts.chart('line-chart', lineChartOptions);
	energyConsumptionData.value = lineChartOptions.series[0].data;
	powerGenerationData.value = lineChartOptions.series[1].data;
	calculateTotal();
	calculateDifference();
  });
  
  const energyDifference = ref(0);
  const energyConsumptionTotal = ref(0);
  const powerGenerationTotal = ref(0);
  
  function calculateDifference() {
	energyDifference.value = energyConsumptionTotal.value - powerGenerationTotal.value;
  }
  
  function calculateTotal() {
	energyConsumptionTotal.value = energyConsumptionData.value.reduce((acc, val) => acc + val, 0);
	powerGenerationTotal.value = powerGenerationData.value.reduce((acc, val) => acc + val, 0);
  }
  
  const energyDifferenceText = ref('');
  
  watch(energyDifference, () => {
	if (energyDifference.value > 0) {
	  energyDifferenceText.value = `+${Math.abs(energyDifference.value).toFixed(2)} kWh`;
	} else if (energyDifference.value < 0) {
	  energyDifferenceText.value = `-${Math.abs(energyDifference.value).toFixed(2)} kWh`;
	} else {
	  energyDifferenceText.value = '0.00 kWh';
	}
  });
  </script>
  
  <style scoped>
  /* Stijlen voor de homepagina */
  .chart-container {
	  margin-top: 20px;
	  width: 80%;
	  max-width: 800px;
	  margin: 20px auto;
  }
  
  .digital-twin {
	  display: flex;
	  justify-content: center;
	  margin-top: 10px; /* Verkleinde marge */
  }
  
  .data-item {
	  text-align: center;
	  margin-top: 10px; /* Toegevoegde marge */
  }
  
  .data-item h2 {
	  margin-right: 10px; /* Extra ruimte tussen de woorden */
  }
  
  .image-container {
	  display: flex;
	  justify-content: center; /* Gecentreerd */
	  margin-top: 10px; /* Verkleinde marge */
  }
  
  .image-container img {
	  max-width: 150px;
	  margin: 0 20px; /* Ruimte toegevoegd tussen de afbeeldingen */
  }
  
  .difference {
	  text-align: center;
	  margin-top: 10px;
  }
  </style>
  