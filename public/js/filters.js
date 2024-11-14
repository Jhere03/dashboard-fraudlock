// Función para actualizar los gráficos con los datos originales
async function updateCharts() {
    try {
        const urls = [
            '/detections',
            '/detection-rate-data',
            '/detection-rate-percentage-data',
            '/detection-count-data'
        ];

        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));

        updateDetectionTimeChart(data[0]);
        updateDetectionRateChart(data[1]);
        updateDetectionRatePercentageChart(data[2]);
        updateDetectionCountChart(data[3]);
    } catch (error) {
        console.error("Error al cargar los datos originales: ", error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('loader');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    // Fecha mínima fija
    const minDate = "2024-10-25";
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0]; 
    
    // Asigna el valor mínimo y máximo a los inputs
    startDateInput.setAttribute('min', minDate);
    startDateInput.setAttribute('max', formattedToday);
    endDateInput.setAttribute('min', minDate);
    endDateInput.setAttribute('max', formattedToday);

    document.getElementById('filterButton').addEventListener('click', async function () {
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;

        if (startDate && endDate) {
            // Verificar si la fecha fin es menor que la fecha inicio
            if (new Date(endDate) < new Date(startDate)) {
                alert('La fecha fin debe ser mayor o igual a la fecha inicio.');
                return; // Salir de la función para evitar continuar con el procesamiento
            }

            if (new Date(startDate) >= new Date(minDate) && new Date(endDate) <= new Date(formattedToday)) {
                showLoader();
                await updateChartsWithFilter(startDate, endDate);
                hideLoader();
            } else {
                alert('Las fechas seleccionadas deben estar entre el 25 de octubre de 2024 y la fecha actual.');
            }
        } else {
            alert('Por favor ingrese ambas fechas.');
        }
    });

    document.getElementById('clearButton').addEventListener('click', async function () {
        startDateInput.value = '';
        endDateInput.value = '';
        showLoader();
        await updateCharts(); // Llama a la función global updateCharts
        hideLoader();
    });

    // Función para mostrar el loader y bloquear el scroll
    function showLoader() {
        loader.classList.remove('hidden');
        lockBodyScroll(); // Bloquear el scroll
    }

    // Función para ocultar el loader y desbloquear el scroll
    function hideLoader() {
        loader.classList.add('hidden');
        unlockBodyScroll(); // Desbloquear el scroll
    }

    // Bloquear el scroll
    function lockBodyScroll() {
        document.body.style.overflow = 'hidden';
    }

    // Desbloquear el scroll
    function unlockBodyScroll() {
        document.body.style.overflow = '';
    }

    // Función para actualizar los gráficos con filtro de fechas
    async function updateChartsWithFilter(startDate, endDate) {
        try {
            const urls = [
                `/detections?start=${startDate}&end=${endDate}`,
                `/detection-rate-data?start=${startDate}&end=${endDate}`,
                `/detection-rate-percentage-data?start=${startDate}&end=${endDate}`,
                `/detection-count-data?start=${startDate}&end=${endDate}`
            ];

            const responses = await Promise.all(urls.map(url => fetch(url)));
            const data = await Promise.all(responses.map(res => res.json()));

            // Llamadas a funciones de actualización de gráficos
            updateDetectionTimeChart(data[0]);
            updateDetectionRateChart(data[1]);
            updateDetectionRatePercentageChart(data[2]);
            updateDetectionCountChart(data[3]);
        } catch (error) {
            console.error("Error al cargar los datos filtrados: ", error);
        }
    }
});


