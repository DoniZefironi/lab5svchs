const fs = require('fs');
const path = require('path');

const booksFilePath = path.join(__dirname, '../fs/books/index.json');

function addBook(newBook) {
    let allBooks = []; // Инициализируем переменную для хранения всех книг

    if (!fs.existsSync(booksFilePath)) {
        throw new Error('Файл не существует');
    } else {
        const data = fs.readFileSync(booksFilePath, 'utf8');
       
        try {
            allBooks = JSON.parse(data);
        } catch (error) {
            console.error('Ошибка при парсинге JSON:', error.message);
            return; // Выход, если произошла ошибка
        }
    }

    allBooks.push(newBook);

    const writeStream = fs.createWriteStream(booksFilePath, { flags: 'w', encoding: 'utf8' });

    const booksJson = JSON.stringify(allBooks, null, 2);

    writeStream.write(booksJson, (err) => {
        if (err) {
            console.error(`Ошибка при записи в файл: ${err.message}`);
        } else {
            console.log('Успешно добавлено');
        }
    });

    writeStream.end();
}

const newBook = {
    id: "1730236855360",
    filename: "project_1730236855360.json"
};

try {
    addBook(newBook);
} catch (error) {
    console.log(error.message);
}