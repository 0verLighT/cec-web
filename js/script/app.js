const input_name_teamA = document.getElementById("Name_team");
const input_name_teamB = document.getElementById("Name_teamB");
const span_name_teamA = document.getElementById("Name_team_span");
const span_name_teamB = document.getElementById("Name_teamB_span");
const vitesse_teamA = document.getElementById("vitesse_teamA");
const vitesse_teamB = document.getElementById("vitesse_teamB");
const box_infoA = document.getElementById("box_info");
const box_infoB = document.getElementById("box_infoB");
const box_checkA = document.getElementById("box_info_check");
const box_checkB = document.getElementById("box_info_checkB");
const btn_checkA = document.getElementById("btn_check");
const btn_checkB = document.getElementById("btn_checkB");
const section_teamA = document.getElementById("team_A");
const section_teamB = document.getElementById("team_B");

let graphiqueA;
let graphiqueB;

let teamA = [{ ms: 0, s: 0 }];
let teamB = [{ ms: 0, s: 0 }];

let name_teamA = "";
let name_teamB = "";

input_name_teamA.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    span_name_teamA.innerHTML = `(${input_name_teamA.value.trim()})`;
    name_teamA = input_name_teamA.value.trim();
  }
  if (e.key === "Backspace") {
    span_name_teamA.innerHTML = "";
  }
});

vitesse_teamA.addEventListener("keyup", (e) => {
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
        } else if (vitesse_teamA.value < 0 || vitesse_teamA.value > 12) {
          setupBoxinfo("Le nombre est inférieur à 0 ou supérieur à 12");
          return; //si le champ est un nombre inférieur a 0 ou supérieur a 12, met par le suite un message d'erreur
        } else {
          let s = parseInt(teamA.length);
          let team = {
            ms: parseFloat(vitesse_teamA.value),
            s: s++,
          };
          vitesse_teamA.value = "";
          teamA.push(team);
          afficherEquipes();
          if (teamA.length === 7) {
            createChart();
            btn_checkA.style.visibility = "visible";
            checkallvaluearezerosA(teamA);
            console.log(checkallvaluearezerosA(teamA) === true);
            if (checkallvaluearezerosA(teamA) === true) {
              setupBoxinfo("Faudrait peut-être accélérer un peu non ?");
              return;
            } else  if(checkallvalueare12A(teamA) === true){
              setupBoxinfo("Tu t'es cru pour une fusée ?");
              return;
            } else{
            checklastvalueA();
            }
            
          }
          console.log(teamA);
        }
      }
    }
  }
});
function checklastvalueA() {
  //verifie si la derniere valeur n'est pas 0  si oui la supprime avec un message d'erreur
  if (teamA[teamA.length - 1].ms === 0) {
    teamA.pop();
    setupBoxinfo("La dernière valeur est 0 veuillez saisir une nouvelle valeur");
    afficherEquipes();
    graphiqueA.destroy();
    btn_checkA.style.visibility = "hidden";
    return;
  }
}
/**
 * crée un tableau dans le DOM et l'ajoute à la page
 */
function afficherEquipes() {
  const container = document.getElementById("equipe-container-1");
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
  const ctx = document.getElementById("Chart_TeamA");

  graphiqueA = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        teamA[0].s,
        teamA[1].s,
        teamA[2].s,
        teamA[3].s,
        teamA[4].s,
        teamA[5].s,
        teamA[6].s,
      ],
      datasets: [
        {
          label: "Courbe d'accélération",
          data: [
            teamA[0].ms,
            teamA[1].ms,
            teamA[2].ms,
            teamA[3].ms,
            teamA[4].ms,
            teamA[5].ms,
            teamA[6].ms,
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function resetA() {
  if (teamA.length === 1) {
    setupBoxinfo("Le tableau est déjà vide");
    return;
  }
  if (graphiqueA) {
    graphiqueA.destroy();
  }
  console.log("reset value team A");
  let reset = [{ ms: 0, s: 0 }];
  teamA.splice(0, teamA.length, ...reset);
  btn_checkA.style.visibility = "hidden";
  afficherEquipes();
}

function checkSettingsTeamA() {
  if (!teamA.length === 7) {
    setupBoxinfo("Le tableau n'est pas rempli, vous ne pouvez pas continuer");
    return;
  }
  if (
    span_name_teamA == null ||
    span_name_teamA.innerHTML === "" ||
    span_name_teamA.innerHTML === "()"
  ) {
    name_teamA = "Equipe A";
  } else {
    name_teamA = span_name_teamA.innerHTML.replace("(", "").replace(")", "");
    console.log(name_teamA);
  }
  section_teamA.style.display = "none";
  section_teamB.style.display = "flex";
  return name_teamA;
  // section_teamB.style.flexDirection = "row-reverse";
}
//setup de box info pour toutes erreures
/**
 * Ajoute un message d'erreur dans la box_info
 * @param {string} message
 */
function setupBoxinfo(message) {
  box_infoA.innerHTML = message;
  box_infoA.style.color = "red";
  setTimeout(() => {
    box_infoA.innerHTML = "";
  }, 5000);
}
function setupBoxinfo_2(message) {
  box_infoB.innerHTML = message;
  box_infoB.style.color = "red";
  setTimeout(() => {
    box_infoB.innerHTML = "";
  }, 5000);
}
input_name_teamB.addEventListener("keyup", (e) => { 
  if (e.key === "Enter") {
    span_name_teamB.innerHTML = `( ${input_name_teamB.value.trim()} )`;
    name_teamB = input_name_teamB.value.trim();
  }
  if (e.key === "Backspace") {
    span_name_teamB.innerHTML = "";
  }
});

vitesse_teamB.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (teamB.length === 7) {
      setupBoxinfo_2("Le tableau est déjà rempli");
      return; // Si le tableau est égale a 7, le rendre disabled
    } else {
      if (isNaN(parseFloat(vitesse_teamB.value))) {
        setupBoxinfo_2("Ce n'est pas un nombre");
        return; // Si le champs n'est pas un nombre, met par la suite un message d'erreur
      } else {
        if (!vitesse_teamB.value === "") {
          setupBoxinfo_2("Le champ est vide");
          return; // Si le champs est vide, met par le suite un message d'erreur
        } else if (vitesse_teamB.value < 0 || vitesse_teamB.value > 12) {
          setupBoxinfo_2("Le nombre est inférieur à 0 ou supérieur à 12");
          return; //si le champ est un nombre inférieur a 0 ou supérieur a 12, met par le suite un message d'erreur
        } else {
          let s = parseInt(teamB.length);
          let team2 = {
            ms: parseFloat(vitesse_teamB.value),
            s: s++,
          };
          vitesse_teamB.value = "";
          teamB.push(team2);
          afficherEquipes2();
          if (teamB.length === 7) {
            createChartB();
            btn_checkB.style.visibility = "visible";
            if (checkallvaluearezerosB(teamB) === true) {
              setupBoxinfo_2("Faudrait peut-être accélérer un peu non ?");
              return;
            } else  if(checkallvalueare12B(teamB) === true){
              setupBoxinfo_2("Tu t'es cru pour une fusée ?");
              return;
            } else{
            checklastvalueB();
            }
            
          }
          console.log(teamB);
        }
      }
    }
  }
});


function afficherEquipes2() {
  const container = document.getElementById("equipe-container-2");
  const table = container.querySelector("#equipe-table");
  
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
  teamB.forEach((equipe) => {
    const row = document.createElement("tr");
    Object.values(equipe).forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });
    newTable.appendChild(row);
  });
}

function checklastvalueB() {
  //verifie si la derniere valeur n'est pas 0  si oui la supprime avec un message d'erreur
  if (teamB[teamB.length - 1].ms === 0) {
    teamB.pop();
    setupBoxinfo_2("La dernière valeur est 0 veuillez saisir une nouvelle valeur");
    afficherEquipes2();
    graphiqueB.destroy();
    btn_checkB.style.visibility = "hidden";
    return;
  }
}
function createChartB() {
  const ctx = document.getElementById("Chart_TeamB");

   graphiqueB =  new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        teamB[0].s,
        teamB[1].s,
        teamB[2].s,
        teamB[3].s,
        teamB[4].s,
        teamB[5].s,
        teamB[6].s,
      ],
      datasets: [
        {
          label: "Vitesse",
          data: [
            teamB[0].ms,
            teamB[1].ms,
            teamB[2].ms,
            teamB[3].ms,
            teamB[4].ms,
            teamB[5].ms,
            teamB[6].ms,
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
function checkSettingsTeamB() {
  if (!teamB.length === 7) {
    setupBoxinfo("Le tableau n'est pas rempli, vous ne pouvez pas continuer");
    return;
  }
  if (
    span_name_teamB == null ||
    span_name_teamB.innerHTML === "" ||
    span_name_teamA.innerHTML === "()"
  ) {
    name_teamB = "Equipe B";
  } else {
    name_teamA = span_name_teamA.innerHTML.replace("(", "").replace(")", "");
    console.log(name_teamB);
  }
  section_teamB.style.display = "none";
  return name_teamB;
}

function resetB() {
  if (teamB.length === 1) {
    setupBoxinfo_2("Le tableau est déjà vide");
    return;
  }
  if (graphiqueB) {
    graphiqueB.destroy();
  }
  console.log("reset value team B");
  let reset = [{ ms: 0, s: 0 }];
  teamB.splice(0, teamB.length, ...reset);
  btn_checkB.style.visibility = "hidden";
  afficherEquipes2();
}


// calculs des résultats de distance et de temps de la team A 
function calculsA() {
  let distancefinal = 75;
  let tempsfinalA = 0;
  let distance = 0;
  let distance_retante = 0;
  let tempsextra = 0;

  // Calcul de la distance parcourue par la team A
  for (let i = 0; i < teamA.length - 1; i++) {
    distance += 0.5 * (teamA[i].ms + teamA[i + 1].ms);
  }

  distance_retante = distancefinal - distance;
  tempsextra = distance_retante / teamA[teamA.length - 1].ms;
  tempsfinalA = teamA[teamA.length - 1].s + tempsextra;

  console.log(`Le temps final est ${tempsfinalA} secondes`);
  return tempsfinalA;
}

function calculsB() {
  let distancefinal = 75;
  let tempsfinalB = 0;
  let distance = 0;
  let distance_retante = 0;
  let tempsextra = 0;

  // Calcul de la distance parcourue par la team A
  for (let i = 0; i < teamB.length - 1; i++) {
    distance += 0.5 * (teamB[i].ms + teamB[i + 1].ms);
  }

  distance_retante = distancefinal - distance;
  tempsextra = distance_retante / teamA[teamB.length - 1].ms;
  tempsfinalB = teamB[teamB.length - 1].s + tempsextra;

  console.log(`Le temps final est ${tempsfinalB} secondes`);
  return tempsfinalB;
}

function win() {
  let name_teamA = checkSettingsTeamA();
  let name_teamB = checkSettingsTeamB();
  let teampsfinalA = calculsA();
  let teampsfinalB = calculsB();
  if (teampsfinalA < teampsfinalB) {
    console.log(`${name_teamA} gagne`);
  } else if (teampsfinalA === teampsfinalB) {
    console.log(`égalité entre ${name_teamA} et ${name_teamB} avec ${teampsfinalA} secondes`);
  } else {
    console.log(`${name_teamB} gagne`);
  }
  console.log(name_teamA);
  console.log(name_teamB);
}

function checkallvaluearezerosA(arr) {
  if (arr.every((item) => item.ms === 0)) {
    btn_checkA.style.visibility = "hidden";
    resetA();
  }
  return arr.every((item) => item.ms === 0);
}
function checkallvalueare12A(arr) {
  if (arr.slice(1).every((item) => item.ms === 12)) {
    btn_checkB.style.visibility = "hidden";
    resetA();
  }
  return arr.slice(1).every((item) => item.ms === 12);
}

function checkallvaluearezerosB(arr) {
  if (arr.every((item) => item.ms === 0)) {
    btn_checkB.style.visibility = "hidden";
    resetB();
  }
  return arr.every((item) => item.ms === 0);
}
function checkallvalueare12B(arr) {
  if (arr.slice(1).every((item) => item.ms === 12)) {
    btn_checkB.style.visibility = "hidden";
    resetB();
  }
  return arr.slice(1).every((item) => item.ms === 12);
}
