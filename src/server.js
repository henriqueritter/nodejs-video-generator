import Express from 'express';
const API_PORT = process.env.API_PORT;

const app = Express();

app.use(Express.json());

app.post('/', (request, response) => {
    return response.send('Not Implemented');
});
app.get('/', (request, response) => {
    return response.send('OK');
});

app.listen(API_PORT, () => {
    console.info('Server is Up at: ' + API_PORT);
});