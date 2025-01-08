const { Transform, pipeline } = require('stream');

class BookTransform extends Transform {
    _transform(chunk, encoding, callback) {
        try {
            const book = JSON.parse(chunk.toString());
            const transformedBook = {
                ...book,
                publicationYear: new Date().getFullYear()
            };

            const output = JSON.stringify(transformedBook, null, 2) + '\n';
            this.push(output);
            callback(); // Успешное завершение трансформации
        } catch (error) {
            console.error('Ошибка при парсинге JSON:', error.message);
            callback(error); // Передаём ошибку в callback
        }
    }
}

const inputStream = process.stdin;  // Считывание из stdin
const outputStream = process.stdout; // Вывод в stdout

pipeline(
    inputStream,
    new BookTransform(),
    outputStream,
    (err) => {
        if (err) {
            console.error('Ошибка в процессе трансформации:', err);
        } else {
            console.log('Преобразование завершено успешно!');
        }
    }
);