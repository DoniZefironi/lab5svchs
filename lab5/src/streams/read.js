const fs = require('fs');
const path = require('path');

const booksFilePath = path.join(__dirname, '../fs/books/index.json');

function readBookInChunks() {
    if (!fs.existsSync(booksFilePath)) {
        throw new Error('Файл не существует');
    }

    const fileStream = fs.createReadStream(booksFilePath, { encoding: 'utf8', highWaterMark: 200 });

    fileStream.on('data', (chunk) => {
        console.log('Чтение следующего блока данных:');
        console.log(chunk);
    });

    fileStream.on('end', () => {
        console.log('Чтение файла завершено.');
    });

    fileStream.on('error', (err) => {
        console.error(`Ошибка при чтении файла: ${err.message}`);
    });
}

try {
    readBookInChunks();
} catch (error) {
    console.log(error.message);
}