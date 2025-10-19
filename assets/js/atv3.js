function mostrarDado() {
  const salarioBruto = parseFloat(document.getElementById("salarioBruto").value);
  const numeroDependentes = parseInt(document.getElementById("numeroDependentes").value);

  if (isNaN(salarioBruto) || isNaN(numeroDependentes)) {
    alert("Por favor, preencha todos os campos com números válidos.");
    return;
  }

  // desconto INSS
  let descontoInss;
  if (salarioBruto <= 1518) descontoInss = salarioBruto * 0.075;
  else if (salarioBruto <= 2826.65) descontoInss = salarioBruto * 0.09;
  else if (salarioBruto <= 3751.06) descontoInss = salarioBruto * 0.12;
  else if (salarioBruto <= 4664.68) descontoInss = salarioBruto * 0.14;
  else descontoInss = 4664.68 * 0.14;

  // Base de cálculo 
  const baseCalculo = Math.max(0, salarioBruto - descontoInss - numeroDependentes * 189.59);

  // IRRF
  let IR = 0;
  if (baseCalculo <= 2259.20) IR = 0;
  else if (baseCalculo <= 2826.65) IR = baseCalculo * 0.075 - 169.44;
  else if (baseCalculo <= 3751.05) IR = baseCalculo * 0.15 - 381.44;
  else if (baseCalculo <= 4664.68) IR = baseCalculo * 0.225 - 662.77;
  else IR = baseCalculo * 0.275 - 896.00;

  
  document.getElementById("res-valorBase").innerText = "Valor base de cálculo: R$ " + baseCalculo.toFixed(2);
  document.getElementById("res-valorIRRF").innerText = "IRRF a recolher: R$ " + IR.toFixed(2);

  // Dados do gráfico 
  const faixas = [
    "Até 2.259,20",
    "2.259,21 a 2.826,65",
    "2.826,66 a 3.751,05",
    "3.751,06 a 4.664,68",
    "Acima de 4.664,68",
  ];

  const valoresIRRF = [
    0,
    2826.65 * 0.075 - 169.44,
    3751.05 * 0.15 - 381.44,
    4664.68 * 0.225 - 662.77,
    5000 * 0.275 - 896.00,
  ];

  // Posição do usuário
  let indiceUsuario;
  if (baseCalculo <= 2259.20) indiceUsuario = 0;
  else if (baseCalculo <= 2826.65) indiceUsuario = 1;
  else if (baseCalculo <= 3751.05) indiceUsuario = 2;
  else if (baseCalculo <= 4664.68) indiceUsuario = 3;
  else indiceUsuario = 4;

  // Destaque dele
  let destaqueUsuario = valoresIRRF.map(() => null);
  destaqueUsuario[indiceUsuario] = IR;

  // Gráfico 1
  Highcharts.chart("graficoIRRF", {
    chart: { type: "line" },
    title: { text: "Evolução do IRRF por faixa" },
    xAxis: { categories: faixas },
    yAxis: { title: { text: "Valor do IRRF (R$)" } },
    tooltip: { pointFormat: "{series.name}: <b>R$ {point.y:,.2f}</b>" },
    plotOptions: {
      line: {
        dataLabels: { enabled: true, formatter: function() { return "R$ " + this.y.toFixed(2).replace(".", ","); } },
        enableMouseTracking: true
      }
    },
    series: [
      { name: "IRRF por faixa", data: valoresIRRF },
      { name: "Seu IRRF", data: destaqueUsuario, color: "#2e8b57", marker: { enabled: true, radius: 6 } }
    ]
  });

  // Cálculo sem dedução
  const baseSemDeducao = salarioBruto - descontoInss;
  let IR_semDeducao = 0;
  if (baseSemDeducao <= 1903.98) IR_semDeducao = 0;
  else if (baseSemDeducao <= 2826.65) IR_semDeducao = baseSemDeducao * 0.075 - 142.8;
  else if (baseSemDeducao <= 3751.05) IR_semDeducao = baseSemDeducao * 0.15 - 354.8;
  else if (baseSemDeducao <= 4664.68) IR_semDeducao = baseSemDeducao * 0.225 - 636.13;
  else IR_semDeducao = baseSemDeducao * 0.275 - 869.36;

  // Destaque sem dedução
  let destaqueUsuarioSemDed = valoresIRRF.map(() => null);
  destaqueUsuarioSemDed[indiceUsuario] = IR_semDeducao;

  //  Gráfico 2 
  Highcharts.chart("EvolucaoIRRF", {
    chart: { type: "line" },
    title: { text: "Evolução do IRRF sem dedução por dependentes" },
    xAxis: { categories: faixas },
    yAxis: { title: { text: "Valor do IRRF (R$)" } },
    tooltip: { pointFormat: "{series.name}: <b>R$ {point.y:,.2f}</b>" },
    plotOptions: {
      line: {
        dataLabels: { enabled: true, formatter: function() { return "R$ " + this.y.toFixed(2).replace(".", ","); } },
        enableMouseTracking: true
      }
    },
    series: [
      { name: "IRRF por faixa", data: valoresIRRF },
      { name: "Seu IRRF sem dedução", data: destaqueUsuarioSemDed, color: "#d9534f", marker: { enabled: true, radius: 6 } }
    ]
  });
}
