import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
import { requestsQeue } from "../requestsQeue.js";

ffmpeg.setFfmpegPath(ffmpegPath);

const filters = {
  "image-overlay": [
    "[0:v]scale='if(gt(a,1440/1280),1080,-1)':'if(gt(a,1440/1280),-1,960)'[rescaled_img]",
    {
      filter: "overlay",
      options: { x: "(main_w-overlay_w)/2", y: 0 },
      inputs: ["1:v", "rescaled_img"],
      outputs: "output",
    },
  ],
};

function processVideoStream(
  inputStream,
  videoTemplatePath,
  outputVideoName,
  chosedFilter,
  exportVideoCallback
) {
  const videoOutputStream = ffmpeg()
    .input(inputStream)
    .input(videoTemplatePath)
    .complexFilter(filters[chosedFilter], "output")
    .format("mp4")
    .outputOptions([
      "-f mp4",
      "-map 1:a?",
      "-c:v libx264",
      "-c:a aac",
      "-b:a 192k",
      "-movflags frag_keyframe+empty_moov",
      "-preset ultrafast",
    ])
    .on("start", () => {
      requestsQeue[`${outputVideoName}.mp4`] = "PROCESSING";
    })
    .on("error", (e) => {
      inputStream.destroy?.();
      console.error("ffmpeg error: ", e);
    })
    .on("end", () => {
      inputStream.destroy?.();
      requestsQeue[`${outputVideoName}.mp4`] = "PROCESSED";
    });

  exportVideoCallback(videoOutputStream, `${outputVideoName}.mp4`)
    .then(() => {
      inputStream.destroy?.();
      videoOutputStream.destroy?.();
    })
    .catch((e) => {
      console.log("Error exporting video to callback: ", e);
    });

  return;
}

export { processVideoStream };
