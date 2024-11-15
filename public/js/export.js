const { jsPDF } = window.jspdf;

document.addEventListener("DOMContentLoaded", () => {
    const exportButton = document.getElementById("exportButton");

    // IDs de los gráficos
    const chartIds = ["detectionTimeChart", "detectionRateChart", "detectionRatePercentageChart", "detectionCountChart"];
    let chartsLoaded = 0;

    // Función para comprobar si todos los gráficos están listos
    const checkChartsLoaded = () => {
        chartsLoaded += 1;
        console.log(`Gráficos cargados: ${chartsLoaded}/${chartIds.length}`);
        if (chartsLoaded === chartIds.length) {
            exportButton.classList.remove("hidden");
        }
    };

    // Detectar cuando los gráficos están creados manualmente
    chartIds.forEach((id) => {
        const chartElement = document.getElementById(id);
        if (chartElement) {
            // Usar un temporizador para comprobar la existencia del gráfico en el DOM
            const interval = setInterval(() => {
                if (window[`${id}`] && window[`${id}`].config) {
                    clearInterval(interval); // Detener el temporizador
                    console.log(`Gráfico ${id} detectado como cargado.`);
                    checkChartsLoaded(); // Incrementar el contador
                }
            }, 100); // Comprobar cada 100ms
        } else {
            console.warn(`Gráfico con ID "${id}" no encontrado.`);
        }
    });

    exportButton.addEventListener("click", async () => {
        try {
            // Crear un nuevo documento PDF
            const pdf = new jsPDF("p", "mm", "a4");
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            // Obtener la fecha actual
            const today = new Date();
            const formattedDate = `${today.getDate()}-${String(today.getMonth() + 1).padStart(2, "0")}-${today.getFullYear()}`;

            // Agregar el encabezado en todas las páginas
            const addHeader = (page) => {
                pdf.setFont("helvetica", "italic", "bold");
                pdf.setFontSize(10);
                pdf.setTextColor(0, 170, 228); // Color azul
                pdf.text("FRAUDLOCK – Cuidamos tu bolsillo digital", pageWidth / 2, 15, { align: "center" });

                // Agregar logo
                const logo = new Image();
                logo.src = "/Escudo.png"; // Ruta al logo
                pdf.addImage(logo, "PNG", pageWidth - 30, 5, 20, 20); // Ubicación y tamaño del logo
            };

            pdf.setFontSize(10);
            pdf.setFont("helvetica", "bold");
            pdf.text(`REPORTE GENERADO EL ${formattedDate}`, pageWidth / 2, 25, { align: "center" });

            // Subrayar el texto
            const textWidth = pdf.getTextWidth(`REPORTE GENERADO EL ${formattedDate}`);
            pdf.line((pageWidth / 2) - (textWidth / 2), 26, (pageWidth / 2) + (textWidth / 2), 26); // Línea debajo del texto

            // Agregar encabezado a la primera página
            addHeader(1);

            // Obtener los gráficos
            const charts = [
                { id: "detectionTimeChart", title: "Tiempo promedio de detecciones identificando las fechas:" },
                { id: "detectionRateChart", title: "Sitios evaluados y detecciones encontradas por día (gráfico comparativo):" },
                { id: "detectionRatePercentageChart", title: "Tasa de detección presentada por fechas de aplicación:" },
                { id: "detectionCountChart", title: "Detecciones por día, durante todo el proceso en producción:" },
            ];

            let yPosition = 35;

            for (const [index, chart] of charts.entries()) {
                // Título de la sección
                pdf.setFont("helvetica", "bold");
                pdf.setFontSize(12);
                pdf.setTextColor(0, 0, 0); // Color negro para los títulos
                pdf.text(chart.title, 15, yPosition);
                yPosition += 10;

                // Renderizar gráfico como imagen
                const canvas = await html2canvas(document.getElementById(chart.id));
                const imgData = canvas.toDataURL("image/png");

                // Ajustar la imagen al tamaño del PDF
                const imgWidth = pageWidth - 30; // Margen de 15 en cada lado
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                // Agregar imagen al PDF
                pdf.addImage(imgData, "PNG", 15, yPosition, imgWidth, imgHeight);
                yPosition += imgHeight + 10;

                // Si el espacio no es suficiente para otro gráfico, agregar nueva página
                if (yPosition + imgHeight > pageHeight - 20 && index < charts.length - 1) {
                    pdf.addPage();
                    yPosition = 35; // Reiniciar posición
                    addHeader(pdf.internal.getNumberOfPages()); // Agregar encabezado en la nueva página
                }
            }

            // Pie de página con número de página
            const totalPages = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(10);
                pdf.text(`Página ${i} | ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: "center" });
            }

            // Descargar el archivo PDF
            pdf.save(`reporte-fraudlock-${formattedDate}.pdf`);
        } catch (error) {
            console.error("Error al exportar PDF:", error);
            alert("Hubo un problema al generar el PDF. Inténtalo de nuevo.");
        }
    });
});
