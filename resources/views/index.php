<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Dashboard - FRAUDLOCK</title>
            <link rel="icon" href="/Escudo.png" type="image/png">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <link rel="stylesheet" href="/css/style.css">
        </head>

            <body class="bg-gray-50 text-gray-800 flex flex-col items-center justify-center min-h-screen space-y-8">

            <!-- Loader -->
            <div id="loader" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center hidden">
                <img src="/Escudo.png" alt="Cargando" class="spinner w-24 h-24">
            </div>
            
            <div class="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg mb-6">
                <h2 class="text-xl font-bold mb-4 text-center">Filtrar por fecha</h2>
                <form id="filterForm" class="flex justify-center items-center space-x-4">
                    <!-- Min es estático y max se asigna dinámicamente con JavaScript -->
                    <div class="flex flex-col">
                        <label for="startDate" class="mb-1">Fecha inicio</label>
                        <input type="date" id="startDate" name="startDate" class="border p-2 rounded" min="2024-10-25" placeholder="Fecha inicio">
                    </div>

                    <div class="flex flex-col">
                        <label for="endDate" class="mb-1">Fecha fin</label>
                        <input type="date" id="endDate" name="endDate" class="border p-2 rounded" min="2024-10-25" placeholder="Fecha fin">
                    </div>

                    <button type="button" id="filterButton" class="bg-blue-500 text-white p-2 rounded h-10 flex items-center">FILTRAR</button>
                    <button type="button" id="clearButton" class="bg-gray-500 text-white p-2 rounded h-10 flex items-center justify-center" style="width: 80px;">
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                    </button>

                </form>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-11/12 mx-auto p-6 bg-white shadow-lg rounded-lg mb-6">
                <!-- Gráfico de Tiempo de Detección -->
                <div class="p-4 bg-white shadow rounded-lg relative">
                    <h1 class="text-2xl font-bold mb-4 text-center">Tiempo de Detección</h1>
                    <button data-chart-id="detectionTimeChart" title="Vista principal" class="open-modal-button absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800 shadow hover:scale-110 transform transition-all duration-200 px-2 py-0.8">
                        <i class="fa fa-eye" aria-hidden="true"></i>
                    </button>
                    <h2 class="text-xl font-semibold mb-4">Tiempo promedio de detecciones</h2>
                    <canvas id="detectionTimeChart" width="400" height="200"></canvas>
                </div>

                <!-- Gráfico de Tasa de Detección -->
                <div class="p-4 bg-white shadow rounded-lg relative">
                    <h1 class="text-2xl font-bold mb-4 text-center">Valores de Tasa de detección</h1>
                    <button data-chart-id="detectionRateChart" title="Vista principal" class="open-modal-button absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800 shadow hover:scale-110 transform transition-all duration-200 px-2 py-0.8">
                        <i class="fa fa-eye" aria-hidden="true"></i>
                    </button>
                    <h2 class="text-xl font-semibold mb-4">Sitios evaluados / Detecciones</h2>
                    <canvas id="detectionRateChart" width="400" height="200"></canvas>
                </div>

                <!-- Gráfico de Tasa de Detección en Porcentaje -->
                <div class="p-4 bg-white shadow rounded-lg relative">
                    <h1 class="text-2xl font-bold mb-4 text-center">Tasa de Detección</h1>
                    <button data-chart-id="detectionRatePercentageChart" title="Vista principal" class="open-modal-button absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800 shadow hover:scale-110 transform transition-all duration-200 px-2 py-0.8">
                        <i class="fa fa-eye" aria-hidden="true"></i>
                    </button>
                    <h2 class="text-xl font-semibold mb-4">Tasa de Detección</h2>
                    <canvas id="detectionRatePercentageChart" style="max-height: 400px; width: 100%;"></canvas>
                </div>

                <!-- Gráfico de Número de Detecciones -->
                <div class="p-4 bg-white shadow rounded-lg relative">
                    <h1 class="text-2xl font-bold mb-4 text-center">Número de Detecciones</h1>
                    <button data-chart-id="detectionCountChart" title="Vista principal" class="open-modal-button absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800 shadow hover:scale-110 transform transition-all duration-200 px-2 py-0.8">
                        <i class="fa fa-eye" aria-hidden="true"></i>
                    </button>
                    <h2 class="text-xl font-semibold mb-4">Detecciones a lo largo del tiempo</h2>
                    <canvas id="detectionCountChart" width="400" height="200"></canvas>
                </div>
            </div>

            <div id="chartModal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center hidden">
                <div class="bg-white p-4 rounded-lg shadow-lg relative w-11/12 max-w-5xl">
                    <button id="closeModalButton" class="absolute top-2 right-2 text-gray-600 hover:text-gray-800 px-3 py-1">
                        <i class="fa fa-eye-slash" aria-hidden="true"></i>
                    </button>
                    <div class="small-chart-container">
                        <canvas id="modalChart" class="small-chart" width="800" height="400"></canvas>
                    </div>
                </div>
            </div>

                <!-- Script para Chart.js -->
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2"></script>
                <!-- Scripts personalizados -->
                <script src="/js/chart.js"></script>
                <script src="/js/filters.js"></script>
                <script src="/js/functions.js"></script>

            </body>
    </html>
