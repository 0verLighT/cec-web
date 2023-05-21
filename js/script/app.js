//définition des éléments du DOM
const input_name_teamA = document.getElementById("Name_team");
const input_name_teamB = document.getElementById("Name_teamB");
const span_name_teamA = document.getElementById("Name_team_span");
const span_name_teamB = document.getElementById("Name_teamB_span");
const vitesse_teamA = document.getElementById("vitesse_teamA");
const vitesse_teamB = document.getElementById("vitesse_teamB");
const box_info = document.getElementById("box_info","box_infoB");
const box_checkA = document.getElementById("box_info_check");
const box_checkB = document.getElementById("box_info_checkB");
const btn_checkA = document.getElementById("btn_check");
const btn_checkB = document.getElementById("btn_checkB");
const section_teamA = document.getElementById("team_A");
const section_teamB = document.getElementById("team_B");
let teamA = [{ ms: 0, s: 0 }];
let teamB = [{ ms: 0, s: 0 }];
input_name_teamA.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {nameTeam(input_name_teamA, span_name_teamA, "Équipe A");}
    if (e.key === "Backspace") {nameTeam( input_name_teamA,span_name_teamA, "Équipe A");}
});
input_name_teamB.addEventListener("keyup", (e) => { 
  if (e.key === "Enter") {nameTeam(input_name_teamB, span_name_teamB, "Équipe B");}
  if (e.key === "Backspace") {nameTeam(input_name_teamB,span_name_teamB , "Équipe B");}
});
//lancer quand c'est entrer dans l'input et le bouton valider
function nameTeam(elementInput, elementSpan, team) {
  let teamName = "";
  elementInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        elementSpan.textContent = `(${elementInput.value.trim()})`;
        teamName = elementInput.value.trim();
    }
    if (e.key === "Backspace") {
        elementSpan.innerHTML = "";
    }
    if (elementSpan == null ||elementSpan.textContent === "" ||elementSpan.textContent === "()") {
      teamName = team;
    } else {
      teamName = elementSpan.textContent.replace("(", "").replace(")", "");
      console.log(teamName);
    }
    return teamName;
});
};
vitesse_teamA.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {append_data(teamA, vitesse_teamA, btn_checkA, "Chart_TeamA", "graphiqueA", box_info)}
});
vitesse_teamB.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {append_data(teamB, vitesse_teamB, btn_checkB, "Chart_TeamB", "graphiqueB", box_info)}
});
function append_data(team, vistesse, btn_check, elementCanvas, graphique) {
   if (team.length === 7) {
    setupBoxinfo("Le tableau est déjà rempli", "red", box_info);
    return; 
  } else if (!(isNaN(parseFloat(vistesse.value)))){
    if (!(vistesse.value < 0 || vistesse.value > 12)) {
      let s = parseInt(team.length);
      let teamValue = {
        ms: parseFloat(vistesse.value),
        s: s++,
      };
      vistesse.value = "";
      team.push(teamValue);
      if(team.length === 7) {
        createChart(team, graphique, elementCanvas);
        btn_check.style.visibility = "visible";
        if (checkallvaluearezeros(team) === true) {
          checkallvaluearezeros(team, btn_check, graphique);
          return setupBoxinfo("Faudrait peut-être accélérer un peu non ?", "red", box_info);
        } else if (checkallvalueare12(team) === true) {
          checkallvalueare12(team, btn_check, graphique);
          return setupBoxinfo("Faudrait peut-être ralentir un peu non ?", "red", box_info);
        } else{
          checklastvalue(team, btn_checkA);
        }
      }
    } else { 
    return setupBoxinfo("Le nombre est inférieur à 0 ou supérieur à 12", "red", box_info);
    };
  } else {
  return setupBoxinfo("Ce n'est pas un nombre", "red", box_info);
  }; 
};
function checklastvalue(team, btn_check, graphique) {
    //verifie si la derniere valeur n'est pas 0  si oui la supprime avec un message d'erreur
    if (team[team.length - 1].ms === 0) {
        team.pop();
        setupBoxinfo("La dernière valeur est 0 veuillez saisir une nouvelle valeur", "red", box_infoA);
        afficherEquipes();
        graphique.destroy();
        btn_check.style.visibility = "hidden";
        return console.log("la derniere valeur est 0");
  };
};
/**
 * 
 * @param {Array} team 
 * @param {string} graphique 
 * @param {Element} btn_check 
 * @returns 
 */
function reset(team, graphique, btn_check, elementTable) {
    if (team.length === 1) {
      return setupBoxinfo("Le tableau est déjà vide", "red", box_infoA);
    };
  //mettre des paramtère et la function de createion de chart 
  if (graphique) {
    graphique.destroy();
  }
  console.log(`reset value team ${team}`);
  let reset = [{ ms: 0, s: 0 }];
  team.splice(0, team.length, ...reset);
  btn_check.style.visibility = "hidden";
  afficherEquipes(team,elementTable);
};
/**
 * 
 * @param {Element} section_actuelle 
 * @param {Element} section_suivante 
 * @param {Element} input_name_teamA
 * @param {Element} span_name_teamA
 * @param {string} name_defaut
 * @returns 
 */
function checkSettingsTeam(section_actuelle, section_suivante, input_name_teamA, span_name_teamA, name_defaut) {
  section_actuelle.style.display = "none";
  section_suivante.style.display = "flex";
  nameTeam(input_name_teamA, span_name_teamA, name_defaut);
  return ;
}
/**
 * Ajoute un message d'erreur dans la box_info
 * @param {string} message
 * @param {string} color
 * @param {Element} box_info
 */
function setupBoxinfo(message, color , box_info) {
  box_info.textContent = message;
  box_info.style.color = color;
  setTimeout(() => {
    box_info.textContent = "";
  }, 5000);
}
/**
 * crée un tableau dans le DOM et l'ajoute à la page
 * @param {Array} team
 * @param {string} elementTable
 * @returns
*/
function afficherEquipes(team, elementTable) {
  const container = document.getElementById(elementTable);
  const table = document.getElementById("equipe-table");
  if (table) {
      container.removeChild(table);
  }
  const newTable = document.createElement("table");
  newTable.setAttribute("id", "equipe-table");
  newTable.setAttribute("class", "table");
  container.appendChild(newTable);
  const headerRow = document.createElement("tr");
  const headers = ["ms", "s"];
  headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
  });
  newTable.appendChild(headerRow);
  team.forEach((equipe) => {
      const row = document.createElement("tr");
      Object.values(equipe).forEach((value) => {
          const cell = document.createElement("td");
          cell.textContent = value;
          row.appendChild(cell);
      });
      newTable.appendChild(row);
  });
};
function createChart( team, graphique , elementCanvas) {
  let name_graph = graphique;
  const ctx = document.getElementById(elementCanvas);
    name_graph = new Chart(ctx, {
      type: "line",
      data: {
          labels: [team[0].s,team[1].s,team[2].s,team[3].s,team[4].s,team[5].s,team[6].s],
          datasets: [
              {
                  label: "Courbe d'accélération",
                  data: [team[0].ms,team[1].ms,team[2].ms,team[3].ms,team[4].ms,team[5].ms,team[6].ms],
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
};

function calculs(team) {
  let tempsfinalenplus = patinage(team);
  let distancefinal = 75;
  let tempsfinal = 0;
  let distance = 0;
  let distance_retante = 0;
  let tempsextra = 0;
  let vitesseMoyenne = 0;
  for (let i = 0; i < team.length - 1; i++) {
    distance += 0.5 * (team[i].ms + team[i + 1].ms);
  }
  distance_retante = distancefinal - distance;
  tempsextra = distance_retante / team[team.length - 1].ms;
  tempsfinal = (team[team.length - 1].s + tempsextra + tempsfinalenplus).toFixed(3);
  vitesseMoyenne = (distance / tempsfinal).toFixed(3);
  console.log(`Le temps final est ${tempsfinal} secondes`);
  return { tempsfinal, vitesseMoyenne};
};

function win() {
  if (calculs(teamA)["tempsfinal"] < calculs(teamB)["tempsfinal"]) {
    console.log(`${nameTeam(teamA)} gagne`);
  } else if (calculs(teamA)["tempsfinal"] === calculs(teamB)["tempsfinal"]) {
    console.log(`égalité entre ${nameTeam(teamA)} et ${nameTeam(teamB)} avec ${calculs()["tempsfinal"]} secondes`);
  } else {
    console.log(`${nameTeam(teamB)} gagne`);
  };
};
function checkallvaluearezeros(arr, btn_check, graphique) {
  if (arr.every((item) => item.ms === 0)) {
    btn_check.style.visibility = "hidden";
    reset(arr, btn_check, graphique);
  }
  return arr.every((item) => item.ms === 0);
};
function checkallvalueare12(arr, btn_check, graphique) {
  if (arr.slice(1).every((item) => item.ms === 12)) {
    btn_check.style.visibility = "hidden";
    reset(arr, btn_check, graphique);
  }
  return arr.slice(1).every((item) => item.ms === 12);
};
function pushJson() {
  let data =[ 
    {
      "name" : name_teamA,
      "result" : calculsA()["tempsfinal"],
      "vitesse" : calculsA()["vitesseMoyenne"]
    },
    {
      "name" : name_teamB,
      "result" : calculsA()["tempsfinal"],
      "vitesse" : calculsB()["vitesseMoyenne"]
    }
  ]
  fetch("http://91.163.145.45:2015/append_data", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json"
    },
});
};
/**
 * fonction qui permet de calculer le temps en plus en fonction de la courbe de patinage
 * @param {Object} team 
 * @returns 
 */
function patinage(team) {
  const _0x58c4x2 = [0,6,9,10.5,11.5,12,12,];
  let timeadd = [];
  let tempsfinalenplus = 0;
  const add = timeadd => timeadd.reduce((a, b) => a + b, 0);
  for (let i = 0; i < team.length; i++) {
    if (team[i].ms > _0x58c4x2[i].ms) {
      let timeaddpoint = parseFloat(team[i]/ _0x58c4x2[i] - 1)*1.35+0.1*(team[i].ms - _0x58c4x2[i])*(team[i].ms-_0x58c4x2[i]);
      timeadd.push(timeaddpoint);
    } else {
      timeadd.push(timeaddpoint = 0);
    };
  };
  tempsfinalenplus = add(timeadd);
  return tempsfinalenplus;
};