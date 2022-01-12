import { createConnection } from 'mysql';

// Create connection 
const DB = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fulltopic',
    timezone: 'Europe/Paris'
});


DB.connect ((err) => {
    if (err) throw err;
});


export { DB };