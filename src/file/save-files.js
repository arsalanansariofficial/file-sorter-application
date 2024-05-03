import { createDirectory } from './create-directory.js';
import { copyFile } from './copy-file.js';
import { getFileExtension, logMessage, logProgress } from '../utils/utils.js';

export function saveFiles(fileObject, destinationPath, files, copiedFiles) {
    logMessage('Saving files...');
    createDirectory(destinationPath);
    for (const year in fileObject) {
        for (const month in fileObject[year]) {
            fileObject[year][month].forEach((file, index) => {
                const destinationFilePath = `${destinationPath}/${year}/${month}/${index + 1}${getFileExtension(file.name)}`;

                createDirectory(`${destinationPath}/${year}`);
                createDirectory(`${destinationPath}/${year}/${month}`);

                copyFile(file.path, destinationFilePath, copiedFiles);
                logProgress(`Progress... ${parseInt((copiedFiles.length / files.length) * 100)} %`);
            });
        }
    }
}