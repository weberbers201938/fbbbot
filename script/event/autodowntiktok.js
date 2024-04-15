const fs = require('fs-extra');
const axios = require("axios");

let isEnable = true; // Activate the functionality

module.exports.config = {
  name: "autodowntiktok",
  version: "2.0.0"
};

module.exports.handleEvent = async ({ api, event }) => {
  try {
    const regEx_tiktok = /https:\/\/(www\.|vt\.)?tiktok\.com\//;
    const link = event?.body;
    
    if (isEnable && regEx_tiktok.test(link)) {
      const response = await axios.post(`https://www.tikwm.com/api/`, { url: link });
      const data = response.data.data;
      
      const videoStream = await axios.get(data.play, { responseType: 'stream' });
      
      const fileName = `TikTok-${Date.now()}.mp4`;
      const filePath = `./${fileName}`;
      const videoFile = fs.createWriteStream(filePath);
      
      videoStream.data.pipe(videoFile);
      
      videoFile.on('finish', () => {
        console.log('Downloaded video file.');
        sendVideoMessage(api, event, data, filePath);
      });
    }
  } catch (error) {
    handleDownloadError(api, event, error);
  }
};

function sendVideoMessage(api, event, data, filePath) {
  api.sendMessage({
    body: `𝖠𝗎𝗍𝗈 𝖣𝗈𝗐𝗇 𝖳𝗂𝗄𝖳𝗈𝗄 \n\n𝙲𝚘𝚗𝚝𝚎𝚗𝚝: ${data.title}\n\n𝙻𝚒𝚔𝚎𝚜: ${data.digg_count}\n\n𝙲𝚘𝚖𝚖𝚎𝚗𝚝𝚜: ${data.comment_count}\n`,
    attachment: fs.createReadStream(filePath)
  }, event.threadID, () => {
    fs.unlinkSync(filePath);  // Delete the video file after sending it
  });
}

function handleDownloadError(api, event, error) {
  console.error('Error when trying to download the TikTok video:', error.message);
  api.sendMessage(`Error when trying to download the TikTok video: ${error.message}`, event.threadID, event.messageID);
}
