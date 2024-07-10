let data;

async function obtenerDatos() {

const res = await fetch('https://mindicador.cl/api/');
 data = await res.json();
 
console.log(data.dolar.valor);
}

const convertirValor = function() { 

    const valor = document.querySelector('#valor').value;
    const moneda = document.querySelector('#moneda').value;


    const valorConvertido = valor / data[moneda].valor; 

    document.querySelector('#resultado').textContent = `El valor convertido es: ${valorConvertido.toFixed(2)}`; 
}


obtenerDatos();

async function getMonedas() {
    const endpoint = "https://api.gael.cloud/general/public/monedas";
    const res = await fetch(endpoint);
    const monedas = await res.json();
    return monedas;
    }

    function prepararConfiguracionParaLaGrafica(monedas) {
        // Creamos las variables necesarias para el objeto de configuración
        const tipoDeGrafica = "line";
        const nombresDeLasMonedas = monedas.map((moneda) => moneda.Codigo);
        const titulo = "Monedas";
        const colorDeLinea = "red";
        const valores = monedas.map((moneda) => {
        const valor = moneda.Valor.replace(",", ".");
        return Number(valor);
        });
        // Creamos el objeto de configuración usando las variables anteriores
        const config = {
        type: tipoDeGrafica,
        data: {
        labels: nombresDeLasMonedas,
        datasets: [{
            label: titulo,
            backgroundColor: colorDeLinea,
            data: valores
            }
            ]
            }
            };
            return config;
            }

            async function renderGrafica() {
                const monedas = await getMonedas();
                const config = prepararConfiguracionParaLaGrafica(monedas);
                const chartDOM = document.getElementById("myChart");
                new Chart(chartDOM, config);
                }
                renderGrafica();