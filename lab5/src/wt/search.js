const fs = require('fs');
const path = require('path');

const searchTerm = process.argv[2];
const booksFilePath = path.join(__dirname, 'books.json');

fs.readFile(booksFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Ошибка при чтении файла:', err);
        process.exit(1);
    }

    try {
        const books = JSON.parse(data);
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        console.log(JSON.stringify(filteredBooks, null, 2));
    } catch (error) {
        console.error('Ошибка при парсинге JSON:', error.message);
        process.exit(1);
    }
});