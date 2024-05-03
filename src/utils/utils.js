import fs from 'fs';
import exifParser from 'exif-parser';
import chalk from 'chalk';

export function logMessage(message) {
    console.log(chalk.green.bold(message));
}

export function logError(error) {
    console.error(chalk.red.bold(error));
    return { error };
}

export function logProgress(message) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(chalk.green.bold(message));
}

export function sortDescending(files) {
    return files.sort((fileOne, fileTwo) => {
        return fileOne.date.getTime() < fileTwo.date.getTime() ? 1 : -1;
    });
}

export function getFileExtension(fileName) {
    try {
        return `.${fileName.substring(fileName.lastIndexOf('.') + 1)}`;
    } catch (error) {
        return new String();
    }
}

export function getFileBuffer(filePath) {
    return fs.readFileSync(filePath);
}

export function getOptimizedFileBuffer(filePath, bufferSize = 1 * 1000 * 1000) { // Size of file buffer to read exif data in Bytes.
    const fileBuffer = Buffer.alloc(bufferSize);
    const fd = fs.openSync(filePath, 'r');
    fs.readSync(fd, fileBuffer, 0, bufferSize, 0);
    return fileBuffer;
}

export function getExifDate(filePath) {
    try {
        const fileBuffer = getFileBuffer(filePath);
        // const fileBuffer = getOptimizedFileBuffer(filePath); // Use this if the file size is very large.
        try {
            const parser = exifParser.create(fileBuffer);
            const result = parser.parse();
            if (result.tags.DateTimeOriginal)
                return new Date(result.tags.DateTimeOriginal * 1000);
            return new Date(fs.statSync(filePath).birthtime);
        } catch (error) {
            return new Date(fs.statSync(filePath).birthtime);
        }
    } catch (error) {
        logError(`File '${filePath}' not found`);
    }
}