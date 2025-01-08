const fs = require("fs");
const path = require("path");

const booksDirectory = path.join(__dirname, 'books');
const indexFilePath = path.join(booksDirectory, 'index.json');

function deleteBookById(bookId) {
    let allBooks;

    // Читаем и парсим данные из books.json
    try {
        allBooks = JSON.parse(fs.readFileSync(indexFilePath));
    } catch (error) {
        console.error(`Ошибка при чтении файла books.json: ${error.message}`);
        process.exit(1);
    }

    const bookToRemove = allBooks.find(book => book.id == bookId);

    if (bookToRemove) {
        const bookFilePath = path.join(booksDirectory, `book_${bookToRemove.id}.json`); 
        try {
            fs.unlinkSync(bookFilePath);
            console.log(`Файл ${bookFilePath} успешно удалён.`);
        } catch (error) {
            console.error(`Ошибка при удалении файла: ${error.message}`);
            process.exit(1);
        }

        allBooks = allBooks.filter(book => book.id != bookId);

        fs.writeFileSync(indexFilePath, JSON.stringify(allBooks, null, 2));
        console.log(`Книга c id ${bookId} удалена.`);
    } else {
        console.log(`Книга c id ${bookId} не найдена.`);
    }
}

const bookId = process.argv[2];

try {
    deleteBookById(bookId);
} catch (error) {
    console.log(error.message);
}

// Тестовый запуск: node delete.js <id_книги>