import fs from 'fs';
import { logError } from '../utils/utils.js';

export function copyFile(sourcePath, destinationPath, copiedFiles) {
    try {
        fs.copyFileSync(sourcePath, destinationPath);
        copiedFiles.push(sourcePath);
    } catch (error) {
        logError(`Error copying file '${sourcePath}' --> '${destinationPath}'`);
    }
}