const { Prodia } = require("prodia.js");

const prodia = Prodia("56df02d2-eecf-4f9d-b9b6-11b68078a14b");

module.exports.config = {
  name: "faceswap",
  version: "1.0.0",
  cooldown: 5,
  role: 0,
  hasPrefix: false,
  aliases: [''],
  description: "This command may help you to swap the face on the image",
  usage: "Reply to an image and type [name of cmd]",
  credits: "Berwin"
};

module.exports.run = async ({ api, event }) => {
  try {
    const path = require('path');
    const axios = require('axios');
    const fs = require('fs-extra');
    
    if (event.type === "message_reply") {
      if (event.messageReply.attachments.length === 0) return api.sendMessage("💢 No image found.", event.threadID, event.messageID);
      
      if (event.messageReply.attachments[0].type !== "photo") return api.sendMessage("💢 Only image can be converted.", event.threadID, event.messageID);

      if (event.messageReply.attachments.length > 2) return api.sendMessage("💢 Only 2 images can be converted.", event.threadID, event.messageID);

      const sourceUrl = event.messageReply.attachments[0].url;
      const targetUrl = event.messageReply.attachments[1].url;

      const input = async ({ sourceUrl, targetUrl }) => {
        try {
          const result = await prodia.faceSwap({
            sourceUrl,
            targetUrl,
          });
          
          const finalResult = await prodia.wait(result);
          return finalResult;
        } catch (error) {
          console.error("Error:", error);
          throw error;
        }
      };

      const generatedImage = await input({ sourceUrl, targetUrl });

      if (generatedImage.status === "succeeded") {
        const img = (await axios.get(generatedImage.imageUrl, { responseType: "arraybuffer" })).data;
        const picPath = '/cache/swapface.png';
        const paths = path.join(__dirname, picPath);
        
        fs.writeFileSync(paths, Buffer.from(img, "utf-8"));  

        api.sendMessage({
          body: "🌟 Swapping Face Success!",
          attachment: fs.createReadStream(paths)
        }, event.threadID, () => fs.unlinkSync(paths), event.messageID);
      } else {
        api.sendMessage("💢 Face swapping failed.", event.threadID, event.messageID);
      }
    } else {
      api.sendMessage('Hi, please reply to an image! 🖼', event.threadID, event.messageID);
    }
  } catch(error) {
    api.sendMessage(error.toString(), event.threadID, event.messageID);
    console.error(error);
  }
}
