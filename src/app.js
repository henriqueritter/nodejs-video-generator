import Express from "express";

import { listAllTemplatesService } from "./services/listAllTemplatesService.js";

const app = Express();

app.use(Express.json());

app.post("/api/v1/videos/generate/image-overlay", (request, response) => {
  return response.send("Not Implemented");
});

app.get("/api/v1/videos", (request, response) => {
  return response.send("OK");
});

app.get("/api/v1/videos/templates", (request, response) => {
  const { pageSize, pageNumber } = request.query;

  if (pageSize && pageSize * 1 != pageSize) {
    return response.status(400).json({
      error: { message: "o valor do pageSize informado é inválido." },
    });
  }
  if (pageNumber && pageNumber * 1 != pageNumber) {
    return response.status(400).json({
      error: { message: "o valor do pageNumber informado é inválido." },
    });
  }

  const result = listAllTemplatesService({ pageSize, pageNumber });

  return response.json(result);
});

export { app };
