const axios = require('axios');
const fs = require('fs');

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
  
  const query = args.join(' ');
  
  if (!query) {
    api.sendMessage('Please use this command correctly: ai<space><sentence>');
    return;
  };
  
  try {
    
    var prompt = {
      prompt: query
    };
    
    var headers = {
      headers: "Content-Type": " application/json"
    };
    
    const edit = await api.sendMessage('[🕐] Getting response', event.threadID);
    
    await Utils.delay(1000);
    api.editMessage('[🕑] Getting response', edit.messageID);
    
    await Utils.delay(1000);
    api.editMessage('[🕒] Getting response', edit.messageID);
    
    await Utils.delay(1000);
    api.editMessage('[🕓] Getting response', edit.messageID);
    
    await Utils.delay(1000);
    api.editMessage('[🕔] Getting response', edit.messageID);
    
    await Utils.delay(1000);
    api.editMessage('[🕕] Getting response');
    
    const api_url = `http://eu4.diresnode.com:3763/gemini`
    const response = axios.post(api_url, prompt, headers);
    
    const response_text = response.data.candidates[0].text;
    const response_image = response.data.candidates[0].generated_images[0];
    
    const imgs = (await axios.get(response_image, { responseType: "arraybuffer" })).data;
    
    const paths_image = __dirname + `/cache/generated_images.jpg`;
    
    fs.writeFileSync(paths_image, Buffer.from(imgs, 'utf-8'));

    api.sendMessage({
        body: response_text,
        attachment: fs.createReadStream(paths_image)
      }, event.threadID, () => fs.unlinkSync(paths_image), event.messageID);
    
  } catch(error) {
    api.sendMessage(`🚫 Error Processing Response: ${error}`, threadID, messageID);
  }
};
