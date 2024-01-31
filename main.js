import readline from "readline"
import Util from "./Util.js"
import Navigator from "./Navigator.js"

const args = process.argv.slice(2)

const username = Util.findUsername(args)
Util.greet(username)
Util.logDirectory()


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
})

rl.on("line", async (line) => {
  if (line === ".exit") {
    process.exit()
  }
  if (line === "up") {
    console.log("go up")
    Navigator.up()
  } else if (line.startsWith("cd ")) {
    const to = line.split(" ").slice(1).join(" ");
    await Navigator.cd(to);
  } else if (line === "ls") {
    Navigator.ls()
  }

  Util.logDirectory()
})

rl.once("close", () => {
  // end of input
})


