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

// Confetti function
function showConfetti() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#00ff88', '#00b372', '#ffffff'],
    shapes: ['circle', 'square']
  });
}

// Main calculation
document.getElementById('carbonForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get values
  const electricity = parseFloat(document.getElementById('electricity').value) || 0;
  const gas = parseFloat(document.getElementById('gas').value) || 0;
  const miles = parseFloat(document.getElementById('miles').value) || 0;
  const flights = parseFloat(document.getElementById('flights').value) || 0;

  // Calculate
  const carbonFootprint = (electricity * 0.000707) + (gas * 0.005302) + 
                         (miles * 0.000404) + (flights * 0.18);

  // Show result
  document.getElementById('footprintValue').textContent = carbonFootprint.toFixed(2);
  document.getElementById('result').style.display = 'block';
  
  // Show tips
  document.getElementById('tips').innerHTML = `
    <div class="fun-fact">${funFacts[Math.floor(Math.random() * funFacts.length)]}</div>
    ${ecoTips.map(tip => `<p>✅ ${tip}</p>`).join('')}
  `;

  // Trigger confetti for good footprints
  if (carbonFootprint < 4.8) {
    showConfetti();
  }

  // Share button
  document.getElementById('shareBtn').addEventListener('click', function() {
    const shareText = `My carbon footprint is ${carbonFootprint.toFixed(2)} tons CO₂/year. Calculate yours!`;
    if (navigator.share) {
      navigator.share({
        title: 'Carbon Footprint',
        text: shareText,
        url: window.location.href
      });
    } else {
      prompt("Copy to share:", shareText);
    }
  });
});

// Initialize chart
new Chart(document.getElementById('footprintChart').getContext('2d'), {
  type: 'bar',
  data: {
    labels: ['You', 'USA Avg', 'EU Avg', 'Global Avg'],
    datasets: [{
      label: 'CO₂ Emissions (tons/year)',
      data: [0, 16, 8.4, 4.8],
      backgroundColor: ['#00ff88', '#ff6384', '#36a2eb', '#ffcd56']
    }]
  }
});
