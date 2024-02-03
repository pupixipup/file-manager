import Navigator from "./Navigator.js";
import File from "./File.js";
import { pipeline} from "stream/promises";
import fs from "fs"
import zlib from "zlib"
import ErrorHandler from "./ErrorHandler.js";
export default class Compress {
  static async compress(file, dest) {
    try {

      const oldName = await Navigator.toAbsolute(file, true);
      const newName = await Navigator.toAbsolute(dest, true);
      const oldExists = await File.fileExists(oldName);
      const newExists = await File.fileExists(newName);
      if (!oldExists || newExists) {
        throw new Error("file already exists");
      }
      pipeline(fs.createReadStream(oldName), zlib.createBrotliCompress(), fs.createWriteStream(newName))
      } catch {
      ErrorHandler.failed();
    }
  }

  static async decompress(file, dest) {
    try {
    const oldName = await Navigator.toAbsolute(file, true);
    const newName = await Navigator.toAbsolute(dest, true);
    const oldExists = await File.fileExists(oldName);
    const newExists = await File.fileExists(newName);
    if (!oldExists || newExists) {
      throw new Error("file already exists");
    }
    pipeline(fs.createReadStream(oldName), zlib.createBrotliDecompress(), fs.createWriteStream(newName))
  } catch {
    ErrorHandler.failed();
  }
  }
  
}