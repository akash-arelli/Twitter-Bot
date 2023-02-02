require("dotenv").config({ path: __dirname + "/.env" });
const gen = require("images-generator");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const { twitterClient } = require("./twitterClient.js");
const CronJob = require("cron").CronJob;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const tweet = async () => {
  try {
    let Image = await gen.anime.desktopWallpaper();
    await twitterClient.v2.tweet(Image);
  } catch (e) {
    console.log(e);
  }
};

const cronTweet = new CronJob("30 * * * * *", async () => {
  tweet();
});

cronTweet.start();
