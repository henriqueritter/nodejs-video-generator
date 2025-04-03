import ffmpeg from "fluent-ffmpeg";

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
  ffmpeg()
    .input(inputStream)
    .input(videoTemplatePath)
    .complexFilter(filters[chosedFilter], "output")
    .outputOptions(["-map 1:a?", "-c:v libx264", "-c:a aac", "-b:a 192k"])
    .output(`${outputVideoName}.mp4`)
    .on("end", () => {
      console.log("Processamento concluído.");
      exportVideoCallback();
    })
    .on("error", (err) => {
      console.error("Erro no FFmpeg:", err);
      return { error: "Erro ao processar vídeo" };
    })
    .run();
}

export { processVideoStream };
