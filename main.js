const readline = require("readline")
const Util = require("./Util")
const Navigator = require("./Navigator")

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
    const to = line.split(" ")[1];
    console.log(to)
    await Navigator.cd(to);
  }
  console.log(process.cwd())
  Util.logDirectory()
})

rl.once("close", () => {
  // end of input
})


