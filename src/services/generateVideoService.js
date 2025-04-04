import { randomUUID } from "crypto";
import { PassThrough } from "stream";
import { existsSync } from "fs";
import { processVideoStream } from "../providers/proccessVideoStreamFFMPEG.js";
import { saveFileOnDisk } from "../providers/saveFileOnDisk.js";

function generateVideoService({
  mediaInput,
  chosedVideoTemplate = "a",
  chosedFilter = "image-overlay",
}) {
  const videoTemplatePath = `./templates/${chosedVideoTemplate}.mp4`;

  if (!existsSync(videoTemplatePath)) {
    throw new Error("Invalid template.");
  }

  const outputFileName = randomUUID();

  const stream = new PassThrough();
  stream.end(mediaInput.buffer);

  processVideoStream(
    stream,
    videoTemplatePath,
    outputFileName,
    chosedFilter,
    saveFileOnDisk
  );

  return { link: `${process.env.API_URL}/api/v1/videos/${outputFileName}.mp4` };
}

export { generateVideoService };
