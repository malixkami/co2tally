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

// Main calculation function
document.getElementById('carbonForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get input values
  const electricity = parseFloat(document.getElementById('electricity').value) || 0;
  const gas = parseFloat(document.getElementById('gas').value) || 0;
  const miles = parseFloat(document.getElementById('miles').value) || 0;
  const flights = parseFloat(document.getElementById('flights').value) || 0;

  // Calculate carbon footprint
  const carbonFootprint = (electricity * 0.000707) + (gas * 0.005302) + 
                         (miles * 0.000404) + (flights * 0.18);

  // Display result
  document.getElementById('footprintValue').textContent = carbonFootprint.toFixed(2);
  document.getElementById('result').style.display = 'block';
  
  // Show eco tips
  document.getElementById('tips').innerHTML = `
    <div class="fun-fact">${funFacts[Math.floor(Math.random() * funFacts.length)]}</div>
    ${ecoTips.map(tip => `<p>✅ ${tip}</p>`).join('')}
  `;

  // Debug confirmation
  console.log("Calculation successful! Footprint:", carbonFootprint.toFixed(2));
});
