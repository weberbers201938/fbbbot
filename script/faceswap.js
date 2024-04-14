const path = require('path');
const { Prodia } = require("prodia.js");

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
    const url1 = event.messageReply.attachments[0].url;
    const url2 = event.messageReply.attachments[1].url;
    if (!url1 || !url2) {
      api.sendMessage('Hi please reply to a image to swap the face!', event.threadID, event.messageID);
      return;
    };
   
    const { faceSwap, wait } = Prodia("56df02d2-eecf-4f9d-b9b6-11b68078a14b");
    const result = await faceSwap({ url1, url2 });
    const swappedImage = wait(result);
    
    const picPath = '/cache/swapface.jpg'
    const paths = path.join(__dirname, picPath);
    
    const img = (swappedImage, { responseType: "arraybuffer" }).data;
    
    fs.writeFileSync(paths, Buffer.from(img, "utf-8"));  
    
    api.sendMessage({
        body: "Swapping Face Success!",
        attachment: fs.createReadStream(paths)
      }, threadID, () => fs.unlinkSync(paths), event.threadID, event.messageID);
  } catch(error) {
    api.sendMessage(error, event.threadID, event.messageID);
    consolr.error(error)
  }
}
