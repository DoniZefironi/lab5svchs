const fs = require("fs");
const path = require("path");

const booksDirectory = path.join(__dirname, 'books');
const indexFilePath = path.join(booksDirectory, 'index.json');

function generateUniqueId() {
    return `${Date.now()}`;
}

function addNewBook(bookDetails) {
    // Создание уникального имени файла для хранения данных о новой записи
    const uniqueId = generateUniqueId();
    const bookFileName = `book_${uniqueId}.json`;
    const bookFilePath = path.join(booksDirectory, bookFileName);

    if (!fs.existsSync(booksDirectory)) {
        fs.mkdirSync(booksDirectory);
    }
    
    // Проверка на существование файла
    if (fs.existsSync(bookFilePath)) {
        console.error('Ошибка операции FS: Запись уже существует.');
        return;
    }

    // Запись информации о новой записи в файл в формате JSON
    fs.writeFileSync(bookFilePath, JSON.stringify(bookDetails, null, 2), 'utf8');

    let indexData = [];
    if (fs.existsSync(indexFilePath)) {
        const existingIndexData = fs.readFileSync(indexFilePath, "utf8");
        indexData = JSON.parse(existingIndexData);
    }

    const entry = {
        id: uniqueId,
        fileName: bookFileName
    };
    indexData.push(entry);

    fs.writeFileSync(indexFilePath, JSON.stringify(indexData, null, 2), 'utf8');

    console.log('Новая запись успешно добавлена.');
}

const commandLineArgs = process.argv.slice(2);
if (commandLineArgs.length < 4) {
    console.error('Недостаточно аргументов. Использование: node create.js "Название книги" "Автор книги" "ISBN" "Год издания" "Описание книги"');
    process.exit(1);
}
// добавить информацию о новом файле в отдельный индексный файл, который хранит список всех записей; 
let newBookRecord = {
    title: commandLineArgs[0],
    author: commandLineArgs[1],
    isbn: commandLineArgs[2],
    year: commandLineArgs[3],
    description: commandLineArgs[4] || 'Описание отсутствует'
};

addNewBook(newBookRecord);

// Тестовый запуск: node create.js "Название книги" "Автор книги" "ISBN" "Год издания" "Описание книги"