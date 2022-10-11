import express from "express";
import data from "./data.js";

const app = express();

app.get("/api/partners", (req, res) => {
  res.send(data.partners);
});

app.get("/api/partners/timestamp/:timestamp", (req, res) => {
  const partner = data.partners.find(
    (x) => x.timestamp === req.params.timestamp
  );
  if (partner) {
    res.send(partner);
  } else {
    res.status(404).send({ message: "Partner Not Found" });
  }
});

app.get("/api/partners/:id", (req, res) => {
  const partner = data.partners.find((x) => x._id === req.params.id);
  if (partner) {
    res.send(partner);
  } else {
    res.status(404).send({ message: "Partner Not Found" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
