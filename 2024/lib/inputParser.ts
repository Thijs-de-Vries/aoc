  /** Reads the contents of a puzzle input file and returns it as a string
   * @param filename The name of the file to read from
   * @returns The contents of the file as a string
   * @throws If the file cannot be read or the file does not exist
   * @example readInput("input.txt") 
   */
export async function readInput(filename: string): Promise<string | undefined> {
    let input;
    try {
        input = await Deno.readTextFile(filename);
    } catch (e) {
        console.error(e);
    }
    return input;
}
