document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('chartModal');
    const modalChartCanvas = document.getElementById('modalChart');
    const closeModalButton = document.getElementById('closeModalButton');
    let modalChart;

    // Bloquear scroll en el body cuando el modal esté visible
    const lockBodyScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    const unlockBodyScroll = () => {
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.open-modal-button').forEach(button => {
        button.addEventListener('click', () => {
            const chartId = button.getAttribute('data-chart-id');
            const originalChart = window[chartId];
            console.log("Chart ID:", chartId);
            console.log("Original Chart:", originalChart);

            if (originalChart && originalChart.config) {
                if (modalChart) {
                    modalChart.destroy();
                }

                // Clonar la configuración del gráfico de forma segura
                const chartConfig = {
                    type: originalChart.config.type,
                    data: JSON.parse(JSON.stringify(originalChart.config.data)),
                    options: JSON.parse(JSON.stringify(originalChart.config.options))
                };

                // Verificar si es el gráfico de pastel y ajustar el tamaño y posición
                if (chartId === 'detectionRatePercentageChart') {
                    modalChartCanvas.classList.add('small-chart'); // Añadir clase para reducir el tamaño
                    chartConfig.options.plugins.datalabels = {
                        anchor: 'center',
                        align: 'center',
                        formatter: (value) => value.toFixed(2) + '%',
                        color: '#000',
                        font: {
                            weight: 'bold',
                            size: 12
                        }
                    };
                } else if (chartId === 'detectionCountChart') {
                    // Ajustar para el gráfico de número de detecciones
                    chartConfig.options.plugins.datalabels = {
                        anchor: 'center',
                        align: 'center',
                        formatter: (value) => value,
                        color: '#000',
                        font: {
                            weight: 'bold',
                            size: 14 // Aumentar el tamaño de la fuente
                        }
                    };
                    modalChartCanvas.classList.remove('small-chart'); // Asegurar que no tenga la clase de gráfico pequeño
                } else {
                    modalChartCanvas.classList.remove('small-chart'); // Quitar clase si no es gráfico pastel
                    chartConfig.options.plugins.datalabels = {
                        anchor: 'end',
                        align: 'top',
                        formatter: (value) => value,
                        color: '#000',
                        font: {
                            weight: 'bold'
                        }
                    };
                }

                modalChart = new Chart(modalChartCanvas.getContext('2d'), {
                    ...chartConfig,
                    plugins: [ChartDataLabels]
                });

                // Mostrar el modal y bloquear el scroll
                modal.classList.remove('hidden');
                lockBodyScroll();
            } else {
                console.error("No se pudo encontrar la configuración del gráfico o es undefined.");
            }
        });
    });

    // Cerrar el modal haciendo clic fuera del cuadro del gráfico
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            unlockBodyScroll(); // Desbloquear el scroll
            if (modalChart) {
                modalChart.destroy();
            }
        }
    });

    // Cerrar el modal con el botón de cierre
    closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden');
        unlockBodyScroll(); // Desbloquear el scroll
        if (modalChart) {
            modalChart.destroy();
        }
    });
});
