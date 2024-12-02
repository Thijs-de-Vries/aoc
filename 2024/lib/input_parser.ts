/**
 *  @fileoverview This file contains the input parser for the advent of code challenges
 *  @exports parseInput - a function that reads a file and returns an array of strings containing the lines of the file
 *  @param {string} filePath - the path to the file to be parsed
 *  @returns {string[]} - an array of strings containing the lines of the file
 *  @throws {Error} - if the file cannot be read
 *  @example parseInput('fileName.txt')  // returns ['line1', 'line2', ...]
 */

export async function parseInput(filePath: string): Promise<string[]> {
    try {
        const data = await Deno.readTextFile(filePath);
        return data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    } catch (error) {
        console.error(`Error reading file from path ${filePath}:`, error);
        throw error;
    }
}