import readline from "readline"
import Util from "./Util.js"
import Navigator from "./Navigator.js"
import File from "./File.js"
import { customSplit } from "./test.js"

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
  } else if (line.startsWith("cat ")) {
    const toRead = line.split(" ").slice(1).join(" ");
    File.cat(toRead)
  } else if (line.startsWith("add ")) {
    const toAdd = line.split(" ").slice(1).join(" ");
    File.add(toAdd)
  } else if (line.startsWith("rn ")) {
    const toAdd = line.split(" ").slice(1).join(" ");
    const str = customSplit(toAdd);
    File.rn(str[0], str[1]);
  } else if (line.startsWith("cp ")) {
    const toAdd = line.split(" ").slice(1).join(" ");
    const str = customSplit(toAdd);
    File.cp(str[0], str[1]);
  }
  Util.logDirectory()
})

rl.once("close", () => {
  // end of input
})


