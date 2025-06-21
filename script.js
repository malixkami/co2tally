const ecoTips = [
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

// ... (keep all your existing functions) ...

// Share Functionality
document.getElementById('shareBtn')?.addEventListener('click', async () => {
  const footprint = document.getElementById('footprintValue').textContent;
  const reaction = document.querySelector('#result h2').textContent;
  
  try {
    await navigator.share({
      title: "My Carbon Footprint",
      text: `${reaction}\n🌱 My footprint: ${footprint} tons CO₂/year (Global avg: 4.8 tons)\nCalculate yours!`,
      url: window.location.href
    });
  } catch (err) {
    // Fallback
    const shareText = `${reaction}\nMy carbon footprint: ${footprint} tons CO₂/year\nGlobal average: 4.8 tons\n\nCalculate yours: ${window.location.href}`;
    prompt("Copy this message to share:", shareText);
  }
});

// Initialize chart with 0 value on load
showChart(0);
