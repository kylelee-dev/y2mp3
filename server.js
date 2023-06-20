const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// create server
const app = express();

// server port from config
const PORT = process.env.PORT || 7000;

// set temnplate engine
// parse html data for POST Request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

//
app.post("/convert-mp3", async (req, res) => {
  const videoId = req.body.videoId;
  if (videoId === undefined || videoId === null || videoId === "") {
    res.status(400).send("Invalid Video ID");
  }
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": process.env.API_HOST,
    },
  };
  const fetchAPI = await fetch(
    `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`,
    options
  );

  const response = await fetchAPI.json();

  res.json({
    title: response.title,
    link: response.link,
  });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
