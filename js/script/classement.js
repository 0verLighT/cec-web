const classement = document.getElementById('classement')

function getapi() {
    let inc = 0 
    fetch("http://91.163.145.45:2015/get_data")
    .then(res => res.json())
    .then(data => {
        // data.sort((a,b) => a.result > b.result)
        for (i of data) {
            inc++;
            let tr = document.createElement("tr")
            let th = document.createElement("th")
            th.textContent = inc
            tr.appendChild(th)
            let tha = document.createElement("th")
            tha.textContent = i.name
            tr.appendChild(tha)
            let thb = document.createElement("th")
            thb.textContent = i.result
            tr.appendChild(thb)
            classement.appendChild(tr)
        }
    }) 
}

window.addEventListener('load',() => getapi());