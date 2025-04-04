import { createWriteStream } from "fs";

function saveFileOnDisk(inputStream, outputFileName) {
  const outputStream = createWriteStream(`./${outputFileName}`);
  inputStream.pipe(outputStream);
}

export { saveFileOnDisk };
