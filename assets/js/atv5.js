//===============================================================




//===============================================================
//função geral
function funcao(x) {
  const a = parseInt(document.getElementById("a").value);
const b = parseInt(document.getElementById("b").value);
const c = parseInt(document.getElementById("c").value);

  return Math.pow(x, a) - b * x + c;
}

//===============================================================
//função a ser alterada
function funcao1(x) {
  return Math.pow(x, 3) - 9 * x + 3;
}
//===============================================================
//===============================================================

function calcularBissecao() {
  let xi = parseFloat(document.getElementById("xi").value);
  let xf = parseFloat(document.getElementById("xf").value);
  const toleranciaDesejada = parseFloat(document.getElementById("tol").value);
  const maxIteracoes = parseInt(document.getElementById("maxIter").value);

  const messagesDiv = document.getElementById("messages");
  const tableBody = document.getElementById("tableBody");
  const finalResultDiv = document.getElementById("finalResult");

  messagesDiv.innerHTML = "";
  messagesDiv.className = "";
  tableBody.innerHTML = "";
  finalResultDiv.innerHTML = "";

  if (
    isNaN(xi) ||
    isNaN(xf) ||
    isNaN(toleranciaDesejada) ||
    isNaN(maxIteracoes)
  ) {
    messagesDiv.innerHTML =
      "Erro: Verifique se todos os campos numéricos estão preenchidos corretamente.";
    messagesDiv.className = "error";
    return;
  }

  if (funcao(xi) * funcao(xf) >= 0) {
    messagesDiv.innerHTML = `
                <strong>[ERRO] O intervalo informado é INVÁLIDO.</strong><br>
                f(${xi}) = ${funcao(xi).toFixed(4)} <br>
                f(${xf}) = ${funcao(xf).toFixed(4)} <br>
                Os sinais da função devem ser opostos nas extremidades para garantir uma raiz.
            `;
    messagesDiv.className = "error";
    return;
  }

  messagesDiv.innerHTML = "[OK] Intervalo válido. Calculando...";
  messagesDiv.className = "success";

  let xm = 0;
  let tolAtual = 0;
  let raizEncontrada = false;

  for (let i = 1; i <= maxIteracoes; i++) {
    // Calcula o ponto médio
    xm = (xi + xf) / 2;

    let fxi = funcao(xi);
    let fxm = funcao(xm);
    let fxf = funcao(xf);

    tolAtual = Math.abs(xf - xi);

    let novaLinha = `
                <tr>
                    <td>${i}</td>
                    <td>${xi.toFixed(6)}</td>
                    <td>${xm.toFixed(6)}</td>
                    <td>${xf.toFixed(6)}</td>
                    <td>${fxi.toFixed(6)}</td>
                    <td>${fxm.toFixed(6)}</td>
                    <td>${fxf.toFixed(6)}</td>
                    <td>${tolAtual.toFixed(6)}</td>
                </tr>
            `;

    tableBody.innerHTML += novaLinha;

    if (tolAtual < toleranciaDesejada || fxm === 0) {
      raizEncontrada = true;
      break;
    }

    if (fxi * fxm < 0) {
      xf = xm;
    } else {
      xi = xm;
    }
  }

  let resultadoTexto = `>>> Resultado Final (Raiz Aproximada): ${xm.toFixed(
    6
  )}`;
  if (!raizEncontrada) {
    resultadoTexto +=
      "<br><small>(Nota: O número máximo de iterações foi atingido antes da tolerância desejada.)</small>";
  }
  finalResultDiv.innerHTML = resultadoTexto;
}
