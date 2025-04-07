import { Upload } from "@aws-sdk/lib-storage";
import { finished } from "stream/promises";
import { s3Client } from "./cloudflareR2Client.js";
import { requestsQeue } from "../requestsQeue.js";

// Configurações do Cloudflare R2
const { R2_BUCKET_NAME } = process.env;

async function uploadVideoToCloud(inputStream, outputFileName) {
  const stream = inputStream.pipe({ end: true });

  stream.on("error", (e) => {
    console.error("Error on stream: ", e);
    inputStream.destroy?.();
  });
  let upload = new Upload({
    client: s3Client,
    params: {
      Bucket: R2_BUCKET_NAME,
      Key: outputFileName,
      Body: stream,
      ContentType: "video/mp4",
    },
  });

  try {
    upload.on("httpUploadProgress", (progress) => {
      requestsQeue[`${outputFileName}`] = "UPLOADING";
    });

    await upload.done();
    await finished(stream);
  } catch (err) {
    inputStream.destroy?.();
    stream.destroy?.();
    s3Client.destroy?.();
    upload = null;
    console.error("Upload to R2 failed:", err);
    requestsQeue[`${outputFileName}`] = "UPLOAD_FAILED";
  } finally {
    inputStream.destroy?.();
    stream.destroy?.();
    s3Client.destroy?.();
    upload = null;
    requestsQeue[`${outputFileName}`] = "FINISHED";
  }
}

export { uploadVideoToCloud };
