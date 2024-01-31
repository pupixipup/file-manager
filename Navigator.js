const path = require('path')
const os = require('os');
const ErrorHandler = require("./ErrorHandler")
let pth = os.homedir();

class Navigator {
    static get path() {
        return pth;
    }

    static up() {
        try {
            // Get the parent directory
            const parentDir = path.join(pth, '..');
            const resolvedPath = path.resolve(parentDir);
            pth = resolvedPath;
        } catch {
            ErrorHandler.failed();
        }
    }
}

module.exports = Navigator