import { saveFiles } from './save-files.js';
import { logMessage, getExifDate, sortDescending } from '../utils/utils.js';

export function groupFiles(destinationPath, files, copiedFiles) {
    let filesObject = {};
    logMessage('\nGrouping files...');
    for (const file of files) {
        const date = getExifDate(file.path);
        const Year = date.getFullYear();
        const Month = date.toLocaleString('default', { month: 'long' });

        if (!filesObject[Year]) filesObject[Year] = {};
        if (!filesObject[Year][Month]) filesObject[Year][Month] = [];

        filesObject[Year][Month].push({ ...file, date });
        sortDescending(filesObject[Year][Month]);
    };
    saveFiles(filesObject, destinationPath, files, copiedFiles);
}