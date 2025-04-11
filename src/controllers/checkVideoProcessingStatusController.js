import { checkVideoProcessingStatus } from "../services/checkVideoProcessingStatusService.js";

export const checkVideoProcessingStatusController = {
  handle: async function (request, response) {
    const { id } = request.params;
    const result = checkVideoProcessingStatus(id);

    if (!result)
      return response
        .status(404)
        .json({ error: { message: "Video Not Found." } });

    return response.json({
      data: result,
    });
  },
};
