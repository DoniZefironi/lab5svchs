const fs = require('fs');
const path = require('path');

function renameFile(oldFileName, newFileName) {
    try {
        if (!fs.existsSync(oldFileName)) {
            throw new Error(`Файл ${oldFileName} не найден!`);
        }

        fs.renameSync(oldFileName, newFileName);
        
        console.log(`Файл ${oldFileName} переименован в ${newFileName}`);
    } catch (error) {
        console.log(`Ошибка при переименовании файла ${oldFileName}: ${error.message}`);
    }
}

const oldFileName = path.join(__dirname, process.argv[2]);
const newFileName = path.join(__dirname, process.argv[3]);

renameFile(oldFileName, newFileName);

// Тестовый запуск: node rename.js filename.txt newfilename.txt