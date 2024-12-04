type Grid = string[][];
type Direction = [number, number];
type Pattern = string[];

// Main
async function main(): Promise<void> {
    const input = await Deno.readTextFile('2024/input/04.txt');
    console.log(input)
    console.log('Part One:', partOne(input));
    console.log('Part Two:', partTwo(input));
}

main().catch((error) => console.error(error));


/**
 * @abstract - Create a 2D array representing the grid from the input data
 * @param input - the input data
 * @returns - a 2D array representing the grid
 */
function createGrid(input: string): Grid {
    return input
        .trim()
        .split('\n')
        .map((line) => line.split(''));
}

/**
 * Checks if the given row and column are within the bounds of the grid
 * @param row - the row index
 * @param col - the column index
 * @param grid - the grid to check against
 * @returns true if the row and column are within bounds, false otherwise
 */
function isInBounds(row: number, col: number, grid: Grid): boolean {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}


/**
 * Checks if a given pattern exists in the grid starting from a specific position and moving in a specific direction
 * @param startRow - the starting row index
 * @param startCol - the starting column index
 * @param direction - the direction to move in the grid
 * @param pattern - the pattern to check for
 * @param grid - the grid to check against
 * @returns true if the pattern exists in the grid, false otherwise
 */
function checkPattern(
    startRow: number,
    startCol: number,
    direction: Direction,
    pattern: Pattern,
    grid: Grid
): boolean {
    for (let i = 0; i < pattern.length; i++) {
        const newRow = startRow + direction[0] * i;
        const newCol = startCol + direction[1] * i;

        if (
            !isInBounds(newRow, newCol, grid) ||
            grid[newRow][newCol] !== pattern[i]
        ) {
            return false;
        }
    }
    return true;
}



// Part One
export function partOne(input: string): number {
    const grid = createGrid(input);
    let count = 0;
    const word = 'XMAS';

    // All possible directions: right, down-right, down, down-left, left, up-left, up, up-right
    const directions: Direction[] = [
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1],
    ];

    // Check each starting position
    for (let row = 0; row < grid.length; row++) { //for each row in the grid
        for (let col = 0; col < grid[0].length; col++) { //for each column in the grid
            // Try each direction from this position
            for (const direction of directions) { 
                if (checkPattern(row, col, direction, word.split(''), grid)) { //
                    count++;
                }
            }
        }
    }

    return count;
}

// Part Two
export function partTwo(input: string): number {
    const grid = createGrid(input);
    let count = 0;

    // All possible X patterns [diagonal1, diagonal2]
    const xPatterns: [Pattern, Pattern][] = [
        [
            ['M', 'A', 'S'],
            ['M', 'A', 'S'],
        ],
        [
            ['M', 'A', 'S'],
            ['S', 'A', 'M'],
        ],
        [
            ['S', 'A', 'M'],
            ['M', 'A', 'S'],
        ],
        [
            ['S', 'A', 'M'],
            ['S', 'A', 'M'],
        ],
    ];

    // Check each center position for X pattern
    for (let row = 1; row < grid.length - 1; row++) {
        for (let col = 1; col < grid[0].length - 1; col++) {
            for (const [pattern1, pattern2] of xPatterns) {
                const isValid =
                    checkPattern(row - 1, col - 1, [1, 1], pattern1, grid) && // top-left to bottom-right
                    checkPattern(row - 1, col + 1, [1, -1], pattern2, grid); // top-right to bottom-left

                if (isValid) count++;
            }
        }
    }

    return count;
}

import { assertEquals } from '@std/assert';

Deno.test('Part One', () => {
    const result = Deno.readTextFileSync('2024/input/04sample.txt');
    assertEquals(partOne(result), 18); // Replace 18 with the expected result for Part One
});

Deno.test('Part Two', () => {
    const result = Deno.readTextFileSync('2024/input/04sample.txt');
    assertEquals(partTwo(result), 9); // Replace 9 with the expected result for Part Two
});