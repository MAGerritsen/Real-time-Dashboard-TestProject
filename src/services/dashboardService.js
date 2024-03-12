export function generateRandomData() {
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
  
  export function calculateTotal(energyConsumptionData, powerGenerationData, energyConsumptionTotal, powerGenerationTotal) {
    energyConsumptionTotal.value = energyConsumptionData.value.reduce((acc, val) => acc + val, 0);
    powerGenerationTotal.value = powerGenerationData.value.reduce((acc, val) => acc + val, 0);
  }
  
  export function calculateDifference(energyConsumptionTotal, powerGenerationTotal, energyDifferenceText) {
    const energyDifference = energyConsumptionTotal.value - powerGenerationTotal.value;
    if (energyDifference > 0) {
      energyDifferenceText.value = `+${Math.abs(energyDifference).toFixed(2)} kWh`;
    } else if (energyDifference < 0) {
      energyDifferenceText.value = `-${Math.abs(energyDifference).toFixed(2)} kWh`;
    } else {
      energyDifferenceText.value = '0.00 kWh';
    }
  }
  