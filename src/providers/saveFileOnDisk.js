import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { requestsQueue } from "../requestsQueue.js";

async function saveFileOnDisk(inputStream, outputFileName) {
  const outputStream = createWriteStream(`./${outputFileName}`);
  try {
    await pipeline(inputStream, outputStream);
    requestsQueue[`${outputFileName}.mp4`] = "FINISHED";
  } catch (e) {
    console.error("Erro at pipeline: ", e);
    inputStream.destroy?.();
    outputStream.destroy?.();
  } finally {
    inputStream.destroy?.();
    outputStream.destroy?.();
  }
}

export { saveFileOnDisk };
