const input_name_teamA = document.getElementById("Name_team");
const input_name_teamB = document.getElementById("Name_teamB");
const span_name_teamA = document.getElementById("Name_team_span");
const span_name_teamB = document.getElementById("Name_teamB_span");
const vitesse_teamA = document.getElementById("vitesse_teamA");
const vitesse_teamB = document.getElementById("vitesse_teamB");
const box_info = document.getElementById("box_info");
const box_infoB = document.getElementById("box_infoB");
const box_checkA = document.getElementById("box_info_check");
const box_checkB = document.getElementById("box_info_checkB");
const btn_checkA = document.getElementById("btn_check");
const btn_checkB = document.getElementById("btn_checkB");
const section_teamA = document.getElementById("team_A");
const section_teamB = document.getElementById("team_B");
let teamA = [{ ms: 0, s: 0 }];
let teamB = [{ ms: 0, s: 0 }];
let graphiqueA;
let graphiqueB;
input_name_teamA.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {nameTeam(input_name_teamA, span_name_teamA);}
    if (e.key === "Backspace") {nameTeam( input_name_teamA,span_name_teamA);}
});
input_name_teamB.addEventListener("keyup", (e) => { 
  if (e.key === "Enter") {nameTeam(input_name_teamB, span_name_teamB);}
  if (e.key === "Backspace") {nameTeam(input_name_teamB,span_name_teamB);}
});
function nameTeam(elementInput, elementSpan) {
  let teamName = "";
  teamName = elementSpan.textContent.replace("(", "").replace(")", "");
  console.log(teamName);
  if (elementInput.value.trim() !== "") {
    teamName = elementInput.value.trim();
  }
  elementSpan.textContent = `(${teamName})`;
  return teamName ;
};
function checkName(elementInput1, elementInput2) {
  // input_name_teamA , input_name_teamB
  let teamNameValue = {
    name_teamA: elementInput1.value.trim(),
    name_teamB: elementInput2.value.trim(),
    };
  return teamNameValue;
} 
vitesse_teamA.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {append_data(teamA, vitesse_teamA, btn_checkA, "Chart_TeamA", 'graphiqueA', box_info, "equipeContainerTeamA")}
});
vitesse_teamB.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {append_data(teamB, vitesse_teamB, btn_checkB, "Chart_TeamB", 'graphiqueB', box_infoB, "equipeContainerTeamB")}
});
function append_data(team, vistesse, btn_check, elementCanvas, graphique, box_info,elementTable) {
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
      afficherEquipes(team, elementTable);
      if(team.length === 7) {
        createChart(team, graphique, elementCanvas);
        btn_check.style.visibility = "visible";
        checkallcondition(team, btn_check,graphique, box_info,elementTable);
      }
    } else { 
    return setupBoxinfo("Le nombre est inférieur à 0 ou supérieur à 12", "red", box_info);
  };
} else {
  return setupBoxinfo("Ce n'est pas un nombre", "red", box_info);
  }; 
};
function afficherEquipes(team, elementTable) {
  const container = document.getElementById(elementTable);
  const table = document.getElementById(elementTable + "-table");
  if (table && table.parentNode === container) {
    container.removeChild(table);
  }
  const newTable = document.createElement("table");
  newTable.setAttribute("id", elementTable + "-table"); // Utiliser l'ID dynamique
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
function reset(team, elementCanvas, btn_check, elementTable) {
  console.log(elementCanvas);
  if (team.length === 1) {
    return setupBoxinfo("Le tableau est déjà vide", "red", box_info);
  };
  if (graphiqueA !== undefined) {
    graphiqueA.destroy();
  }
  if (graphiqueB !== undefined) {
    graphiqueB.destroy();
  }
  let reset = [{ ms: 0, s: 0 }];
  team.splice(0, team.length, ...reset);
  btn_check.style.visibility = "hidden";
  afficherEquipes(team,elementTable);
};
function checkSettingsTeam(section_actuelle, section_suivante, span_name_team) {
  if (span_name_team.textContent.trim() === "") {
    return setupBoxinfo("Veuillez entrer un nom d'équipe", "red", box_info);
  } else {
    section_actuelle.style.display = "none";
    section_suivante.style.display = "block";
    return;
  };
};

function setupBoxinfo(message, color , box_info) {
  box_info.textContent = message;
  box_info.style.color = color;
  setTimeout(() => {
    box_info.textContent = "";
  }, 5000);
}
function createChart( team, graphique , elementCanvas) {
  if (elementCanvas === "Chart_TeamA") {
    const ctx = document.getElementById(elementCanvas);
    if (ctx) {
      graphiqueA = new Chart(ctx, {
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
    }
  } else if (elementCanvas === "Chart_TeamB") {
    const ctx = document.getElementById(elementCanvas);
    if (ctx) {
      graphiqueB = new Chart(ctx, {
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
    } 
  }
};
function checkallcondition(arr, btn_check , graphique,box_info, elementTable) {
  if (arr.every((item) => item.ms === 0)) {
    btn_check.style.visibility = "hidden";
    setupBoxinfo("Faudrait peut-être accélérer un peu non ?", "red", box_info)
    reset(arr, graphique, btn_check, elementTable);
  } else if (arr.slice(1).every((item) => item.ms === 12)) {
    btn_check.style.visibility = "hidden";
    setupBoxinfo("Tu t'es pris pour une fusée ?", "red", box_info)
    reset(arr, graphique, btn_check, elementTable);
  } else if (arr[arr.length - 1].ms === 0) {
    arr.pop();
    setupBoxinfo("La dernière valeur est 0 veuillez saisir une nouvelle valeur", "red", box_info);
    afficherEquipes(arr, elementTable);
    if (graphiqueA !== undefined) {
      graphiqueA.destroy();
    }
    if (graphiqueB !== undefined) {
      graphiqueB.destroy();
    }
    btn_check.style.visibility = "hidden";
    return console.log("la derniere valeur est 0");
  }
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
  vitesseMoyenne = (distancefinal / tempsfinal).toFixed(3);
  return { tempsfinal, vitesseMoyenne , team};
};

function win() {
  if (calculs(teamA)["tempsfinal"] < calculs(teamB)["tempsfinal"]) {
    console.log(`${nameTeam(teamA)} gagne`);
  } else if (calculs(teamA)["tempsfinal"] === calculs(teamB)["tempsfinal"]) {
    console.log(`égalité entre ${nameTeam(teamA)} et ${nameTeam(teamB)} avec ${calculs(teamA)["tempsfinal"]} secondes`);
  } else {
    console.log(`${nameTeam(teamB)} gagne`);
  };
};
function pushJson() {
  let teamNames = checkName(input_name_teamA, input_name_teamB);
  let data =[ 
    {
      "name" : teamNames.name_teamA,
      "result" : calculs(teamA)["tempsfinal"],
      "vitesse" : calculs(teamA)["vitesseMoyenne"]
    },
    {
      "name" : teamNames.name_teamB,
      "result" : calculs(teamB)["tempsfinal"],
      "vitesse" : calculs(teamB)["vitesseMoyenne"]
    }
  ]
  
  fetch("http://91.163.145.45:2015/append_data", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json"
    },
});
return data;
};
function patinage(team) {
  const _0x58c4x2 = [0,6,9,10.5,11.5,12,12,];
  let timeadd = [];
  let tempsfinalenplus = 0;
  const add = timeadd => timeadd.reduce((a, b) => a + b, 0);
  for (let i = 0; i < team.length; i++) {
    if (team[i].ms > _0x58c4x2[i]) {
      let timeaddpoint = parseFloat(team[i].ms/ _0x58c4x2[i] - 1)*1.35+0.1*(team[i].ms - _0x58c4x2[i])*(team[i].ms-_0x58c4x2[i]);
      timeadd.push(timeaddpoint);
    } else {
      timeadd.push(timeaddpoint = 0);
    };
  };
  tempsfinalenplus = add(timeadd);
  return tempsfinalenplus;
};
function animation_result() {
  
}