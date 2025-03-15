import Express from 'express';

const app = Express();

app.use(Express.json());

app.post('/', (request, response) => {
    return response.send('Not Implemented');
});
app.get('/', (request, response) => {
    return response.send('OK');
});

export { app };