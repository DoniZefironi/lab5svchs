const { spawn } = require('child_process');

if (process.argv.length < 3) {
    console.error('Использование: node main.js <searchTerm>');
    process.exit(1);
}

const searchTerm = process.argv[2];
const searchProcess = spawn('node', ['./search.js', searchTerm], { cwd: __dirname });

searchProcess.stdout.on('data', (output) => {
    console.log(`Результаты поиска:\n${output}`);
});

searchProcess.stderr.on('data', (error) => {
    console.error(`Ошибка: ${error}`);
});

searchProcess.on('close', (exitCode) => {
    console.log(`Процесс завершился с кодом ${exitCode}`);
});