const calcular = () => {
    document.querySelector("#imc").innerHTML = "<img src='loading.gif' width='200px' height='200px'>";
   
    let peso = parseFloat(document.querySelector("#peso").value);
    let cm = parseFloat(document.querySelector("#estatura").value);
    let m = cm / 100;

    document.querySelector("#vp").innerHTML = `<b style="color: blue">${peso}</b>`;
    document.querySelector("#ve").innerHTML = `<b style="color: red">${cm}</b>`;

    let imc = peso / (m * m);

    let filas = document.querySelectorAll("tbody tr");

    filas.forEach(fila => {
        fila.style.border = "none";
        fila.style.transform = "scale(1)";
        fila.style.boxShadow = "none";
    });

    let filaResaltada = null;

    if (imc < 18.5) {
        filaResaltada = filas[0]; 
    } else if (imc >= 18.5 && imc <= 24.9) {
        filaResaltada = filas[1]; 
    } else if (imc >= 25 && imc <= 29.9) {
        filaResaltada = filas[2]; 
    } else if (imc >= 30 && imc <= 34.9) {
        filaResaltada = filas[3];
    } else if (imc >= 35 && imc <= 39.9) {
        filaResaltada = filas[4];
    } else {
        filaResaltada = filas[5];
    }

  
    setTimeout(() => {
        document.querySelector("#imc").innerHTML =
            `<b style="color: #ffc107; font-size:40px">${imc.toFixed(2)}</b>`;
        
        if (filaResaltada) {
            filaResaltada.style.border = "3px solid white";
            filaResaltada.style.transform = "scale(1.03)";
            filaResaltada.style.transition = "all 0.2s ease";
            filaResaltada.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.5)";
        }
    }, 300); 
}

function reset() {
    document.querySelector("#peso").value = 20;
    document.querySelector("#estatura").value = 100;
    document.querySelector("#vp").innerHTML = "20";
    document.querySelector("#ve").innerHTML = "100";
    document.querySelector("#imc").innerHTML = "0";

    let filas = document.querySelectorAll("tbody tr");
    filas.forEach(fila => {
        fila.style.border = "none";
        fila.style.transform = "scale(1)";
        fila.style.boxShadow = "none";
    });
}

document.querySelector("#peso").addEventListener("input", calcular);
document.querySelector("#estatura").addEventListener("input", calcular);
document.querySelector("#reset").addEventListener("click", reset);