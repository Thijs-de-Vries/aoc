import { parseInput } from '../lib/input_parser.ts';


// only run the main function if this script is executed directly, not if it is imported as a module
if (import.meta.main) {
    main();
}


/**
 * @abstract Parses the input data and calculates the result for both parts of the challenge.
 * @returns void
 */
async function main(): Promise<void> {
    const text = await parseInput('./2024/input/01.txt');
    const data = parseDay1Data(text.join('\n'));
    const resultPart1 = calculatePart1(data);
    console.log('Part 1: ' + resultPart1);
    const resultPart2 = calculatePart2(data);
    console.log('Part 2: ' + resultPart2);
}

/**
 * @abstract The data structure for the parsed input data.
 * @property listOne  The first list of numbers
 * @property listTwo  The second list of numbers
 * */
interface Day1Data {
    listOne: number[];
    listTwo: number[];
}

/**
 * 
 * @abstract Parses the input data into a usable format. specific for this challenge.
 * @param data  The input data
 * @returns  The parsed data
 */
function parseDay1Data(data: string): Day1Data {
    const lists = data.split('\n').map((line) => line.split('   ').map(Number));
    const listOne = lists.map((list) => list[0]).sort((a, b) => a - b);
    const listTwo = lists.map((list) => list[1]).sort((a, b) => a - b);

    return {
        listOne,
        listTwo,
    };
}


/**
 * @abstract Calculates the result for part 1 of the challenge.
 * @param data  The parsed data
 * @returns  The result for part 1
 */
function calculatePart1(data: Day1Data): number {
    const differences = data.listOne.map((itemOne, index) => {
        const itemTwo = data.listTwo[index];
        return Math.abs(itemOne - itemTwo);
    });

    return differences.reduce((acc, curr) => acc + curr, 0);
}


/**
 * @abstract Calculates the result for part 2 of the challenge.
 * @param data  The parsed data
 * @returns  The result for part 2
 */
function calculatePart2(data: Day1Data): number {
    let total = 0;

    for (const number of data.listOne) {
        const index = binarySearch(data.listTwo, number);
        if (index < 0) continue;

        total += countOccurrences(data.listTwo, index) * number;
    }

    return total;
}


/**
 * @abstract Counts the number of occurrences of the number at the given index in the list.
 * @param list  The list of numbers
 * @param index  The index of the number to count occurrences for
 * @returns  The number of occurrences of the number at the given index
 */
function countOccurrences(list: number[], index: number): number {
    const value = list[index];
    let count = 1;

    for (let i = index - 1; i >= 0 && list[i] === value; i--) {
        count++;
    }

    for (let i = index + 1; i < list.length && list[i] === value; i++) {
        count++;
    }

    return count;
}

/**
 * @abstract Performs a binary search on the list to find the target number.
 * @param list  The list of numbers
 * @param target  The target number to search for
 * @returns  The index of the target number in the list, or -1 if it is not found
 */
function binarySearch(list: number[], target: number): number {
    let left = 0;
    let right = list.length - 1;

    while (left <= right) {
        const midIndex = Math.floor(left + (right - left) / 2);
        const midValue = list[midIndex];

        if (midValue === target) return midIndex;
        if (midValue > target) right = midIndex - 1;
        else left = midIndex + 1;
    }

    return -1;
}