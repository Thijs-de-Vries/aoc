import { parseInput } from "../lib/input_parser.ts";

// Entry point when the script is run directly
if (import.meta.main) {
    main();
}

/**
 * Main function to orchestrate the puzzle solution.
 */
async function main() {
    const data = await parseInput('./2024/input/02.txt');
    const resultPart1 = part1(data);
    console.log('Part 1: ' + resultPart1);
    const resultPart2 = part2(data);
    console.log('Part 2: ' + resultPart2);
}

/**
 * Solves part 1 of the puzzle.
 * @param {string[]} data - The input data.
 * @return {number} The result for part 1.
 */
function part1(data: string[]): number {
    const reports = parseReports(data);
    const safeReports = reports.filter(isReportSafe);
    return safeReports.length;
}

/**
 * Solves part 2 of the puzzle.
 * @param {string[]} data - The input data.
 * @return {number} The result for part 2.
 */
function part2(data: string[]): number {
    const reports = parseReports(data);
    const safeReports = reports.filter((r) =>
        isReportSafe(r) || isDampenedReportSafe(r)
    );
    return safeReports.length;
}

/**
 * Parses the input data into reports.
 * @param {string[]} input - The input data.
 * @return {number[][]} The parsed reports.
 */
function parseReports(input: string[]): number[][] {
    return input.map((l) => l.split(" ").map(Number));
}

/**
 * Determines if a report is safe.
 * @param {number[]} report - The report to check.
 * @return {boolean} True if the report is safe, false otherwise.
 */
function isReportSafe(report: number[]): boolean {
    if (report.length < 2) return true;
    const direction = report[0] - report[1] > 0 ? -1 : 1;
    for (let i = 1; i < report.length; i += 1) {
        const diff = (report[i - 1] - report[i]) * -direction;
        if (diff < 1 || diff > 3) return false;
    }
    return true;
}

/**
 * Determines if a dampened report is safe.
 * @param {number[]} report - The report to check.
 * @return {boolean} True if the dampened report is safe, false otherwise.
 */
function isDampenedReportSafe(report: number[]): boolean {
    return report.map((_, i) => report.toSpliced(i, 1)).some(isReportSafe);
}