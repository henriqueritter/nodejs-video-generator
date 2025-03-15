import { app } from './app.js';

const API_PORT = process.env.API_PORT;

app.listen(API_PORT, () => {
    console.info('Server is Up at: ' + API_PORT);
});