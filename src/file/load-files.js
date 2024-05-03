import fs from 'fs';
import path from 'path';
import { logProgress, logError } from '../utils/utils.js';

export function loadFiles(sourcePath, files = []) {
    let dirents = [];
    try {
        const configurations = { withFileTypes: true };
        dirents = fs.readdirSync(sourcePath, configurations);
    } catch (error) {
        logError(error);
    }
    for (const file of dirents) {
        if (file.isDirectory())
            loadFiles(path.join(sourcePath, file.name), files);
        else {
            const filePath = path.join(sourcePath, file.name);
            files.push({ ...file, path: filePath });
            logProgress(`Getting files... ${files.length}`);
        }
    }
    return files;
}