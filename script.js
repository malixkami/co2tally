const ecoTips = [
  "Switching to LED bulbs can save 75% of lighting energy!",
  "A vegetarian meal saves 50% CO2 compared to beef.",
  "Line-drying clothes cuts dryer energy use by 100%!",
  "Public transport emits 50% less CO2 than private cars."
];

const funFacts = [
  "🌳 It takes 7 trees 1 year to absorb 1 ton of CO2!",
  "🌊 Oceans absorb 25% of all CO2 emissions!",
  "🚲 Cycling 10km daily saves 700kg CO2/year!",
  "💡 Unplugging devices saves 10% home energy!"
];

function showConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#00ff88', '#00b372']
  });
}

function updateProgress(footprint) {
  const progress = (footprint / 4.8) * 100; // Global avg = 4.8 tons
  document.querySelector('.progress-fill').style.width = `${Math.min(progress, 100)}%`;
}

function showChart(footprint) {
  const ctx = document.getElementById('footprintChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['You', 'USA Avg', 'EU Avg', 'Global Avg'],
      datasets: [{
        label: 'Tons of CO2/year',
        data: [footprint, 16, 8.4, 4.8],
        backgroundColor: ['#00ff88', '#ff6384', '#36a2eb', '#ffcd56']
      }]
    }
  });
}

document.getElementById('carbonForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  // Get input values
  const electricity = parseFloat(document.getElementById('electricity').value) || 0;
  const gas = parseFloat(document.getElementById('gas').value) || 0;
  const miles = parseFloat(document.getElementById('miles').value) || 0;
  const flights = parseFloat(document.getElementById('flights').value) || 0;

  // Conversion factors (example values)
  const electricityFactor = 0.000707; // Metric tons CO2 per kWh
  const gasFactor = 0.005302; // Metric tons CO2 per therm
  const milesFactor = 0.000404; // Metric tons CO2 per mile
  const flightsFactor = 0.18; // Metric tons CO2 per short-haul flight

  // Calculate carbon footprint
  const carbonFootprint =
    electricity * electricityFactor +
    gas * gasFactor +
    miles * milesFactor +
    flights * flightsFactor;

  // Display result
  document.getElementById('footprintValue').textContent = carbonFootprint.toFixed(2);

  // Update all new elements
  document.getElementById('tips').innerHTML = `
    <div class="fun-fact">${funFacts[Math.floor(Math.random() * funFacts.length)]}</div>
    ${ecoTips.map(tip => `<p>✅ ${tip}</p>`).join('')}
  `;

  updateProgress(carbonFootprint);
  showChart(carbonFootprint);
  
  if (carbonFootprint < 4.8) showConfetti();
  
  // New emoji reaction
  const reaction = carbonFootprint < 3 ? '🌿 Awesome!' : 
                   carbonFootprint < 5 ? '👍 Good Start!' : '⚠️ Needs Work!';
  document.querySelector('#result h2').innerHTML = `Your Carbon Footprint: ${reaction}`;
});