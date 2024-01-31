import path from 'path';
import os from "os"
import ErrorHandler from './ErrorHandler.js';
let pth = os.homedir();
import fs from "fs/promises"

export default class Navigator {
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

    static async toAbsolute(pathname) {
        let cdpath = path.join(pth, pathname)
        if (path.isAbsolute(pathname)) {
            cdpath = pathname;
        }
        await fs.access(cdpath);
        if (pth.startsWith(Navigator.root) === false) {
            throw new Error("Too deep")
        }
        return cdpath;
    }

    static async cd(to) {
        try {
            const cdpath = await Navigator.toAbsolute(to);
            pth = cdpath;
        } catch (err) {
            ErrorHandler.failed();
        }
    }

    static async ls() {
        try {
            const files = await fs.readdir(pth);
            let lsTable = [];

            for (const file of files) {
                let type;
                const stat = await fs.stat(path.join(pth, file))
                if (stat.isFile()) {
                    type = "file"
                } else if (stat.isDirectory()) {
                    type = "directory"
                }
                lsTable.push({ File: file, Type: type })
            }
            lsTable = lsTable.sort((a, b) => {
                if (a.Type === "directory" && b.Type === "file") {
                    return -1;
                }
                if (a.Type === "file" && b.Type === "directory") {
                    return 1;
                }
                if (a.File < b.File) {
                    return -1;
                }
                if (a.File > b.File) {
                    return 1;
                }
                return 0;
            })
            console.table(lsTable)
        }
        catch {
            ErrorHandler.failed();
        }
    }
}

