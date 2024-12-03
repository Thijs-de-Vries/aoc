/** 
 * @fileoverview This is the main file for the 2024 advent of code challenge
 * Main script for this years advent of code
 *  Structure:
 * - ask user wich day to sove
 * - check if the day is already solved
 * - if solved, print the result stored in a sqlite db
 * - if not solved, check if the:
 *      - actual input
 *      - sampel input
 *      - sample answer
 *   are available
 * - if not, ask user to provide the input and sample input and answer
 *  then exit
 * - print the result
 * - ask if the user wants to solve another day
 * - if yes, repeat
 * - if no, exit 
 * 
 * 
 * rules: 
 * using the google typescript style guide https://google.github.io/styleguide/tsguide.html
*/
// header
console.log(`
                                                                                                              
  __  __                  ____   _____                                             
 |  \\/  |           /\\   / __ \\ / ____|                                            
 | \\  / |_   _     /  \\ | |  | | |       _ __  _ __ ___   __ _ _ __ __ _ _ __ ___  
 | |\\/| | | | |   / /\\ \\| |  | | |      | '_ \\| '__/ _ \\ / _\` | '__/ _\` | '_ \` _ \\ 
 | |  | | |_| |  / ____ \\ |__| | |____  | |_) | | | (_) | (_| | | | (_| | | | | | |
 |_|  |_|\\__, | /_/    \\_\\____/ \\_____| | .__/|_|  \\___/ \\__, |_|  \\__,_|_| |_| |_|
          __/ |                         | |               __/ |                    
         |___/                          |_|              |___/    
`);

import { get_aoc_data } from "./src/lib/get_aoc_data.ts";
import 'https://deno.land/x/dotenv@v3.0.0/load.ts';



function AOCdatasequence() {
    //TODO: get the day and year from the command line arguments
    let day = 1;
    let year = 2024;

    const missingFields = [];
    if (!day) missingFields.push('day');
    if (!year) missingFields.push('year');
    if (!Deno.env.get('AOC_SESSION_KEY')) missingFields.push('AOC_SESSION_KEY');
    
    if (missingFields.length > 0) {
        console.error(`Please provide the following fields: ${missingFields.join(', ')}`);
        Deno.exit(1);
    } else {
        get_aoc_data(day, year, Deno.env.get('AOC_SESSION_KEY') || '');
    }
}


// check if all data to this day has been collected
// if not, collect the data
// if yes, solve the problem

