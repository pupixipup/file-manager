import ErrorHandler from "./ErrorHandler.js";
import Navigator from "./Navigator.js";
import fs from "fs"

export default class File {
  static async cat(file) {
    try {
      const name = await Navigator.toAbsolute(file);
      const stream = fs.createReadStream(name)
      stream.on("data", (chunk) => console.log(chunk.toString()))
    } catch {
      ErrorHandler.failed();
    }
  }
}