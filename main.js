import readline from "readline"
import Util from "./Util.js"
import Navigator from "./Navigator.js"
import ErrorHandler from "./ErrorHandler.js"
import File from "./File.js"
import OS from "./sys.js"
import Hash from "./Hash.js"
import Compress from "./Compress.js"

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
  try {
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
    const str = Util.customSplit(toAdd);
    File.rn(str[0], str[1]);
  } else if (line.startsWith("cp ")) {
    const toAdd = line.split(" ").slice(1).join(" ");
    const str = Util.customSplit(toAdd);
    File.cp(str[0], str[1]);
  } else if (line.startsWith("mv ")) {
    const toAdd = line.split(" ").slice(1).join(" ");
    const str = Util.customSplit(toAdd);
    File.mv(str[0], str[1]);
  } else if (line.startsWith("rm ")) {
    const toAdd = line.split(" ").slice(1).join(" ");
    File.rm(toAdd)
  } else if (line.startsWith("os ")) {
    const args = line.split("--");
    args.shift()
    args.forEach((arg) => {
    const methods = {
      EOL: OS.EOL,
      cpus: OS.cpus,
      homedir: OS.homedir,
      architecture: OS.architecture,
      username: OS.username
    }
    methods[arg.trim()]();
    });
  } else if(line.startsWith("hash ")) {
    const toRead = line.split(" ").slice(1).join(" ");
    Hash.calc(toRead)
  } else if (line.startsWith("compress ")) {
      const toAdd = line.split(" ").slice(1).join(" ");
      const str = Util.customSplit(toAdd);
      Compress.compress(str[0], str[1]);
  } else if (line.startsWith("decompress ")) {
    const toAdd = line.split(" ").slice(1).join(" ");
    const str = Util.customSplit(toAdd);
    Compress.decompress(str[0], str[1]);
} else {
    ErrorHandler.invInput();
  }
  Util.logDirectory()
} catch (err) {
  ErrorHandler.failed()
}
})

rl.once("close", () => {
  // end of input
})


