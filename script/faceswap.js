const path = require('path');
const { Prodia } = require("prodia.js");
const axios = require('axios');
const fs = require('fs-extra');
const prodia = new Prodia("56df02d2-eecf-4f9d-b9b6-11b68078a14b");

module.exports.config = {
  name: "faceswap",
  version: "1.0.0",
  cooldown: 5,
  role: 0,
  hasPrefix: false,
  aliases: [''],
  description: "this command may help you to swap the face on the image",
  usage: "reply to an image and type [name of cmd]",
  credits: "Berwin"
};

module.exports.run = async ({ api, event }) => {
  
  try {
   if (event.type == "message_reply") {

   if (event.messageReply.attachments.length < 0) return api.sendMessage("💢 No image found.", event.threadID, event.messageID);

   if (event.messageReply.attachments[0].type !== "photo") return api.sendMessage("💢 Only image can be converted.", event.threadID, event.messageID);

   url = event.messageReply.attachments[0].url;

   if (event.messageReply.attachments.lengt > 2) return api.sendMessage("💢 Only 2 image can be converted.", event.threadID, event.messageID);

   url = event.messageReply.attachments[0].url
   url1 = event.messageReply.attachments[1].url
   
    const generate = await prodia.faceSwap({
    
      sourceUrl: encodeURI(url),
    
      targetUrl: encodeURI(url1),
    
    });
   
    while (generate.status !== "succeeded" && generate.status !== "failed") {
      
    new Promise((resolve) => setTimeout(resolve, 250));
    
    const job = await prodia.getJob(generate.job);
    
    if (job.status === "succeeded") {
    
    let img = (await axios.get(job.imageUrl, { responseType: "arraybuffer" })).data;
    
    const picPath = '/cache/swapface.png'
    const paths = path.join(__dirname, picPath);
    
    fs.writeFileSync(paths, Buffer.from(img, "utf-8"));  
    
    api.sendMessage({
        body: "🌟 Swapping Face Success!",
        attachment: fs.createReadStream(paths)
      }, threadID, () => fs.unlinkSync(paths), event.threadID, event.messageID);
       }
     }
   } else {
     return api.sendMessage('Hi please reply to an image! 🖼')
   }
  } catch(error) {
    api.sendMessage(error, event.threadID, event.messageID);
    console.error(error)
  }
}
