document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const electricitySlider = document.getElementById('electricity');
    const gasSlider = document.getElementById('gas');
    const milesSlider = document.getElementById('miles');
    const flightsSlider = document.getElementById('flights');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsCard = document.getElementById('resultsCard');
    const footprintResult = document.getElementById('footprintResult');
    const circleFill = document.getElementById('circleFill');
    const tipsList = document.getElementById('tipsList');
    const funFact = document.getElementById('funFact');
    const newFactBtn = document.getElementById('newFactBtn');
    const carMiles = document.getElementById('carMiles');
    const treeCount = document.getElementById('treeCount');
    const trashBags = document.getElementById('trashBags');

    // Update value displays
    electricitySlider.addEventListener('input', function() {
        document.getElementById('electricityValue').textContent = this.value + ' kWh';
    });

    gasSlider.addEventListener('input', function() {
        document.getElementById('gasValue').textContent = this.value + ' therms';
    });

    milesSlider.addEventListener('input', function() {
        document.getElementById('milesValue').textContent = this.value + ' miles';
    });

    flightsSlider.addEventListener('input', function() {
        document.getElementById('flightsValue').textContent = this.value + ' flights';
    });

    // Fun facts array
    const funFacts = [
        "A single tree can absorb about 48 pounds of CO₂ per year.",
        "The average American's carbon footprint is 16 tons per year - one of the highest rates in the world.",
        "If everyone in the U.S. reduced meat consumption by 25%, it would cut annual emissions by 1%.",
        "A vegetarian diet can reduce your carbon footprint by up to 50% compared to a meat-heavy diet.",
        "Unplugging electronics when not in use can save up to 10% of your home's energy consumption.",
        "A laptop uses up to 80% less electricity than a desktop computer.",
        "Recycling aluminum saves 95% of the energy needed to make new aluminum.",
        "If every household replaced one regular lightbulb with a CFL, it would prevent 90 billion pounds of greenhouse gases.",
        "A single flight from NYC to London produces about 1 ton of CO₂ per passenger.",
        "Walking or biking instead of driving just 10 miles a week eliminates about 500 pounds of CO₂ emissions a year."
    ];

    // Display random fact
    function displayRandomFact() {
        const randomIndex = Math.floor(Math.random() * funFacts.length);
        funFact.textContent = funFacts[randomIndex];
    }

    newFactBtn.addEventListener('click', displayRandomFact);
    displayRandomFact(); // Show initial fact

    // Eco tips array
    const allEcoTips = [
        { icon: "fa-bolt", text: "Switch to LED bulbs - they use 75% less energy than incandescent lighting." },
        { icon: "fa-thermometer-half", text: "Lower your thermostat by 2°F in winter and raise it by 2°F in summer to save about 2,000 lbs of CO₂ annually." },
        { icon: "fa-car", text: "Carpooling twice a week can reduce your carbon footprint by 1,600 pounds per year." },
        { icon: "fa-shopping-bag", text: "Bring reusable bags when shopping to reduce plastic waste." },
        { icon: "fa-utensils", text: "Have one meat-free day per week - livestock accounts for nearly 15% of global emissions." },
        { icon: "fa-plug", text: "Unplug electronics when not in use - standby power accounts for 5-10% of residential energy use." },
        { icon: "fa-recycle", text: "Recycle paper, glass, and metal to reduce landfill waste." },
        { icon: "fa-bicycle", text: "Walk or bike for short trips instead of driving." },
        { icon: "fa-sun", text: "Consider installing solar panels to reduce reliance on fossil fuels." },
        { icon: "fa-leaf", text: "Plant native trees in your yard - they absorb CO₂ and provide shade." }
    ];

    // Calculate carbon footprint
    function calculateFootprint() {
        // Get values from sliders
        const electricity = parseFloat(electricitySlider.value);
        const gas = parseFloat(gasSlider.value);
        const miles = parseFloat(milesSlider.value);
        const flights = parseFloat(flightsSlider.value);

        // Calculate CO2 emissions (simplified calculations)
        // Note: These are approximate values for demonstration
        const electricityCO2 = electricity * 0.92; // lbs CO2 per kWh (US average)
        const gasCO2 = gas * 11.7; // lbs CO2 per therm
        const milesCO2 = miles * 0.404; // lbs CO2 per mile (average car)
        const flightsCO2 = flights * 440; // lbs CO2 per short-haul flight

        // Convert to metric tons (1 ton = 2204.62 lbs)
        const totalCO2 = (electricityCO2 + gasCO2 + milesCO2 + flightsCO2) / 2204.62;
        
        // Round to 1 decimal place
        const roundedCO2 = Math.round(totalCO2 * 10) / 10;

        // Display result
        footprintResult.textContent = roundedCO2;
        
        // Update circle visualization (max at 20 tons for visualization purposes)
        const percentage = Math.min((roundedCO2 / 20) * 100, 100);
        circleFill.style.background = `conic-gradient(var(--primary-color) ${percentage}%, transparent ${percentage}%)`;
        
        // Show results card
        resultsCard.style.display = 'block';
        
        // Generate personalized tips (3 random tips)
        tipsList.innerHTML = '';
        const shuffledTips = [...allEcoTips].sort(() => 0.5 - Math.random());
        const selectedTips = shuffledTips.slice(0, 3);
        
        selectedTips.forEach(tip => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas ${tip.icon}"></i> ${tip.text}`;
            tipsList.appendChild(li);
        });
        
        // Update impact visualization
        carMiles.textContent = Math.round(roundedCO2 * 1000); // Approx miles equivalent
        treeCount.textContent = Math.round(roundedCO2 * 20); // Approx trees needed
        trashBags.textContent = Math.round(roundedCO2 * 500); // Approx trash bags equivalent
    }

    // Calculate on button click
    calculateBtn.addEventListener('click', calculateFootprint);
});
