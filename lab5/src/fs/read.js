const fs = require('fs');
const path = require('path');

const booksDirectory = path.join(__dirname, 'books');
const indexFilePath = path.join(booksDirectory, 'index.json');

function readBookById(bookId) {
    if (!fs.existsSync(indexFilePath)) {
        throw new Error('Файл с книгами не существует');
    }

    let bookData = JSON.parse(fs.readFileSync(indexFilePath));

    const book = bookData.find(book => book.id == bookId);

    if (book) {
        console.log(`id: ${book.id}, fileName: ${book.fileName}`);
    } else {
        console.log('Книга с таким id не существует');
    }
}

const bookId = process.argv[2];

try {
    readBookById(bookId);
} catch (error) {
    console.log(error.message);
}

// Тестовый запуск: node read.js <id_книги>