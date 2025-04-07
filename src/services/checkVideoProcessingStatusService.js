import { requestsQueue } from "../requestsQueue.js";

function checkVideoProcessingStatus(id) {
  const status = requestsQueue[id];

  if (!status) return null;

  return status === "FINISHED"
    ? {
        status,
        link: `https://${process.env.R2_BUCKET_URL}/${id}`,
      }
    : { status };
}

export { checkVideoProcessingStatus };
