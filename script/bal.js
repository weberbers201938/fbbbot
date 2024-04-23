module.exports.config = {
  name: "bal",
  version: "1.0.0",
  cooldown: 5,
  role: 0,
  hasPrefix: true,
  aliases: ["game"],
  description: "Balance",
  usage: "{pref}[name of cmd]",
  credits: "Ainz"
};

module.exports.run = async function({ api, event, args, Currencies, Utils }) {
  const { getData } = Currencies;
  const { senderID, threadID } = event;

  const money = await getData(senderID);
  const moneyBalUser = money.money;
  const nameOfUser = money.name;
 
  const i = await api.sendMessage('🌀 Loading.', threadID);
  
  await Utils.delay(1000);
  api.editMessage(`🌠 Hi ${nameOfUser}`, i.messageID);

  await Utils.delay(1000);
  api.editMessage(`🌠 Hi ${nameOfUser} Yo`, i.messageID);

  await Utils.delay(1000);
  api.editMessage(`🌠 Hi ${nameOfUser} Your bala`, i.messageID);
  
  await Utils.delay(1000);
  api.editMessage(`🌠 Hi ${nameOfUser} Your balance is`, i.messageID);
  
  await Utils.delay(1000);
  api.editMessage(`🌠 Hi ${nameOfUser} Your balance is ${moneyBalUser}`, i.messageID);
};
