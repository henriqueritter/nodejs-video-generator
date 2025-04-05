import Express from "express";
import multer from "multer";

import { listAllTemplatesService } from "./services/listAllTemplatesService.js";
import { generateVideoService } from "./services/generateVideoService.js";

const app = Express();
const upload = multer();

app.use(Express.json());

app.post(
  "/api/v1/videos/generate/image-overlay",
  upload.single("image"),
  async (request, response) => {
    const { templateId } = request.query;

    if (!templateId) {
      return response
        .status(400)
        .json({ error: { message: "templateId is required." } });
    }

    if (!request.file) {
      return response.status(400).send("Image ausente");
    }

    try {
      const result = generateVideoService({
        mediaInput: request.file,
        chosedFilter: "image-overlay",
        chosedVideoTemplate: templateId,
      });
      return response.json(result);
    } catch (e) {
      return response.status(500).send({ error: { message: e.message } });
    }
  }
);

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

  return response.json({ data: result });
});

app.get("/api/v1/videos/:id", (request, response) => {
  return response.status(500).send("Not Implemented");
});

export { app };
