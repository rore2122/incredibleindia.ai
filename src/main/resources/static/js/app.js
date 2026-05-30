// =========================
// MAGNETIC CURSOR
// =========================

const magneticCursor =
document.querySelector('.magnetic-cursor');

if(magneticCursor){

    document.addEventListener('mousemove', e => {

        magneticCursor.style.left =
        e.clientX + 'px';

        magneticCursor.style.top =
        e.clientY + 'px';
    });

    const magneticTargets =
    document.querySelectorAll(
        'button, a, .featured-card, .place-card'
    );

    magneticTargets.forEach(target => {

        target.addEventListener('mouseenter', () => {

            magneticCursor.classList.add('active');
        });

        target.addEventListener('mouseleave', () => {

            magneticCursor.classList.remove('active');
        });

    });

} 
// =========================
// SCROLL PROGRESS BAR
// =========================
 
window.addEventListener('scroll', () => {
 
    const scrollTop =
    document.documentElement.scrollTop;
 
    const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
 
    const progress =
    (scrollTop / height) * 100;
 
    document.getElementById('progressBar')
    .style.width = progress + '%';
});
 
// =========================
// TYPING EFFECT
// =========================
 
const typingText =
document.getElementById('typingText');
 
const text =
"Discover the beauty, culture and hidden gems of India.";
 
let typingIndex = 0;
 
function typeEffect(){
 
    if(typingIndex < text.length){
 
        typingText.innerHTML +=
        text.charAt(typingIndex);
 
        typingIndex++;
 
        setTimeout(typeEffect,55);
    }
}
 
typeEffect();
 
// =========================
// COUNTERS
// =========================
 
const counters =
document.querySelectorAll('.counter');
 
counters.forEach(counter => {
 
    const updateCounter = () => {
 
        const target =
        +counter.getAttribute('data-target');
 
        const count =
        +counter.innerText;
 
        const increment =
        target / 120;
 
        if(count < target){
 
            counter.innerText =
            Math.ceil(count + increment);
 
            setTimeout(updateCounter,20);
 
        }else{
 
            counter.innerText = target;
        }
    };
 
    updateCounter();
});
 
// =========================
// REVEAL EFFECT
// =========================
 
const reveals =
document.querySelectorAll('.reveal');
 
window.addEventListener('scroll', () => {
 
    reveals.forEach(section => {
 
        const top =
        section.getBoundingClientRect().top;
 
        if(top < window.innerHeight - 100){
 
            section.classList.add('active');
        }
    });
});
 
// =========================
// BACK TO TOP
// =========================
 
function scrollToTop(){
 
    window.scrollTo({
 
        top:0,
 
        behavior:'smooth'
    });
}
 
// =========================
// TOOLTIP
// =========================
 
const tooltip =
document.getElementById('tooltip');
 
function showTooltip(event,text){
 
    tooltip.style.display = 'block';
 
    tooltip.innerText = text;
 
    tooltip.style.left =
    event.pageX + 20 + 'px';
 
    tooltip.style.top =
    event.pageY - 20 + 'px';
}
 
function hideTooltip(){
 
    tooltip.style.display = 'none';
}
 
// =========================
// MAP PARALLAX
// =========================
 
document.addEventListener('mousemove', e => {
 
    const map =
    document.querySelector('.india-map');
 
    if(map){
 
        const x =
        (window.innerWidth / 2 - e.pageX) / 80;
 
        const y =
        (window.innerHeight / 2 - e.pageY) / 80;
 
        map.style.transform =
        `translate(${x}px, ${y}px)`;
    }
});
 
// =========================
// SEARCH FILTER
// =========================
 
const searchInput =
document.getElementById('searchInput');

if(searchInput){

    searchInput.addEventListener('keyup', e => {

        const value =
        e.target.value.toLowerCase();

        document
        .querySelectorAll('.place-card')
        .forEach(card => {

            const text =
            card.innerText.toLowerCase();

            card.style.display =
            text.includes(value)
            ? 'block'
            : 'none';

        });

    });

}
 
// =========================
// LOAD PLACES
// =========================
 
async function loadPlaces(stateId){
 
    document
    .getElementById('loader')
    .style.display = 'flex';
 
    try{
 
        const response =
        await fetch(`/api/states/${stateId}/places`);
 
        const places =
        await response.json();
 
        document
        .getElementById('loader')
        .style.display = 'none';
 
        const container =
        document.getElementById('places-container');
 
        container.innerHTML = '';
 
        places.forEach((place,index) => {
 
            const card =
            document.createElement('div');
 
            card.classList.add('place-card');
 
            card.style.animationDelay =
            `${index * 0.2}s`;
 
            if(index === 0){
 
                card.style.gridColumn =
                'span 2';
            }
 
            card.innerHTML = `
 
                <img
                    src="${place.imageUrl}"
                    class="place-image"
                >
 
                <div class="place-overlay"></div>
 
                <div class="place-content">
 
                    <div class="place-name">
                        ${place.name}
                    </div>
 
                    <p>
                        ${place.shortDesc}
                    </p>
 
                </div>
 
            `;
 
            card.addEventListener('click', () => {
 
                openDetail(place);
            });
 
            container.appendChild(card);
        });
 
    }catch(error){
 
        console.error(error);
 
        document
        .getElementById('loader')
        .style.display = 'none';
    }
}
 
// =========================
// DETAIL OPEN
// =========================
 
function openDetail(place){
 
    document
    .getElementById('detail-section')
    .style.display = 'block';
 
    document
    .getElementById('detail-image')
    .src = place.imageUrl;
 
    document
    .getElementById('detail-title')
    .innerText = place.name;
 
    document
    .getElementById('detail-desc')
    .innerText =
    place.fullDesc || place.shortDesc;
 
    document
    .getElementById('detail-season')
    .innerText =
    place.bestSeason || 'October-March';
 
    document
    .getElementById('detail-duration')
    .innerText =
    place.visitDuration || '2 Days';
 
    document
    .getElementById('detail-fee')
    .innerText =
    place.entryFee || 'Free';
 
    document
    .getElementById('detail-section')
    .scrollIntoView({
 
        behavior:'smooth'
    });
}
 
// =========================
// LANGUAGE SYSTEM
// =========================
 
const languageSelect =
document.getElementById('languageSelect');
 
// =========================
// ADVANCED AI RESPONSES
// =========================
 
function generateAIResponse(query){
 
    query = query.toLowerCase();
 
    if(query.includes('beach')){
        return `
        🌊 Top beach destinations:
        Goa,
        Kerala,
        Pondicherry,
        Andaman Islands.
        `;
    }
 
    if(query.includes('family')){
        return `
        👨‍👩‍👧 Best family destinations:
        Jaipur,
        Kerala,
        Mysore,
        Ooty.
        `;
    }
 
    if(query.includes('solo')){
        return `
        🎒 Best solo travel destinations:
        Rishikesh,
        Kasol,
        Goa,
        Pondicherry.
        `;
    }
 
    if(query.includes('budget')){
        return `
        💰 Best budget destinations:
        Pondicherry,
        Hampi,
        Mysore,
        Varanasi.
        `;
    }
 
    if(query.includes('adventure')){
        return `
        🏔️ Top adventure destinations:
        Ladakh,
        Rishikesh,
        Spiti Valley,
        Auli.
        `;
    }
 
    if(query.includes('spiritual') || query.includes('temple')){
        return `
        🙏 Top spiritual destinations:
        Varanasi,
        Tirupati,
        Rameswaram,
        Kedarnath.
        `;
    }
 
    if(query.includes('honeymoon') || query.includes('romantic')){
        return `
        💑 Top romantic destinations:
        Udaipur,
        Munnar,
        Ooty,
        Srinagar.
        `;
    }
 
    return `
    🇮🇳 Popular destinations:
    Goa, Kerala, Rajasthan,
    Himachal Pradesh, Tamil Nadu.
    `;
}
 
// =========================
// GENERATE AI TRIP
// =========================
 
async function generateAITrip(prompt) {
 
    const genaiResult =
        document.getElementById("genaiResult");
 
    try {
 
        genaiResult.innerHTML = `
 
        <div class="ai-thinking">
 
            <div class="loader-spinner"></div>
 
            <h2>🧠 AI Travel Planner</h2>
 
            <h3 id="loadingText">
                Understanding your travel request...
            </h3>
 
        </div>
 
        `;
 
        const messages = [
            "🧠 Understanding your travel request...",
            "📍 Finding best destinations...",
            "🏨 Selecting hotels & attractions...",
            "🗺️ Creating itinerary...",
            "✨ Finalizing your travel plan..."
        ];
 
        let index = 0;
 
        const loadingInterval = setInterval(() => {
 
            const loadingText =
                document.getElementById("loadingText");
 
            if (loadingText) {
 
                loadingText.innerText =
                    messages[index % messages.length];
 
                index++;
            }
 
        }, 2000);
 
        const response = await fetch("/api/ai-trip", {
 
            method: "POST",
 
            headers: {
                "Content-Type": "text/plain"
            },
 
            body: prompt
        });
 
        clearInterval(loadingInterval);
 
        const data = await response.text();
 
        genaiResult.innerHTML = `
 
        <div class="ai-trip-card">
 
            <div class="trip-header">
 
                <h2>
                    🌍 AI Generated Travel Plan
                </h2>
 
            </div>
 
            <pre class="ai-result-text">
${data}
            </pre>
 
        </div>
 
        `;
 
    } catch (error) {
 
        console.error(error);
 
        genaiResult.innerHTML = `
 
        <div class="ai-trip-card">
 
            <h2>❌ AI Error</h2>
 
            <p>
                ${error.message}
            </p>
 
        </div>
 
        `;
    }
}
 
// =========================================
// WEATHER — CHANGED
// OpenWeather API key removed from frontend.
// Now calling Spring Boot backend /api/weather
// API key is safe inside application.properties
// =========================================
 
async function fetchWeather(city){
 
    try{
 
        const response =
        await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
 
        const data = await response.json();
 
        if(data.error){
            console.error("Weather error:", data.error);
            return;
        }
 
        document.getElementById("weatherTemp")
        .innerText = data.temp;
 
        document.getElementById("weatherCondition")
        .innerText = data.condition;
 
        document.getElementById("humidity")
        .innerText = data.humidity;
 
        document.getElementById("windSpeed")
        .innerText = data.windSpeed;
 
    }catch(error){
 
        console.error("Weather fetch failed:", error);
    }
}
 
// =========================
// WEATHER DROPDOWNS
// =========================
 
const stateCities = {
 
    "Andhra Pradesh":["Visakhapatnam","Vijayawada","Tirupati","Amaravati"],
    "Arunachal Pradesh":["Itanagar","Tawang","Ziro","Pasighat"],
    "Assam":["Guwahati","Dibrugarh","Silchar","Tezpur"],
    "Bihar":["Patna","Gaya","Muzaffarpur","Bhagalpur"],
    "Chhattisgarh":["Raipur","Bilaspur","Jagdalpur","Durg"],
    "Goa":["Panaji","Margao","Vasco da Gama","Mapusa"],
    "Gujarat":["Ahmedabad","Surat","Vadodara","Rajkot"],
    "Haryana":["Gurugram","Faridabad","Panipat","Ambala"],
    "Himachal Pradesh":["Shimla","Manali","Dharamshala","Kullu"],
    "Jharkhand":["Ranchi","Jamshedpur","Dhanbad","Deoghar"],
    "Karnataka":["Bengaluru","Mysuru","Mangalore","Hubballi"],
    "Kerala":["Kochi","Thiruvananthapuram","Kozhikode","Munnar"],
    "Madhya Pradesh":["Bhopal","Indore","Gwalior","Jabalpur"],
    "Maharashtra":["Mumbai","Pune","Nagpur","Nashik"],
    "Manipur":["Imphal","Thoubal","Bishnupur","Ukhrul"],
    "Meghalaya":["Shillong","Cherrapunji","Tura","Jowai"],
    "Mizoram":["Aizawl","Lunglei","Champhai","Kolasib"],
    "Nagaland":["Kohima","Dimapur","Mokokchung","Tuensang"],
    "Odisha":["Bhubaneswar","Puri","Cuttack","Sambalpur"],
    "Punjab":["Amritsar","Ludhiana","Jalandhar","Patiala"],
    "Rajasthan":["Jaipur","Udaipur","Jodhpur","Jaisalmer"],
    "Sikkim":["Gangtok","Namchi","Gyalshing","Mangan"],
    "Tamil Nadu":["Chennai","Coimbatore","Madurai","Ooty"],
    "Telangana":["Hyderabad","Warangal","Karimnagar","Nizamabad"],
    "Tripura":["Agartala","Udaipur","Dharmanagar","Kailashahar"],
    "Uttar Pradesh":["Lucknow","Varanasi","Agra","Prayagraj"],
    "Uttarakhand":["Dehradun","Nainital","Haridwar","Rishikesh"],
    "West Bengal":["Kolkata","Darjeeling","Siliguri","Durgapur"]
};
 
const stateSelect =
document.getElementById("stateWeatherSelect");
 
const citySelect =
document.getElementById("cityWeatherSelect");
 
const selectedStateText =
document.getElementById("selectedStateText");
 
const selectedCityText =
document.getElementById("selectedCityText");
 
const lastUpdated =
document.getElementById("lastUpdated");
 
if(stateSelect && citySelect){
 
    stateSelect.addEventListener("change", function(){
 
        const state =
        this.options[this.selectedIndex].text;
 
        selectedStateText.innerText =
        `📍 State: ${state}`;
 
        citySelect.innerHTML =
        '<option selected disabled>Select City</option>';
 
        if(stateCities[state]){
 
            stateCities[state].forEach(city => {
 
                const option =
                document.createElement("option");
 
                option.value = city;
                option.textContent = city;
 
                citySelect.appendChild(option);
            });
        }
 
        const now = new Date();
 
        lastUpdated.innerText =
        `🕒 Updated: ${now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })}`;
    });
 
    citySelect.addEventListener("change", function(){
 
        selectedCityText.innerText =
        `🏙 City: ${this.value}`;
 
        fetchWeather(this.value);
 
        const now = new Date();
 
        lastUpdated.innerText =
        `🕒 Last Updated: ${now.toLocaleTimeString()}`;
    });
}
 
// =========================
// DESTINATION CATEGORIES
// =========================
 
const destinationCategories = {
 
    Adventure : [
        "Ladakh","Spiti Valley","Rishikesh",
        "Auli","Bir Billing","Meghalaya"
    ],
 
    Nature : [
        "Araku Valley","Munnar","Ooty",
        "Kodaikanal","Coorg","Wayanad"
    ],
 
    Family : [
        "Goa","Jaipur","Mysore",
        "Kerala","Hyderabad","Visakhapatnam"
    ],
 
    Spiritual : [
        "Tirupati","Varanasi","Rameswaram",
        "Shirdi","Kedarnath","Srisailam"
    ],
 
    Romantic : [
        "Ooty","Kodaikanal","Munnar",
        "Coorg","Udaipur","Srinagar",
        "Manali","Nainital"
    ]
};
 
const recommendButtons =
document.querySelectorAll(".recommend-btn");
 
recommendButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category =
        button.dataset.category;

        const places =
        destinationCategories[category];

        let options = "";

        places.forEach(place => {
            options += `<option value="${place}">${place}</option>`;
        });

        document.getElementById("popupTitle")
        .innerText = `${category} Destinations`;

        document.getElementById("popupPlaces")
        .innerHTML = options;

        document.getElementById("destinationPopup")
        .classList.add("open");
    });
});
 
const exploreDestinationBtn =
document.getElementById("exploreDestinationBtn");

if(exploreDestinationBtn){

    exploreDestinationBtn.addEventListener("click", () => {

        const place =
        document.getElementById("popupPlaces").value;

        window.location.href =
        `/ai-explorer?place=${encodeURIComponent(place)}`;
    });

}

// =========================
// POPUP CLOSE BUTTONS (FIXED)
// =========================

// Close AI Explorer Popup
const aiPopupElement = document.getElementById('aiPopup');
const aiPopupCloseButtons = document.querySelectorAll('#aiPopup .popup-close');

aiPopupCloseButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        aiPopupElement.classList.remove('open');
        console.log('AI Popup closed');
    });
});

// Close Destination Popup
const destPopupElement = document.getElementById('destinationPopup');
const destPopupCloseButtons = document.querySelectorAll('#destinationPopup .popup-close, #destinationPopup .dest-close-btn');

destPopupCloseButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        destPopupElement.classList.remove('open');
        console.log('Destination Popup closed');
    });
});

// Also allow clicking on the overlay itself to close
[aiPopupElement, destPopupElement].forEach(popup => {
    if(popup) {
        popup.addEventListener('click', (e) => {
            if(e.target === popup) {
                popup.classList.remove('open');
            }
        });
    }
});

// =========================
// AI POPUP OPENING
// =========================

const askAiBtn = document.getElementById("aiVoiceBtn");
const aiVoiceBtnHero = document.getElementById("aiVoiceBtnHero");
const explorePlaceBtn = document.getElementById("explorePlaceBtn");

if(askAiBtn){
    askAiBtn.addEventListener("click", () => {
        aiPopupElement.classList.add("open");
        console.log('AI Popup opened');
    });
}

if(aiVoiceBtnHero){
    aiVoiceBtnHero.addEventListener("click", () => {
        aiPopupElement.classList.add("open");
        console.log('AI Popup opened from hero');
    });
}

if(explorePlaceBtn){
    explorePlaceBtn.addEventListener("click", () => {
        const place = document.getElementById("placeInput").value.trim();
        if(!place){
            alert("Please enter a place name");
            return;
        }
        window.location.href = `/ai-explorer?place=${encodeURIComponent(place)}`;
    });
}

 // =========================================
// PHASE 5 : AI TRIP PLANNER
// =========================================

const generateTripBtn =
document.getElementById("generateTripBtn");

const tripPrompt =
document.getElementById("tripPrompt");

const genaiResult =
document.getElementById("genaiResult");

if(generateTripBtn){

    generateTripBtn.addEventListener("click", async () => {

        const prompt =
        tripPrompt.value.trim();

        if(prompt === ""){

            genaiResult.innerHTML = `

            <div class="ai-result-placeholder">

                Please describe your trip first...

            </div>

            `;

            return;
        }

        await generateAITrip(prompt);

    });

}