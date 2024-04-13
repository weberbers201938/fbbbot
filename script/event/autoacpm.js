const fs = require('fs-extra');
const pathFile = './txt/auto.txt';

module.exports.config = {
  name: "autoacpm",
  version: "1.0.0"
};

module.exports.handleEvent = async ({ api, event, args, admin, prefix, botName}) => {
let timestamp;
const nowTime = Date.now();
let callbackMS
if (!fs.existsSync(pathFile))
   fs.writeFileSync(pathFile, 'false');
   const isEnable = fs.readFileSync(pathFile, 'utf-8');
   if (isEnable == 'true') {
      const list = [ 
        ...(await api.getThreadList(1, null, ['PENDING'])), 
        ...(await api.getThreadList(1, null, ['OTHER'])) 
      ];
          if (list[0]) {
api.changeNickname(`${prefix} | ${botName}`, list[0].threadID, api.getCurrentUserID());
         api.sendMessage("Connecting...", list[0].threadID, (err, info) => {
                timestamp = info.timestamp;
                callbackMS = Date.now();
              });
              await new Promise(resolve => setTimeout(resolve, 3000));
              const latency = timestamp - nowTime;
              const callbackTime = callbackMS - nowTime;
   
      await api.sendMessage(`🌟 This thread is automatically approved by our system, Enjoy!\n\n╭───❒Accepting Thread Connection:\n│─ Status: Online\n│─ Botname: ${botName}\n│─ Owner:\n│─https://facebook.com/${admin[0]}\n│─ Prefix: ${prefix}\n╰───────────𖤓\n╭───❒Checking Ping:\n│─ Latency: Input = ${latency} ms\n│─ Callback = ${callbackTime} ms\n│─ Input & Callback Difference: ${callbackTime - latency} ms\n│─ Use ${prefix}help to view command details\n╰───────────𖤓`, list[0].threadID);
          }
    }
};
