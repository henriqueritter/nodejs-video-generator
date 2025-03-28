import Express from 'express';

import { listAllTemplatesService } from './services/listAllTemplatesService.js';

const app = Express();

app.use(Express.json());

app.post('/api/v1/videos/generate/image-overlay', (request, response) => {
    return response.send('Not Implemented');
});

app.get('/api/v1/videos/:id', (request, response) => {
    return response.send('OK');
});

app.get('/api/v1/videos/templates', (request, response) => {
    const { pageSize, pageNumber } = request.query;

    const result = listAllTemplatesService({ pageSize, pageNumber });

    response.json(result);
});

export { app };