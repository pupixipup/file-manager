const path = require('path')
const os = require('os');
const ErrorHandler = require("./ErrorHandler")
let pth = os.homedir();
const fs = require('fs').promises;

class Navigator {
    static root = path.parse(os.homedir()).root;
    static get path() {
        return pth;
    }

    static inRoot 

    
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

    static async cd(to) {
        try {
            let cdpath = path.join(pth, to)
            if (path.isAbsolute(to)) {
                cdpath = to;
            }
            await fs.access(cdpath);
            if (pth.startsWith(Navigator.root) === false) {
                console.log(pth, Navigator.root)
                throw new Error("too deep")
            }
                pth = cdpath;
        } catch (err) {
            console.log(err)
            ErrorHandler.failed();
        }
    }
}

module.exports = Navigator