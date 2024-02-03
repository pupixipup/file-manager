import { pipeline } from "stream/promises";
import ErrorHandler from "./ErrorHandler.js";
import Navigator from "./Navigator.js";
import fs from "fs"

export default class File {

  static fileExists(filePath) {
try {
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
  } catch {
    ErrorHandler.failed();
  }
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
    } catch {
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
      pipeline(fs.createReadStream(oldName), fs.createWriteStream(newName))
    } catch {
      ErrorHandler.failed();
    }
  }

  static async mv(from, to) {
    try {
      const oldName = await Navigator.toAbsolute(from, true);
      const newName = await Navigator.toAbsolute(to, true);
      const oldExists = await File.fileExists(oldName);
      const newExists = await File.fileExists(newName);
      if (!oldExists || newExists) {
        throw new Error("file already exists");
      }
      pipeline(fs.createReadStream(oldName), fs.createWriteStream(newName)).then(() => {
        fs.promises.unlink(oldName)
      })
    } catch (err) {
      ErrorHandler.failed();
    }
  }

  static async rm(file) {
    try {
      const name = await Navigator.toAbsolute(file);
      const exists = await File.fileExists(name);
      if (!exists) {
        throw new Error("file does not exist");
      }
      fs.promises.unlink(name);
    } catch (err) {
      ErrorHandler.failed();
    }
  }

}