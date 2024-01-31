import Navigator from "./Navigator.js";
export default class Util {
    static findUsername(args) {
        if(!args) return null;
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
}