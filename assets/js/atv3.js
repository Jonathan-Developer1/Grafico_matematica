//Guigui ta no controle, GENTILEZA NÃO MEXER

function mostrarDado() {
  const salarioBruto = parseFloat(
    document.getElementById("salarioBruto").value
  );
  const numeroDependentes = parseInt(
    document.getElementById("numeroDependentes").value
  );

  if (isNaN(salarioBruto) || isNaN(numeroDependentes)) {
    alert("Por favor, preencha todos os campos com números válidos.");
    return;
  }

  // Cálculo do desconto do INSS
  let descontoInss;

  if (salarioBruto <= 1518) {
    descontoInss = salarioBruto * 0.075;
  } else if (salarioBruto <= 2826.65) {
    descontoInss = salarioBruto * 0.09;
  } else if (salarioBruto <= 3751.06) {
    descontoInss = salarioBruto * 0.12;
  } else if (salarioBruto <= 4664.68) {
    descontoInss = salarioBruto * 0.14;
  } else {
    descontoInss = 4664.68 * 0.14;
  }

  // Cálculo da base de cálculo do IRRF
  const baseCalculo = Math.max(
    0,
    salarioBruto - descontoInss - numeroDependentes * 189.59
  );

  // Cálculo do IRRF a recolher
  let IR;
  if (baseCalculo <= 1903.98) IR = 0;
  else if (baseCalculo <= 2826.65) IR = baseCalculo * 0.075 - 142.8;
  else if (baseCalculo <= 3751.05) IR = baseCalculo * 0.15 - 354.8;
  else if (baseCalculo <= 4664.68) IR = baseCalculo * 0.225 - 636.13;
  else IR = baseCalculo * 0.275 - 869.36;

  // Mostrar na tela
  document.getElementById("res-valorBase").innerText =
    "Valor base de cálculo: R$ " + baseCalculo.toFixed(2);
  document.getElementById("res-valorIRRF").innerText =
    "IRRF a recolher: R$ " + IR.toFixed(2);

  // ---- Gráfico 1 ----
  const faixas = [
    "Até 1903,98",
    "1903,99 a 2826,65",
    "2826,66 a 3751,05",
    "3751,06 a 4664,68",
    "Acima de 4664,68",
  ];

  const valoresIRRF = [
    0,
    2826.65 * 0.075 - 142.8,
    3751.05 * 0.15 - 354.8,
    4664.68 * 0.225 - 636.13,
    5000 * 0.275 - 869.36,
  ];

  // Destaque do usuário
  let destaqueUsuario = valoresIRRF.map(() => null);
  let indiceUsuario;
  if (baseCalculo <= 1903.98) indiceUsuario = 0;
  else if (baseCalculo <= 2826.65) indiceUsuario = 1;
  else if (baseCalculo <= 3751.05) indiceUsuario = 2;
  else if (baseCalculo <= 4664.68) indiceUsuario = 3;
  else indiceUsuario = 4;
  destaqueUsuario[indiceUsuario] = IR;

  Highcharts.chart("graficoIRRF", {
    chart: { type: "line" },
    title: { text: "Evolução do IRRF por faixa" },
    xAxis: { categories: faixas },
    yAxis: { title: { text: "Valor do IRRF (R$)" } },
    tooltip: { pointFormat: "{series.name}: <b>R$ {point.y:,.2f}</b>" },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
          formatter: function () {
            return "R$ " + this.y.toFixed(2).replace(".", ",");
          },
        },
        enableMouseTracking: true,
      },
    },
    series: [
      { name: "IRRF por faixa", data: valoresIRRF },
      {
        name: "Seu IRRF",
        data: destaqueUsuario,
        color: "#2e8b57",
        marker: { enabled: true, radius: 6 },
      },
    ],
  });

  // ---- Gráfico 2: sem dedução por dependentes ----
  const baseSemDeducao = salarioBruto - descontoInss;
  let IR_semDeducao = 0;

  if (baseSemDeducao <= 1903.98) IR_semDeducao = 0;
  else if (baseSemDeducao <= 2826.65)
    IR_semDeducao = baseSemDeducao * 0.075 - 142.8;
  else if (baseSemDeducao <= 3751.05)
    IR_semDeducao = baseSemDeducao * 0.15 - 354.8;
  else if (baseSemDeducao <= 4664.68)
    IR_semDeducao = baseSemDeducao * 0.225 - 636.13;
  else IR_semDeducao = baseSemDeducao * 0.275 - 869.36;

  let destaqueUsuarioSemDed = valoresIRRF.map(() => null);
  destaqueUsuarioSemDed[indiceUsuario] = IR_semDeducao;

  Highcharts.chart("EvolucaoIRRF", {
    chart: { type: "line" },
    title: { text: "Evolução do IRRF sem dedução por dependentes" },
    xAxis: { categories: faixas },
    yAxis: { title: { text: "Valor do IRRF (R$)" } },
    tooltip: { pointFormat: "{series.name}: <b>R$ {point.y:,.2f}</b>" },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
          formatter: function () {
            return "R$ " + this.y.toFixed(2).replace(".", ",");
          },
        },
        enableMouseTracking: true,
      },
    },
    series: [
      { name: "IRRF por faixa", data: valoresIRRF },
      {
        name: "Seu IRRF sem dedução",
        data: destaqueUsuarioSemDed,
        color: "#d9534f",
        marker: { enabled: true, radius: 6 },
      },
    ],
  });
}
