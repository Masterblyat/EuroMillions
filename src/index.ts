import { calculateFrequencies, generateLeastFrequentDraw, readDrawsFromFile } from './analysis/analyse';
import { deleteOldFile, fetchAndSaveResults, readTransformAndSaveResults } from './data/fetchResults';
import { generateFrequencyChart } from './visualization/chart';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    
    const filePath = path.resolve('./src/data/result.json');

    try {
        // Step 1: Check if the file exists and delete it
        if (fs.existsSync(filePath)) {
            deleteOldFile(filePath);
            console.log('JSON file deleted.');
        } else {
            console.log('No file to delete.');
        }

        // Step 2: Download the new results
        await fetchAndSaveResults();
        console.log('New results downloaded and saved.');

        // Step 3: Read and transform the data
        readTransformAndSaveResults(filePath);
        console.log('Data transformed and saved.');

        // Step 4: Read the draws from the JSON file
        const draws = readDrawsFromFile(filePath);
        console.log('Draws successfully loaded.');

        // Step 5: Generate the least frequent numbers and stars
        const leastFrequentDraw = generateLeastFrequentDraw(draws);
        console.log('Draw with the least frequent numbers and stars:');
        console.log('Numbers:', leastFrequentDraw.leastFrequentNumbers);
        console.log('Stars:', leastFrequentDraw.leastFrequentStars);

        // Step 6: Generate charts for ALL numbers and stars
        const titleNumbers = 'Frequency of Drawn Numbers';
        const outputPathNumbers = path.resolve('./src/data/frequency_chart_numbers.png');

        const titleStars = 'Frequency of Drawn Stars';
        const outputPathStars = path.resolve('./src/data/frequency_chart_stars.png');

        // Calculate the frequencies of all numbers and stars
        const allFrequencies = calculateFrequencies(draws);

        // Generate the chart for numbers
        await generateFrequencyChart(allFrequencies.numbers, titleNumbers, outputPathNumbers);

        // Generate the chart for stars
        await generateFrequencyChart(allFrequencies.stars, titleStars, outputPathStars);

    } catch (error) {
        console.error('An error occurred during execution:', error);
    }
}

main();
