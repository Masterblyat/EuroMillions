import fs from 'fs';
import { Draw } from '../types';

export function calculateFrequencies(draws: Draw[]): { numbers: Record<number, number>, stars: Record<number, number> } {
    const numberFrequency: Record<number, number> = {};
    const starFrequency: Record<number, number> = {};

    draws.forEach(draw => {
        draw.numbers?.forEach(number => {
            numberFrequency[number] = (numberFrequency[number] || 0) + 1;
        });

        draw.stars?.forEach(star => {
            starFrequency[star] = (starFrequency[star] || 0) + 1;
        });
    });

    return { numbers: numberFrequency, stars: starFrequency };
}


export function generateLeastFrequentDraw(
    draws: Draw[],
    numberCount: number = 5,
    starCount: number = 2
): { leastFrequentNumbers: number[], leastFrequentStars: number[] } {
    const { numbers, stars } = calculateFrequencies(draws);

    const sortedNumbers = Object.entries(numbers)
        .sort((a, b) => a[1] - b[1])
        .slice(0, numberCount)
        .map(entry => Number(entry[0]));

    const sortedStars = Object.entries(stars)
        .sort((a, b) => a[1] - b[1])
        .slice(0, starCount)
        .map(entry => Number(entry[0]));

    return {
        leastFrequentNumbers: sortedNumbers,
        leastFrequentStars: sortedStars,
    };
}

export function generateProbableDraw(draws: Draw[]): { leastFrequentNumbers: number[], leastFrequentStars: number[] } {
    const { numbers, stars } = calculateFrequencies(draws);

    // Sort numbers by ascending frequency (least frequent first)
    const sortedNumbers = Object.entries(numbers)
        .sort((a, b) => a[1] - b[1]) // Sort by increasing frequency
        .slice(0, 5) // Select the 5 least frequent numbers
        .map(entry => Number(entry[0])); // Convert keys to numbers

    // Sort stars by ascending frequency
    const sortedStars = Object.entries(stars)
        .sort((a, b) => a[1] - b[1]) // Sort by increasing frequency
        .slice(0, 2) // Select the 2 least frequent stars
        .map(entry => Number(entry[0])); // Convert keys to numbers

    return {
        leastFrequentNumbers: sortedNumbers,
        leastFrequentStars: sortedStars,
    };
}

export function readDrawsFromFile(filePath: string): Draw[] {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const draws: Draw[] = JSON.parse(rawData);
    return draws;
}