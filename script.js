const ecoTips = [
document.getElementById('carbonForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const electricity = parseFloat(document.getElementById('electricity').value) || 0;
  const gas = parseFloat(document.getElementById('gas').value) || 0;
  const miles = parseFloat(document.getElementById('miles').value) || 0;
  const flights = parseFloat(document.getElementById('flights').value) || 0;

  const carbonFootprint = (electricity * 0.000707) + (gas * 0.005302) + 
                         (miles * 0.000404) + (flights * 0.18);

  document.getElementById('footprintValue').textContent = carbonFootprint.toFixed(2);
  document.getElementById('result').style.display = 'block';
  
  console.log("Calculation complete!"); // Check if this appears in console
});
