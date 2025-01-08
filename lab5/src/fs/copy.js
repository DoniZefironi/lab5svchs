const fs = require('fs');
const path = require("path");

function copyFile(source, destination) {
    try {
        fs.copyFileSync(source, destination);
        console.log(`Файл ${source} скопирован в ${destination}`);
    } catch (error) {
        console.error(`Ошибка при копировании файла ${source} в ${destination}`);
    }
}

function copyDirectory(sourceDirectory, destinationDirectory) {
    if (!fs.existsSync(sourceDirectory)) {
        console.error("Исходная директория не найдена");
        process.exit(1);
    }
    
    if (!fs.existsSync(destinationDirectory)) {
        fs.mkdirSync(destinationDirectory);
        console.log(`Директория ${destinationDirectory} была создана`);
    }
    
    const filesAndDirectories = fs.readdirSync(sourceDirectory);

    for (const item of filesAndDirectories) {
        const sourcePath = path.join(sourceDirectory, item);
        const destinationPath = path.join(destinationDirectory, item);

        const stats = fs.statSync(sourcePath);

        if (stats.isDirectory()) {
            copyDirectory(sourcePath, destinationPath);
        } else {
            copyFile(sourcePath, destinationPath);
        }
    }
}

const sourcePath = path.join(__dirname, process.argv[2]);
const destinationPath = path.join(__dirname, process.argv[3]);

if (!sourcePath || !destinationPath) {
    console.error('Ошибка: необходимо указать пути к исходной и целевой директориям');
} else {
    copyDirectory(sourcePath, destinationPath);
}

// Тестовый запуск: node copy.js book bookcopy