import express from "express";
import axios from "axios";
import cors from "cors";

const server = express();
server.use(cors());
server.get("/", (req, res) => {
  res.send("hola");
});

let word = "";
server.get("/word", async (req, res) => {
  word = await axios(
    "https://palabras-aleatorias-public-api.herokuapp.com/random-by-length?length=5"
  ).then((res) => {
    return {
      word: res.data.body.Word,
      def: res.data.body.urls.wikipedia,
      day: new Date().getDate(),
    };
  });

  res.json({
    ...word,
  });
});

server.get("/wordByDay", async (req, res) => {
  if (word === "" || word.day !== new Date().getDate()) {
    await axios("http://localhost:3001/word").then((data) => data);
    res.send(word);
  } else {
    res.send(word);
  }
});

server.listen(3001, (e) => {
  if (e) console.error(e);
  else console.log("Server listen at: 3001");
});
