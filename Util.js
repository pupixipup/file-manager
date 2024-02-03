import Navigator from "./Navigator.js";
export default class Util {
    static findUsername(args) {
        if (!args) return null;
        const userArg = args.find((arg) => arg.includes("--username="))
        if (!userArg) return null;
        return userArg.split("=")[1]
    }
    static greet(username) {
        let name = username || "User"
        console.log(`Welcome to the File Manager, ${name}!`)
        console.log('Waiting for input...')
    }

    static logDirectory() {
        console.log(`You are currently in "${Navigator.path}"`)
    }

    static isQuote(str) {
        return str === `"` || str === `'` || str === "`"
    }

    static customSplit(inputString) {
        const regex = /\s(?=(?:(?:[^"]*"){2})*[^"]*$)/;
        const resultArray = inputString.split(regex);
        return resultArray.map(this.removePaddingQuotes);
    }

    static removePaddingQuotes(str) {
        if (str.startsWith('"') && str.endsWith('"') || str.startsWith("'") && str.endsWith("'")) {
             return str.slice(1, -1);
        }
            return str;
    }
}
