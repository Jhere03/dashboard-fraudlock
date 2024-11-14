// Variables globales para los gráficos
let detectionTimeChart, detectionRateChart, detectionRatePercentageChart, detectionCountChart;

/*******
*******
Tiempo promedio
*******
*******/
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/detections');
        const data = await response.json();

        console.log("Gráfico time - CARGADO");

        const labels = data.map(detection => detection.fecha).reverse();
        const times = data.map(detection => detection.promedio).reverse();

        const ctx = document.getElementById('detectionTimeChart').getContext('2d');
        detectionTimeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Tiempo promedio de detección (segundos)',
                    data: times,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    datalabels: {
                        anchor: 'end',
                        align: 'top',
                        formatter: (value) => value,
                        color: '#000',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });

        // Asigna el gráfico al objeto window para acceso global
        window.detectionTimeChart = detectionTimeChart;
    } catch (error) {
        console.error("Error al cargar los datos: ", error);
    }
});

/*******
*******
Tasa de detección
*******
*******/
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/detection-rate-data');
        const data = await response.json();

        console.log("Gráfico tasa - CARGADO");

        const labels = data.map(item => item.fecha).reverse();
        const sitesData = data.map(item => item.sites).reverse();
        const detectionsData = data.map(item => item.detections).reverse();

        const ctx = document.getElementById('detectionRateChart').getContext('2d');
        detectionRateChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Sitios evaluados',
                        data: sitesData,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Detecciones',
                        data: detectionsData,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    datalabels: {
                        anchor: 'center',
                        align: 'center',
                        formatter: (value) => value,
                        color: '#000000',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });

        // Asigna el gráfico al objeto window para acceso global
        window.detectionRateChart = detectionRateChart;
    } catch (error) {
        console.error("Error al cargar los datos: ", error);
    }
});

/*******
*******
Gráfico pastel
*******
*******/
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/detection-rate-percentage-data');
        const data = await response.json();

        console.log("Gráfico pastel - CARGADO");

        const labels = data.map(item => item.fecha);
        const detectionPercentages = data.map(item => parseFloat(item.tasa_det));

        const ctx = document.getElementById('detectionRatePercentageChart').getContext('2d');
        detectionRatePercentageChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Tasa de Detección (%)',
                    data: detectionPercentages,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(100, 181, 246, 0.6)',
                        'rgba(255, 138, 101, 0.6)',
                        'rgba(165, 214, 167, 0.6)',
                        'rgba(255, 202, 40, 0.6)'
                    ],
                    borderColor: 'rgba(255, 255, 255, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `${context.label}: ${context.raw.toFixed(2)}%`;
                            }
                        }
                    },
                    datalabels: {
                        formatter: (value) => {
                            return typeof value === 'number' && !isNaN(value) ? `${value.toFixed(2)}%` : 'N/A';
                        },
                        color: '#000000',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });

        // Asigna el gráfico al objeto window para acceso global
        window.detectionRatePercentageChart = detectionRatePercentageChart;
    } catch (error) {
        console.error("Error al cargar los datos: ", error);
    }
});

/*******
*******
Número de detecciones
*******
*******/
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/detection-count-data');
        const data = await response.json();

        console.log("Gráfico detections - CARGADO");

        const labels = data.map(item => item.fecha).reverse();
        const detectionCounts = data.map(item => item.detections).reverse();

        const ctx = document.getElementById('detectionCountChart').getContext('2d');
        detectionCountChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Número de Detecciones',
                    data: detectionCounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        formatter: (value) => value,
                        color: '#000',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });

        // Asigna el gráfico al objeto window para acceso global
        window.detectionCountChart = detectionCountChart;
    } catch (error) {
        console.error("Error al cargar los datos: ", error);
    }
});



// Funciones de actualización definidas globalmente

function updateDetectionTimeChart(newData) {
    // Ordenar los datos por fecha de manera ascendente
    newData.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    
    const newLabels = newData.map(detection => detection.fecha);
    const newTimes = newData.map(detection => detection.promedio);
    detectionTimeChart.data.labels = newLabels;
    detectionTimeChart.data.datasets[0].data = newTimes;
    detectionTimeChart.update();
}

function updateDetectionRateChart(newData) {
    newData.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    const newLabels = newData.map(item => item.fecha);
    const newSitesData = newData.map(item => item.sites);
    const newDetectionsData = newData.map(item => item.detections);
    detectionRateChart.data.labels = newLabels;
    detectionRateChart.data.datasets[0].data = newSitesData;
    detectionRateChart.data.datasets[1].data = newDetectionsData;
    detectionRateChart.update();
}

function updateDetectionRatePercentageChart(newData) {
    newData.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    const newLabels = newData.map(item => item.fecha);
    const newDetectionPercentages = newData.map(item => parseFloat(item.tasa_det));
    detectionRatePercentageChart.data.labels = newLabels;
    detectionRatePercentageChart.data.datasets[0].data = newDetectionPercentages;
    detectionRatePercentageChart.update();
}

function updateDetectionCountChart(newData) {
    newData.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    const newLabels = newData.map(item => item.fecha);
    const newDetectionCounts = newData.map(item => item.detections);
    detectionCountChart.data.labels = newLabels;
    detectionCountChart.data.datasets[0].data = newDetectionCounts;
    detectionCountChart.update();
}