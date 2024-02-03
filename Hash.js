import fs from "fs"
import crypto from "crypto"
import Navigator from "./Navigator.js";
import ErrorHandler from "./ErrorHandler.js";

export default class Hash {
  static async calc(path) {
    try {
      const name = await Navigator.toAbsolute(path);
      var stream = fs.createReadStream(name);
      var hash = crypto.createHash('sha1');
      hash.setEncoding('hex');
      stream.on('end', function() {
        hash.end();
        console.log(hash.read());
      });
      stream.pipe(hash);
    } catch {
      ErrorHandler.failed();
    }
  }
}