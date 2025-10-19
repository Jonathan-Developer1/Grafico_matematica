function mostrarDado() {

    const capital = parseFloat(document.getElementById("capital").value);
    const tempo = parseFloat(document.getElementById("tempo").value);
    const taxa = parseFloat(document.getElementById("taxa").value) / 100;
    const taxaIPCA = parseFloat(document.getElementById("taxaIPCA").value) / 100;

    if (isNaN(capital) || isNaN(tempo) || isNaN(taxa)) {
        alert("Por favor, preencha todos os campos com números válidos.");
        return; 
    }

    let labelsEixoX = [];
    let dadosMontante = [];
    let dadosMontanteIPCA = []; 

    const intervalo = tempo / 10;

  for (let i = 1; i <= 10; i++) {
    const tempoAtual = intervalo * i;
    labelsEixoX.push(tempoAtual.toFixed(1));

    // Calcula o valor da aplicação neste ponto do tempo
    const valorAtual = capital * Math.pow(1 + taxa, tempoAtual);
    dadosMontante.push(parseFloat(valorAtual.toFixed(2)));

    // Calcula o valor corrigido pelo IPCA neste ponto do tempo
    const valorAtualIPCA = capital * Math.pow(1 + taxaIPCA, tempoAtual);
    dadosMontanteIPCA.push(parseFloat(valorAtualIPCA.toFixed(2)));
}

    const montanteFinal = dadosMontante[9];
    const montanteIPCAFinal = dadosMontanteIPCA[9];
    const diferenca = montanteFinal - montanteIPCAFinal;

    document.getElementById("res-montante").innerText = "Montante final da aplicação: R$ " + montanteFinal.toFixed(2);
    document.getElementById("res-montanteIPCA").innerText = "Montante final com IPCA: R$ " + montanteIPCAFinal.toFixed(2);
    document.getElementById("diferenca").innerText = "Diferença (ganho real): R$ " + diferenca.toFixed(2);


    Highcharts.chart('container', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Evolução do Investimento'
        },
        xAxis: {
            categories: labelsEixoX
        },
        yAxis: {
            title: {
                text: 'Valor Acumulado (R$)'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>R$ {point.y:,.2f}</b>'
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return 'R$ ' + this.y.toFixed(2).replace('.', ',');
                    }
                },
                enableMouseTracking: true
            }
        },
            series: [{
            name: 'Sua Aplicação',
            data: dadosMontante
        }, {
            name: 'Correção pelo IPCA',
            data: dadosMontanteIPCA
        }]
    });
}