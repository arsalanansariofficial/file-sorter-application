import fs from 'fs';
import { loadFiles } from '../file/load-files.js';
import { groupFiles } from '../file/group-files.js';
import { logError, logMessage } from '../utils/utils.js';

export function main(sourcePath = './files', destinationPath = './files-arranged') {
    let files = [];
    let copiedFiles = [];
    
    try {
        fs.accessSync(sourcePath);
        files = loadFiles(sourcePath);
    } catch (error) {
        return logError(`Source directory '${sourcePath}' not found`);
    }
    
    if (files.length === 0) return logError(`Empty source directory`);

    groupFiles(destinationPath, files, copiedFiles);

    logMessage(`\nTotal files: ${files.length}`);
    logMessage(`Copied files: ${copiedFiles.length}`);

    return { totalFiles: files.length, copiedFiles: copiedFiles.length };
}