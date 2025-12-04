import app from "./app";
import config from "./config/init";

app.listen(config.port, () => {
  console.log(`Server port run on ${config.port}`);
});
