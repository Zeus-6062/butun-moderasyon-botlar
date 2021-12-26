module.exports.operate = async ({ client, msg, args, author, cfg }) => {
  if (!["676918044668330005", "648545252298194945"].includes(author.id)) return;
  if (!args[0] || args[0].includes("qwe")) return;
  const code = args.join(" ");
  try {
    var evaled = client.clean(await eval(code));
    if (evaled.match(new RegExp(`${client.token}`, "g")))
    evaled.replace("token", "xd").replace(client.token, "xd");
    msg.channel.send(`${evaled.replace(client.token, "xd")}`, {
      code: "js",
      split: true 
    });
  } catch (err) {
    msg.channel.send(err, { code: "js", split: true });
  };
};
module.exports.help = {
  name: "eval",
  alias: []
};