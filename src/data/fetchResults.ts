import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { Draw } from '../types';

export function deleteOldFile(filePath: string) {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`The old file ${filePath} has been deleted.`);
        }
    } catch (error) {
        console.error(`Could not delete this file : ${filePath} :`, error);
    }
}

export async function fetchAndSaveResults(filePath: string) {
    try {
        const response = await axios.get('https://euromillions.api.pedromealha.dev/draws', {
            headers: { 'accept': 'application/json' }
        });
        const draws = response.data;

        fs.writeFileSync(filePath, JSON.stringify(draws, null, 2));
        console.log(`Results have been stored in ${filePath}`);
    } catch (error) {
        console.error('Error while retrieving or saving the data:', error);
    }
}

export function readTransformAndSaveResults(filePath: string): void {
    try {
        
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const parsedData = JSON.parse(rawData);

        // Transform the data to conform to the Draw interface
        const transformedData: Draw[] = parsedData.map((draw: any) => ({
            date: draw.date || '',
            draw_id: Number(draw.draw_id || 0),
            has_winner: Boolean(draw.has_winner),
            id: Number(draw.id || 0),
            numbers: (draw.numbers || []).map((num: any) => Number(num)), // Convert to an array of numbers
            prize: Number(draw.prize || 0),
            stars: (draw.stars || []).map((star: any) => Number(star)), // Convert to an array of numbers
        }));

        // Rewrite the transformed data into the JSON file
        fs.writeFileSync(filePath, JSON.stringify(transformedData, null, 2), 'utf-8');

        console.log(`The transformed data has been saved to ${filePath}`);
    } catch (error) {
        console.error('Error while reading or transforming the results:', error);
    }
}



