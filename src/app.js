import Express from 'express';

const app = Express();

app.use(Express.json());

app.post('/api/v1/videos/generate', (request, response) => {
    return response.send('Not Implemented');
});
app.get('/api/v1/videos/:id', (request, response) => {
    return response.send('OK');
});

export { app };