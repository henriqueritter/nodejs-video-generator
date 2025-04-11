import Express from "express";
import fileUpload from "./middlewares/fileUpload.js";
import cors from "cors";

import { checkVideoProcessingStatus } from "./services/checkVideoProcessingStatusService.js";
import { generateVideoController } from "./controllers/generateVideoController.js";
import { listAllTemplatesController } from "./controllers/listAllTemplatesController.js";
import { checkVideoProcessingStatusController } from "./controllers/checkVideoProcessingStatusController.js";

const app = Express();
app.use(cors({ origin: "*" }));

app.use(Express.json());

app.post(
  "/api/v1/videos/generate/image-overlay",
  fileUpload.single("image"),
  generateVideoController.handle
);

app.get("/api/v1/videos/templates", listAllTemplatesController.handle);

app.get("/api/v1/videos/:id", checkVideoProcessingStatusController.handle);

app.get("/api/v1/healthcheck", (request, response) => {
  return response.send();
});

export { app };
