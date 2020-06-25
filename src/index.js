const axios = require("axios");

const { Client, RichEmbed } = require("discord.js");
const client = new Client();

client.on("ready", () => {
  console.log("t6radio bot is up!");

  setInterval(() => {
    axios
      .get("http://t6-radio.radio-site.com/cache/titreplayer2")
      .then(function (response) {
        client.user.setPresence({
          game: { type: "LISTENING", name: response.data.title_str },
          status: "online",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, 60000);
});

client.on("message", async (message) => {
  if (!message.guild) return;

  if (message.content === "t6!play") {
    if (message.member.voiceChannel) {
      await message.member.voiceChannel.join().then((connection) => {
        message.reply("I have successfully connected to the channel!");

        connection.playStream("http://137.74.162.80:8000/t6radio.ogg", {
          seek: 0,
          volume: 1,
        });

        const interval = setInterval(() => {
          if (connection.channel.members.size === 1) {
            connection.channel.leave();

            message.channel.send("Disconnected!");

            clearInterval(interval);
          }
        }, 20000);

        return;
      });
    } else {
      message.reply("You need to join a voice channel first!");
    }
  }

  if (message.content === "t6!stop") {
    if (message.member.voiceChannel) {
      await message.member.voiceChannel.leave().then(() => {
        message.reply("I have successfully disconnected!");
      });
    }
  }

  if (message.content === "t6!np") {
    axios
      .get("http://t6-radio.radio-site.com/cache/titreplayer2")
      .then(function (response) {
        const embed = new RichEmbed()
          .setTitle("***" + response.data.title + "***")
          .setAuthor(response.data.artist)
          .setColor(0xff0000)
          .setThumbnail(response.data.image)
          .setDescription("Commands: __t6!play__, __t6!stop__ and __t6!np__")
          .setFooter("T6 Radio discord bot by MiXerek");

        message.channel.send(embed);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  if (message.content === "t6!help") {
    const embed = new RichEmbed()
      .setTitle("***T6 Radio discord bot by MiXerek***")
      .setDescription("Commands: __t6!play__, __t6!stop__ and __t6!np__")
      .setFooter("T6 Radio discord bot by MiXerek");

    message.channel.send(embed);
  }
});

client.login(process.env.BOT_TOKEN);
