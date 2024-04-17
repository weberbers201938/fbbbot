const axios = require('axios');

module.exports.config = {
  name: "ai",
  version: "1.0.0",
  cooldown: 1,
  role: 0,
  hasPrefix: false,
  aliases: ['gemini'],
  description: "This command will help you to answer all your questions with continues conversations",
  usage: "[name of cmd] [query]",
  credits: "Ainz"
};

module.exports.run = async ({ api, event, args, Utils}) => {
  const a = args.join(' ') || 'hello', b = event.senderID;
  function output(msg){
    api.sendMessage(msg, event.threadID)
}

  function edit(msg_edit){
    api.editMessage(msg_edit)
  }
  
  try {
    const api_url = `https://secretdevsxyz.onrender.com/gemini?p=${a}&id=${b}`
    const c = axios.post(api_url);
    const d = c.data;
    const e = d.response;
    
    const f = await output('🕒 Loading..');
    
    await Utils.delay(2000);
    edit(e, f.messageID)
  } catch(error) {
    output(error)
  }
};
