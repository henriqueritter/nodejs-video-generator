import { randomUUID } from "crypto";
import { PassThrough } from "stream";
import { existsSync } from "fs";
import { processVideoStream } from "../providers/processVideoStreamFFMPEG.js";
import { uploadVideoToCloud } from "../providers/uploadFileToCloudflareR2.js";
import { saveFileOnDisk } from "../providers/saveFileOnDisk.js";
import { requestsQueue } from "../requestsQueue.js";

function generateVideoService({
  mediaInput,
  chosedVideoTemplate = "KNUCKLES_APPROVE_EXCELLENT_ARGUMENT",
  chosedFilter = "image-overlay",
}) {
  const videoTemplatePath = `./templates/${chosedVideoTemplate}.mp4`;

  if (!existsSync(videoTemplatePath)) {
    throw new Error("Invalid template.");
  }

  const outputFileName = randomUUID();

  const stream = new PassThrough();
  stream.end(mediaInput.buffer);

  const exportVideoCallback =
    process.env.SAVE_ON_DISK === "true" ? saveFileOnDisk : uploadVideoToCloud;

  requestsQueue[`${outputFileName}.mp4`] = "PENDING";

  processVideoStream(
    stream,
    videoTemplatePath,
    outputFileName,
    chosedFilter,
    exportVideoCallback
  );

  return { link: `${process.env.API_URL}/api/v1/videos/${outputFileName}.mp4` };
}

export { generateVideoService };
