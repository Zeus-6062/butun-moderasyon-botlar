module.exports = {
  conf: {
    aliases: ["help", "y", "h"],
    name: "yardım",
  },

  run: async (client, message, args, embed, prefix) => {
    let list = client.commands
      .filter((x) => x.conf.help)
      .sort((a, b) => b.conf.help - a.conf.help)
      .map((x) => `\`${prefix}${x.conf.help}\``)
      .join("\n");
      message.channel.send(embed.addField(
    `Not: [] Parantezinin içine alınanlar zorunlu <> içine alınanlar ise isteğe bağlı yapmanız gerekenler.`,
    `${list}` , true))
  }
};
