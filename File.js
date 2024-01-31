import ErrorHandler from "./ErrorHandler.js";
import Navigator from "./Navigator.js";
import fs from "fs"
import fsp from "fs/promises"

export default class File {

  fileExists(filePath) {
    return new Promise((resolve, reject) => {
      fs.access(filePath, fs.constants.F_OK)
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          if (err.code === 'ENOENT') {
            resolve(false);
          } else {
            reject(err);
          }
        });
    });
  }

  static async cat(file) {
    try {
      const name = await Navigator.toAbsolute(file);
      const stream = fs.createReadStream(name)
      stream.on("data", (chunk) => console.log(chunk.toString()))
    } catch {
      ErrorHandler.failed();
    }
  }
  static async add(file) {
    try {
      const name = await Navigator.toAbsolute(file);
      const exists = await File.fileExists(name);
      if (exists) {
        throw new Error("file already exists");
      }
      fs.appendFile(name, "");
    } catch (err) {
      console.log(err)
      ErrorHandler.failed();
    }
  }
}