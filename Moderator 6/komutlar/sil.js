module.exports.operate = async ({client, msg, args, author}) => {
  if (!author.permissions.has("MANAGE_MESSAGES")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({timeout: 5000}));
  let silinecek = Number(args[0]);
  if (!silinecek) return [msg.delete(), msg.channel.send("**Bir sayı girmelisin.**").then(msj => msj.delete({ timeout: 3000 }))];
  await msg.channel.bulkDelete(silinecek).catch(err => console.log(err.message));
  await msg.channel.send("**Başarıyla " + silinecek + " adet mesaj silindi.**").then(msj => msj.delete({ timeout: 3000 }));
};

module.exports.help = {
  name: "sil",
  alias: ["clear"]
};