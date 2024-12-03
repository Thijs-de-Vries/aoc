import { parseInput } from "../lib/input_parser.ts";

const input = await parseInput('2024/input/03.txt');

if(import.meta.main){main()};

function main(){
    console.log('part 1: '+part1(input))
    console.log('part 2: '+part2(input))
}

// Part 1
function part1(input: string[]) :number{
    let result = 0
    const matches = find_matches(input)
    matches.forEach(match => {
        const [a, b] = match.slice(4, -1).split(',').map(Number);
        result += a * b;
    });
    return result
}

// Part 2
function part2(input: string[]) :number{
    let result : number = 0;
    const matches = find_matches_and_other_instructions(input)
    let do_mul = true;
    matches.forEach(match => {
        if(match === "do()"){
            do_mul = true;
        } else if(match === "don't()"){
            do_mul = false;
        } else if(do_mul){
            const [a, b] = match.slice(4, -1).split(',').map(Number);
            result += a * b;
        }
    });

    return result
}

function find_matches (input: string[]) :string[] {
    let matches: string[] = []
    matches = input.join('\n').match(/mul\(\d+,\d+\)/g) || [];
    return matches
}

function find_matches_and_other_instructions (input: string[]) :string[] {
    let matches: string[] = []
    matches = input.join('\n').match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g) || [];
    return matches
}