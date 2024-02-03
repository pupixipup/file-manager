import ErrorHandler from "./ErrorHandler.js";
import Navigator from "./Navigator.js";
import fs from "fs"

export default class File {

  static fileExists(filePath) {
    return new Promise((resolve, reject) => {
      fs.promises.access(filePath, fs.constants.F_OK)
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
      const name = await Navigator.toAbsolute(file, true);
      const exists = await File.fileExists(name);
      if (exists) {
        throw new Error("file already exists");
      }
      fs.promises.appendFile(name, "");
    } catch (err) {
      ErrorHandler.failed();
    }
  }

  static async rn(old, newn) {
    try {
      const oldName = await Navigator.toAbsolute(old, true);
      const newName = await Navigator.toAbsolute(newn, true);
      const oldExists = await File.fileExists(oldName);
      const newExists = await File.fileExists(newName);
      if (!oldExists || newExists) {
        throw new Error("file already exists");
      }
      fs.promises.rename(oldName, newName);
    } catch {
      ErrorHandler.failed();
    }
  }

  static async cp(old, newn) {
    try {
      const oldName = await Navigator.toAbsolute(old, true);
      const newName = await Navigator.toAbsolute(newn, true);
      const oldExists = await File.fileExists(oldName);
      const newExists = await File.fileExists(newName);
      if (!oldExists || newExists) {
        throw new Error("file already exists");
      }
      fs.promises.cp(oldName, newName);
    } catch (err) {
      console.log(err)
      ErrorHandler.failed();
    }
  }

}