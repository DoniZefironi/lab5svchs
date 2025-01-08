const fs = require('fs');
const path = require('path');

const booksDirectory = path.join(__dirname, 'books');
const indexFilePath = path.join(booksDirectory, 'index.json');

function listBooks() {
    if (!fs.existsSync(indexFilePath)) {
        throw new Error('Файл с книгами не существует');
    }

    let bookData = JSON.parse(fs.readFileSync(indexFilePath));

    bookData.forEach(book => {
        console.log(`id: ${book.id}, fileName: ${book.fileName}`);
    });
}

try {
    listBooks();
} catch (error) {
    console.log(error.message);
}

// Тестовый запуск: node list.js