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
  { name: "Brussels", coords:[50.8503, 4.3517], emoji:"🏛", text:"Capital of Belgium & EU", img:"https://upload.wikimedia.org/wikipedia/commons/f/f9/Grand_Place_Brussels_1.jpg" },
  { name: "Antwerp", coords:[51.2194, 4.4025], emoji:"⚓", text:"Port city, diamonds", img:"https://upload.wikimedia.org/wikipedia/commons/6/65/Grote_Markt_Antwerp.jpg" },
  { name: "Bruges", coords:[51.2093, 3.2247], emoji:"🏰", text:"Medieval old town", img:"https://upload.wikimedia.org/wikipedia/commons/3/3c/Bruges_Belfry_and_Markt_square.jpg" },
  { name: "Ghent", coords:[51.0543, 3.7174], emoji:"🎓", text:"University city", img:"https://upload.wikimedia.org/wikipedia/commons/3/30/Ghent_Korenlei.jpg" },
  { name: "Liège", coords:[50.6326, 5.5797], emoji:"🏭", text:"Industry & steel", img:"https://upload.wikimedia.org/wikipedia/commons/8/82/Liege_Palais_Justice.jpg" },
  { name: "Namur", coords:[50.4674, 4.8718], emoji:"🏯", text:"Citadel & Meuse river", img:"https://upload.wikimedia.org/wikipedia/commons/4/47/Namur_Citadel.jpg" },
  { name: "Leuven", coords:[50.8798, 4.7005], emoji:"🍺", text:"Beer & university", img:"https://upload.wikimedia.org/wikipedia/commons/a/a2/Leuven_Town_Hall.jpg" },
  { name: "Mons", coords:[50.4541, 3.9567], emoji:"🎶", text:"Doudou festival", img:"https://upload.wikimedia.org/wikipedia/commons/d/d4/Mons_Belfry.jpg" },
  { name: "Dinant", coords:[50.262, 4.911], emoji:"🎷", text:"Birthplace of saxophone", img:"https://upload.wikimedia.org/wikipedia/commons/8/8b/Dinant_view.jpg" },
  { name: "Spa", coords:[50.4925, 5.8667], emoji:"💧", text:"Famous thermal spa town", img:"https://upload.wikimedia.org/wikipedia/commons/f/f8/Spa_Thermes.jpg" },
  { name: "Ardennes", coords:[50.0, 5.5], emoji:"🌲", text:"Forests & hiking", img:"https://upload.wikimedia.org/wikipedia/commons/7/76/Ardennes_Forest.jpg" },
  { name: "Waterloo", coords:[50.6806, 4.4125], emoji:"⚔️", text:"Battle of Waterloo 1815", img:"https://upload.wikimedia.org/wikipedia/commons/6/61/Butte_du_Lion_Waterloo.jpg" }
];

// --- DETALII BRUXELLES ---
const brusselsDetails = [
  { name:"Grand Place", coords:[50.8467,4.3499], emoji:"🌟", text:"Main square, UNESCO site", img:"https://upload.wikimedia.org/wikipedia/commons/5/5a/Grand_Place_Brussels_panorama.jpg" },
  { name:"Atomium", coords:[50.894,4.341], emoji:"⚛️", text:"Iconic landmark", img:"https://upload.wikimedia.org/wikipedia/commons/1/11/Atomium_Brussels.jpg" },
  { name:"EU Parliament", coords:[50.838,4.375], emoji:"🇪🇺", text:"European Parliament HQ", img:"https://upload.wikimedia.org/wikipedia/commons/0/09/European_Parliament_Brussels.jpg" },
  { name:"Royal Palace", coords:[50.8428,4.3631], emoji:"👑", text:"Royal residence", img:"https://upload.wikimedia.org/wikipedia/commons/4/47/Palais_Royal_Bruxelles.jpg" },
  { name:"Mont des Arts", coords:[50.8456,4.3572], emoji:"🎨", text:"Viewpoint & museums", img:"https://upload.wikimedia.org/wikipedia/commons/f/fd/Mont_des_Arts_Brussels.jpg" },
  { name:"Magritte Museum", coords:[50.842,4.36], emoji:"🖼️", text:"Art museum of René Magritte", img:"https://upload.wikimedia.org/wikipedia/commons/9/92/Magritte_Museum.jpg" },
  { name:"Chocolate Shops", coords:[50.8469,4.3498], emoji:"🍫", text:"World-famous pralines", img:"https://upload.wikimedia.org/wikipedia/commons/f/f0/Pralines_with_various_flavours.jpg" },
  { name:"Waffles", coords:[50.847,4.35], emoji:"🧇", text:"Belgian waffles in centre", img:"https://upload.wikimedia.org/wikipedia/commons/6/69/Belgian_Waffles.jpg" },
  { name:"Fries", coords:[50.8475,4.351], emoji:"🍟", text:"Belgian fries kiosks", img:"https://upload.wikimedia.org/wikipedia/commons/0/0c/Frites_Belgique.jpg" },
  { name:"King Baudouin Stadium", coords:[50.895,4.3346], emoji:"🏟️", text:"Home of the Red Devils", img:"https://upload.wikimedia.org/wikipedia/commons/2/29/King_Baudouin_Stadium_2010.JPG" },
  { name:"Mini-Europe", coords:[50.8942,4.3384], emoji:"🌍", text:"Miniature park of Europe", img:"https://upload.wikimedia.org/wikipedia/commons/6/61/Mini-Europe_Brussels.jpg" },
  { name:"Comic Strip Center", coords:[50.8507,4.3603], emoji:"📚", text:"Famous for Tintin & comics", img:"https://upload.wikimedia.org/wikipedia/commons/e/e0/Comic_Strip_Center_Brussels.jpg" },
  { name:"Bois de la Cambre", coords:[50.8,4.3667], emoji:"🌳", text:"Big city park", img:"https://upload.wikimedia.org/wikipedia/commons/4/42/Bois_de_la_Cambre.jpg" },
  { name:"Royal Greenhouses", coords:[50.894,4.322], emoji:"🌺", text:"Botanical gardens", img:"https://upload.wikimedia.org/wikipedia/commons/2/22/Laeken_Greenhouses.jpg" },
  { name:"Train World", coords:[50.872,4.357], emoji:"🚂", text:"Railway museum", img:"https://upload.wikimedia.org/wikipedia/commons/1/16/Train_World_Schaerbeek.jpg" }
];

// --- SIDEBAR ---
const sidebar = document.getElementById("sidebar");

function addPoints(points, sectionTitle) {
  const section = document.createElement("h2");
  section.textContent = sectionTitle;
  sidebar.appendChild(section);

  points.forEach(p => {
    const marker = L.marker(p.coords).addTo(map)
      .bindPopup(`<h3>${p.emoji} ${p.name}</h3><p>${p.text}</p><img src="${p.img}" width="200">`);

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
