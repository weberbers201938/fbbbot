const axios = require('axios');
const fs = require('fs');

module.exports.config = {
  name: "ai",
  version: "1.0.0",
  cooldown: 1,
  role: 0,
  hasPrefix: false,
  aliases: ['gemini'],
  description: "This command will help you to answer all your questions with continuous conversations",
  usage: "[name of cmd] [query]",
  credits: "Ainz"
};

module.exports.run = async ({ api, event, args, Utils}) => {
  
  const query = args.join(' ');
  
  if (!query) {
    api.sendMessage('Please use this command correctly: ai <sentence>', event.threadID);
    return;
  }
  
  try {
    const prompt = {
      prompt: query
    };
    
    const headers = {
      "Content-Type": "application/json"
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
    api.editMessage('[🕕] Getting response', edit.messageID);
    
    const api_url = `http://eu4.diresnode.com:3763/gemini`;
    const response = await axios.post(api_url, prompt, { headers });
    
    const response_text = response.data.candidates[0].text;
    const response_image = response.data.candidates[0].generated_images[0];
    
    const imageResponse = await axios.get(response_image, { responseType: "arraybuffer" });
    const imagePath = __dirname + `/cache/generated_images.jpg`;
    fs.writeFileSync(imagePath, Buffer.from(imageResponse.data, 'binary'));

    api.sendMessage({
        body: response_text,
        attachment: fs.createReadStream(imagePath)
      }, event.threadID, () => fs.unlinkSync(imagePath));
    
  } catch(error) {
    console.error("Error Processing Response:", error);
    api.sendMessage(`🚫 Error Processing Response: ${error}`, event.threadID);
  }
};
