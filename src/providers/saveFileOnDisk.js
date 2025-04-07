import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { requestsQeue } from "../requestsQeue.js";

async function saveFileOnDisk(inputStream, outputFileName) {
  const outputStream = createWriteStream(`./${outputFileName}`);
  try {
    await pipeline(inputStream, outputStream);
    requestsQeue[`${outputFileName}.mp4`] = "FINISHED";
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
