require("dotenv").config();
const express = require("express");
const flowController = require("./flowController");
const cors = require("cors");

const app = express();

app.use(express.json());
const opts = { origin: [process.env.CLIENT_URL, process.env.DOMAIN] };
app.use(cors(opts));
app.options("*", cors(opts));

app.post("/api/flows", async (req, res) => {
  try {
    if (req.body?.prompt) {
      console.log(req.body);
      const completions = await flowController.generate(req.body.prompt);
      console.log(completions);
      res.status(200).send({ completions });
    } else {
      res.status(400).send({ message: "Please include a valid prompt" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong hombre" });
  }
});

const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
