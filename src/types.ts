export interface Draw {
    date: string; // Date in ISO format or another format
    draw_id: number; // Unique identifier of the draw
    has_winner: boolean; // Indicates whether a winner was found
    id: number; // Internal ID of the draw
    numbers: number[]; // Drawn numbers (converted to numbers)
    prize: number; // Prize amount
    stars: number[]; // Drawn stars (converted to numbers)
}
