module.exports = (fs, client) => {
  fs.readdir("./komutlar/", (err, files, komutlar = []) => {
    console.log("Komutlar Yükleniyor.");
    if (err) return console.log("Error var error " + err);
    files.filter(f => f.endsWith(".js")).forEach(file => {
      let prop = require(`../komutlar/${file}`);
      client.commands.set(prop.help.name, prop);
      prop.help.alias.forEach(alias => {
        client.aliases.set(alias, prop.help.name);
      });
    });
    for (var value of client.commands.values()) komutlar.push(value.help.name);
    console.log("[" + komutlar.join(", ") + "]" + " isimli komut(lar) yüklendi. (" + files.length + ")");
    console.log("--------------------------");
  });
};