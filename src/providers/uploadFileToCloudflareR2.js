import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

// Configurações do Cloudflare R2
const {
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_ACCOUNT_ID,
  R2_BUCKET_NAME,
} = process.env;

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

async function uploadVideoToCloud(inputStream, outputFileName) {
  const stream = inputStream.pipe({ end: true });

  try {
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: R2_BUCKET_NAME,
        Key: outputFileName,
        Body: stream,
        ContentType: "video/mp4",
      },
    });

    upload.on("httpUploadProgress", (progress) => {
      //console.log(progress);
    });

    await upload.done();
  } catch (err) {
    console.error("Upload failed:", err);
  }
}

export { uploadVideoToCloud };
