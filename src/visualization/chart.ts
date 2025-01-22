import * as fs from 'fs';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

export async function generateFrequencyChart(
    frequencies: Record<number, number>,
    title: string,
    outputPath: string
) {
    const width = 800;
    const height = 600;
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

    const labels = Object.keys(frequencies).map(Number);
    const data = Object.values(frequencies); 

    const configuration = {
        type: 'bar' as const,
        data: {
            labels: labels,
            datasets: [
                {
                    label: title,
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: title,
                },
            },
        },
    };

    const image = await chartJSNodeCanvas.renderToBuffer(configuration);
    fs.writeFileSync(outputPath, image);
    console.log(`Graphique généré : ${outputPath}`);
}

