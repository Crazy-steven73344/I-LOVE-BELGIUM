// --- PAGE NAVIGATION ---
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if (id === "map") {
    setTimeout(() => { map.invalidateSize(); }, 200);
  }
}
showPage("home");

// --- BUBBLES GENERATOR 🫧 ---
function createBubbles() {
  document.querySelectorAll(".bubbles").forEach(container => {
    for (let i = 0; i < 20; i++) {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");
      const size = Math.random() * 40 + 10;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDuration = `${8 + Math.random() * 8}s`;
      bubble.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(bubble);
    }
  });
}
createBubbles();

// --- MAP INIT ---
const map = L.map('mapid').setView([50.85, 4.35], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap',
  maxZoom: 19
}).addTo(map);

// --- ORASE DIN BELGIA ---
const cities = [
  { name: "Brussels", coords:[50.8503, 4.3517], emoji:"🏛", text:"Capital of Belgium & EU" },
  { name: "Antwerp", coords:[51.2194, 4.4025], emoji:"⚓", text:"Port city, diamonds" },
  { name: "Bruges", coords:[51.2093, 3.2247], emoji:"🏰", text:"Medieval old town" },
  { name: "Ghent", coords:[51.0543, 3.7174], emoji:"🎓", text:"University city" },
  { name: "Liège", coords:[50.6326, 5.5797], emoji:"🏭", text:"Industry & steel" },
  { name: "Namur", coords:[50.4674, 4.8718], emoji:"🏯", text:"Citadel & Meuse river" },
  { name: "Leuven", coords:[50.8798, 4.7005], emoji:"🍺", text:"Beer & university" },
  { name: "Mons", coords:[50.4541, 3.9567], emoji:"🎶", text:"Doudou festival" },
  { name: "Dinant", coords:[50.262, 4.911], emoji:"🎷", text:"Birthplace of saxophone" },
  { name: "Spa", coords:[50.4925, 5.8667], emoji:"💧", text:"Famous thermal spa town" },
  { name: "Ardennes", coords:[50.0, 5.5], emoji:"🌲", text:"Forests & hiking" },
  { name: "Waterloo", coords:[50.6806, 4.4125], emoji:"⚔️", text:"Battle of Waterloo 1815" }
];

// --- DETALII BRUXELLES ---
const brusselsDetails = [
  { name:"Grand Place", coords:[50.8467,4.3499], emoji:"🌟", text:"Main square, UNESCO site" },
  { name:"Atomium", coords:[50.894,4.341], emoji:"⚛️", text:"Iconic landmark" },
  { name:"EU Parliament", coords:[50.838,4.375], emoji:"🇪🇺", text:"European Parliament HQ" },
  { name:"Royal Palace", coords:[50.8428,4.3631], emoji:"👑", text:"Royal residence" },
  { name:"Mont des Arts", coords:[50.8456,4.3572], emoji:"🎨", text:"Viewpoint & museums" },
  { name:"Magritte Museum", coords:[50.842,4.36], emoji:"🖼️", text:"Art museum of René Magritte" },
  { name:"Chocolate Shops", coords:[50.8469,4.3498], emoji:"🍫", text:"World-famous pralines" },
  { name:"Waffles", coords:[50.847,4.35], emoji:"🧇", text:"Belgian waffles in centre" },
  { name:"Fries", coords:[50.8475,4.351], emoji:"🍟", text:"Belgian fries kiosks" },
  { name:"King Baudouin Stadium", coords:[50.895,4.3346], emoji:"🏟️", text:"Home of the Red Devils" },
  { name:"Mini-Europe", coords:[50.8942,4.3384], emoji:"🌍", text:"Miniature park of Europe" },
  { name:"Comic Strip Center", coords:[50.8507,4.3603], emoji:"📚", text:"Famous for Tintin & comics" },
  { name:"Bois de la Cambre", coords:[50.8,4.3667], emoji:"🌳", text:"Big city park" },
  { name:"Royal Greenhouses", coords:[50.894,4.322], emoji:"🌺", text:"Botanical gardens" },
  { name:"Train World", coords:[50.872,4.357], emoji:"🚂", text:"Railway museum" }
];

// --- SIDEBAR ---
const sidebar = document.getElementById("sidebar");

function addPoints(points, sectionTitle) {
  const section = document.createElement("h2");
  section.textContent = sectionTitle;
  sidebar.appendChild(section);

  points.forEach(p => {
    const marker = L.marker(p.coords).addTo(map)
      .bindPopup(`<h3>${p.emoji} ${p.name}</h3><p>${p.text}</p>`);

    const item = document.createElement("h3");
    item.textContent = `${p.emoji} ${p.name}`;
    item.addEventListener("click", () => {
      map.setView(p.coords, 13);
      marker.openPopup();
    });
    sidebar.appendChild(item);
  });
}

addPoints(cities, "🏙️ Belgian Cities");
addPoints(brusselsDetails, "✨ Brussels Highlights");

// --- QUIZ MINI GAME ---
const questions = [
  { q: "What is the capital of Belgium?", answers: ["Brussels", "Antwerp", "Ghent"], correct: "Brussels" },
  { q: "Which food is Belgium famous for?", answers: ["Pizza", "Fries", "Sushi"], correct: "Fries" },
  { q: "What is the name of the famous square in Brussels?", answers: ["Grand Place", "Red Square", "Times Square"], correct: "Grand Place" }
];

let currentQ = 0;

function loadQuestion() {
  const q = questions[currentQ];
  document.getElementById("question").textContent = q.q;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  q.answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => checkAnswer(ans, q.correct);
    answersDiv.appendChild(btn);
  });
  document.getElementById("feedback").textContent = "";
  document.getElementById("nextQuestion").style.display = "none";
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    document.getElementById("feedback").textContent = "✅ Correct!";
  } else {
    document.getElementById("feedback").textContent = "❌ Wrong! Correct answer: " + correct;
  }
  document.getElementById("nextQuestion").style.display = "inline-block";
}

document.getElementById("nextQuestion").addEventListener("click", () => {
  currentQ++;
  if (currentQ < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("question").textContent = "🎉 You finished the quiz!";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("nextQuestion").style.display = "none";
  }
});

// load prima întrebare când intri în pagina Game
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("game")) {
    loadQuestion();
  }
});

