import { generateVideoService } from "../services/generateVideoService.js";

export const generateVideoController = {
  handle: async function (request, response) {
    const { templateId } = request.query;

    if (!templateId) {
      return response
        .status(400)
        .json({ error: { message: "TemplateId is required." } });
    }

    if (!request.file) {
      return response
        .status(400)
        .json({ error: { message: "A media is required." } });
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
  },
};
