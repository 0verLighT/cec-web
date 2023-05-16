const input_name_teamA = document.getElementById("Name_team");
const span_name_teamA = document.getElementById("Name_team_span");
const vitesse_teamA = document.getElementById("vitesse_teamA");
const box_info = document.getElementById("box_info");
const box_check = document.getElementById("box_info_check");
const btn_check = document.getElementById("btn_check");
const section_teamA = document.getElementById("team_A");
let teamA = [
  {ms:0,s:0},
];
let name_teamA = "";
input_name_teamA.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    span_name_teamA.innerHTML = (`(${(input_name_teamA.value).trim()})`);
    name_teamA = input_name_teamA.value.trim();
  }
  if(e.key === "Backspace") {
    span_name_teamA.innerHTML = ("");
  }
});

vitesse_teamA.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
      if (teamA.length === 7) {
      setupBoxinfo("Le tableau est déjà rempli");
      return; // Si le tableau est égale a 7, le rendre disabled
      } else {
        if (isNaN(parseFloat(vitesse_teamA.value))) {
          setupBoxinfo("Ce n'est pas un nombre");
          return; // Si le champs n'est pas un nombre, met par la suite un message d'erreur
        } else {
          if (!vitesse_teamA.value === "") {
            setupBoxinfo("Le champ est vide");
            return; // Si le champs est vide, met par le suite un message d'erreur
          } else if  (vitesse_teamA.value < 0 || vitesse_teamA.value > 12) {
            setupBoxinfo("Le nombre est inférieur à 0 ou supérieur à 12");
            return; //si le champ est un nombre inférieur a 0 ou supérieur a 12, met par le suite un message d'erreur
          } else {
            let s = parseInt(teamA.length);
            let team = {
              ms:parseFloat(vitesse_teamA.value),
              s:s++,
            };
            vitesse_teamA.value = "";
            teamA.push(team);
            afficherEquipes();
            if (teamA.length === 7) {
              createChart();
              btn_check.style.visibility = "visible";
            }
            console.log(teamA);
            
          };
        };
     };
  };  
});

function afficherEquipes() {
  const container = document.getElementById("equipe-container");
  const table = document.getElementById("equipe-table");

  // Supprimer le tableau existant s'il y en a un
  if (table) {
    container.removeChild(table);
  }

  // Créer un nouveau tableau
  const newTable = document.createElement("table");
  newTable.setAttribute("id", "equipe-table");
  newTable.setAttribute("class", "table");
  container.appendChild(newTable);

  // Créer une seule ligne d'en-tête pour les titres des colonnes
  const headerRow = document.createElement("tr");
  const headers = ["ms", "s"];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  newTable.appendChild(headerRow);

  // Ajouter une ligne pour chaque équipe et mettre les données en ligne
  teamA.forEach((equipe) => {
    const row = document.createElement("tr");
    Object.values(equipe).forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });
    newTable.appendChild(row);
  });
}

function createChart() {
  const ctx = document.getElementById('Chart_TeamA');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: [teamA[0].s, teamA[1].s, teamA[2].s, teamA[3].s, teamA[4].s, teamA[5].s, teamA[6].s],
      datasets: [{
        label: 'Vitesse',
        data: [teamA[0].ms, teamA[1].ms, teamA[2].ms, teamA[3].ms, teamA[4].ms, teamA[5].ms, teamA[6].ms],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function reset() {
  console.log("reset");
  let reset = [
    {ms:0,s:0},
  ];
  teamA.splice(0, teamA.length, ...reset);
  setupBoxinfo("Le graphique sera actualisé après avoir ajouté les nouvelles valeurs")
  afficherEquipes();
}

function checkSettingsTeamA() {
    if (!teamA.length === 7) {
      setupBoxinfo("Le tableau n'est pas rempli, vous ne pouvez pas continuer");
      return;
    } 
    if (span_name_teamA == null || span_name_teamA.innerHTML === "" || span_name_teamA.innerHTML === "()") {
      name_teamA = "Equipe A";
    } else {
      name_teamA = (span_name_teamA.innerHTML).replace("(", "").replace(")", "");
      console.log(name_teamA);
  }
  section_teamA.style.display = "none";
}
//setup de box info pour toutes erreures
/**
 * Ajoute un message d'erreur dans la box_info
 * @param {string} message 
 */
function setupBoxinfo(message) {
  box_info.innerHTML = (message);
  box_info.style.color = "red";
    setTimeout(() => {
      box_info.innerHTML = ("");
    }, 5000);
}