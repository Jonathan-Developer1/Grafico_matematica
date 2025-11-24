
function calcular()
{

    
const xFirst = parseFloat(document.getElementById("coordenada_x_primeiro_ponto").value);
const yFirst = parseFloat(document.getElementById("coordenada_y_primeiro_ponto").value);
const xSecond = parseFloat(document.getElementById("coordenada_x_segundo_ponto").value);
const ySecond = parseFloat(document.getElementById("coordenada_y_segundo_ponto").value); 



let a;

let b;



a = (ySecond-yFirst)/(xSecond-xFirst);

b = a * (xFirst * -1) - (yFirst * -1);

let abcissas;
let ordenadas;

abcissas = (-1* b)/ a;
ordenadas = b;

const funcao = document.getElementById("funcao");

funcao.innerHTML = `Reta: y = ${a}x + ${b}`;

const abcissasTexto = document.getElementById("abscissas");
const ordenadasTexto = document.getElementById("ordenadas");
abcissasTexto.innerHTML = `(${abcissas}, 0)`;
ordenadasTexto.innerHTML = `(0, ${ordenadas})`;


criarChart(xFirst,xSecond,yFirst,ySecond,a,b);

}

let chart = null;



function criarChart(xFirst, xSecond,yFirst,ySecond,a,b)
{
    

    
const reta = {
    label: `Reta: y = ${a}x + ${b}`,
        type: 'line',
        data: [
          { x: -10, y: a * -10 + b },
          { x: 10,  y: a * 10 + b }
        ],
        borderWidth: 2,
        borderColor: 'red',
        tension: 0,
        fill: false,
        pointRadius: 0
      };

const data = {
  datasets: [{
    label: 'Scatter Dataset',
    data: [{
      x: xFirst,
      y: yFirst
    }, {
      x: xSecond,
      y: ySecond
    }],
    backgroundColor: 'rgba(17, 43, 97, 1)'
},
reta
]};


const ctx = document.getElementById('myChart');

  if (chart !== null) {
        chart.destroy();
    }

chart = new Chart(ctx, {
  type: 'scatter',
  data: data,
  options: {
    scales: {
      x: {
        type: 'linear',
        min: -10,
        max: 10
      },
      y: {
        type: 'linear',
        min: -10,
        max: 10
      }
    }
  }
});
}
  

