import fs, { mkdirSync } from 'fs';
import { logError } from '../utils/utils.js';

export function createDirectory(directoryPath) {
    try {
        fs.accessSync(directoryPath);
    } catch (error) {
        try {
            mkdirSync(directoryPath);
        } catch (error) {
            logError(`Error creating directory '${directoryPath}': ${error}`);
        }
    }
}