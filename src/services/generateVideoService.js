import { randomUUID } from "crypto";

function generateVideoService({
  mediaInput,
  chosedVideoTemplate,
  chosedFilter,
}) {
  const id = randomUUID();

  return { link: `${process.env.API_URL}/${id}` };
}

export { generateVideoService };
