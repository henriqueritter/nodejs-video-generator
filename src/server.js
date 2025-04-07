import { app } from "./app.js";

const API_PORT = process.env.PORT || 4000;

app.listen(API_PORT, () => {
  console.info("Server is Up at: " + API_PORT);
});
