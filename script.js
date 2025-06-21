// Wait until the form is submitted
document.getElementById('carbonForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Stops page from reloading
  
  // STEP 1: Get user inputs
  const electricity = parseFloat(document.getElementById('electricity').value) || 0;
  const miles = parseFloat(document.getElementById('miles').value) || 0;
  
  // STEP 2: Calculate footprint (simplified formula)
  // 0.5 kg CO2 per kWh (average electricity emission factor)
  // 0.3 kg CO2 per mile (average car emission)
  const footprint = (electricity * 0.5 + miles * 0.3).toFixed(2);
  
  // STEP 3: Display results
  document.getElementById('footprintValue').textContent = footprint;
  document.getElementById('result').style.display = 'block'; // Show hidden div
  
  // STEP 4: Generate eco tips
  const tips = [
    "💡 LED bulbs use 75% less energy than incandescent",
    "🚶 Walking 1 mile avoids 0.3kg of CO2",
    "♻️ Recycling can reduce your footprint by 20%"
  ];
  
  // Insert tips into HTML
  document.getElementById('tips').innerHTML = 
    tips.map(tip => `<p>${tip}</p>`).join('');
});
