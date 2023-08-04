const express = require ('express');
const cors = require ('cors')
const { projectrouter } = require("./Routes/noteRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/note", projectrouter);

app.use((err, req, res, next) => {
  res.json({ Error: err });
});

app.listen(4501, () => {
  console.log("Server Running on port 4501");
});
