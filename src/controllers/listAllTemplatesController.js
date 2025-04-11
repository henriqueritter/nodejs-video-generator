import { listAllTemplatesService } from "../services/listAllTemplatesService.js";

export const listAllTemplatesController = {
  handle: async function (request, response) {
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

    return response.json({
      data: result,
    });
  },
};
