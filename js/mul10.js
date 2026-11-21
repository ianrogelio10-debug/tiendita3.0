let temporizador;

const spinner = document.createElement("img");
spinner.src = "loading.gif";
spinner.alt = "Cargando...";
spinner.style.display = "none";
spinner.style.width = "400px";
document.querySelector("#tabla").before(spinner);

function calcular() {
  let n = parseInt(document.querySelector("#numero").value);
  document.querySelector("#vn").innerHTML = `<b style="color:#dc2626">${n}</b>`;

  spinner.style.display = "block";
  document.querySelector("#tabla").innerHTML = "";

  clearTimeout(temporizador);
  temporizador = setTimeout(() => {
    let html = "";
    for (let i = 1; i <= 10; i++) {
      html += `<h3 style="background:#fee2e2; color:#991b1b; padding:10px; border-radius:8px; margin:8px;">
      <span style="color:#dc2626">${n}</span> x 
      <span style="color:#dc2626">${i}</span> = 
      <span style="color:#991b1b">${n * i}</span></h3>`;
    }
    document.querySelector("#tabla").innerHTML = html;
    spinner.style.display = "none";
  }, 1000);
}

function reset() {
  clearTimeout(temporizador);
  document.querySelector("#numero").value = 1;
  document.querySelector("#vn").innerHTML = "1";
  document.querySelector("#tabla").innerHTML = "";
  spinner.style.display = "none";
}

document.querySelector("#numero").addEventListener("input", calcular);
document.querySelector("#reset").addEventListener("click", reset);