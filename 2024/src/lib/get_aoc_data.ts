/**
 * @file getAOCdata.ts
 * @description This file contains the function that fetches the input data from the advent of code website
 * @exports getAOCdata - a function that fetches the input data from the advent of code website
 * @param {number} day - the day of the challenge
 * @param {number} year - the year of the challenge
 * @param {string} session - the session cookie for the advent of code website
 * @returns {void} - the input data is fetched and stored in the databse
 * @throws {Error} - if the input data cannot be fetched
 */

export function get_aoc_data(day: number, year: number, session: string): void {
    console.log('Fetching input data from the advent of code website...');
    // fetch the input data from the advent of code website
    fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
        headers: {
            cookie: `session=${session}`
        }
    })
        .then(response => response.text())
        .then(data => {
            // store the input data in the database
            console.log('Input data fetched successfully.');
            // console.log(data);
            console.log('total number of rows:', data.split('\n').length);
        })
        .catch(error => {
            console.error('Error fetching input data:', error);
            throw error;
        });
}