import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
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
  let videoOutputStream = ffmpeg()
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
    .on("start", (cmd) => {
      //console.log("FFmpeg cmd:", cmd)
    })
    .on("error", (err) => {
      //console.error("Erro no FFmpeg:", err);
    })
    .on("end", () => {
      //console.log("Vídeo finalizado.");
    });

  exportVideoCallback(videoOutputStream, `${outputVideoName}.mp4`);

  return;
}

export { processVideoStream };
