module.exports.config = {
  name: "edit",
  version: "1.0.0",
  cooldown: 5,
  role: 0,
  hasPrefix: false,
  aliases: [''],
  description: "this command may help you to edit the message of bot",
  usage: "{pref}[name of cmd] [query]",
  credits: "Developer"
};

module.exports.run = async function({ api, event, args }) {
  const reply = event.messageReply.body;
  const edit = `${args.join(" ")}`;
  
  if (!reply || !args || args.length === 0) {
    api.sendMessage("Invalid input. Please reply to a bot message to edit.", event.threadID, event.messageID);
    return;
  }

  try {
    await api.editMessage(`${edit}`, event.messageReply.messageID);
    api.setMessageReaction('✅', event.messageID, () => {}, true);
  } catch (error) {
    console.error("Error editing message", error);
    api.sendMessage("An error occurred while editing the message. Please try again later.", event.threadID);
  }
};
