let isEnable = true; // Activating auto approval feature

// Track processed threads to prevent double sending
const processedThreads = new Set();

module.exports.config = {
  name: "autoacpm",
  version: "1.0.0"
};

module.exports.handleEvent = async ({ api, admin, prefix, botName }) => {
  let timestamp;
  const nowTime = Date.now();
  let callbackMS;

  if (!isEnable) return; // Check if auto approval is enabled

  const list = [
    ...(await api.getThreadList(1, null, ['PENDING'])),
    ...(await api.getThreadList(1, null, ['OTHER']))
  ];

  for (const thread of list) {
    if (processedThreads.has(thread.threadID)) continue; // Skip if already processed

    api.changeNickname(`${prefix} | ${botName}`, thread.threadID, api.getCurrentUserID());
    api.sendMessage("Connecting...", thread.threadID, (err, info) => {
      timestamp = info.timestamp;
      callbackMS = Date.now();
    });

    await new Promise(resolve => setTimeout(resolve, 3000));
    const latency = timestamp - nowTime;
    const callbackTime = callbackMS - nowTime;

    await api.sendMessage(`🌟 This thread is automatically approved by our system, Enjoy!\n\n╭───❒Accepting Thread Connection:\n│─ Status: Online\n│─ Botname: ${botName}\n│─ Owner:\n│─https://facebook.com/${admin[0]}\n│─ Prefix: ${prefix}\n╰───────────𖤓\n╭───❒Checking Ping:\n│─ Latency: Input = ${latency} ms\n│─ Callback = ${callbackTime} ms\n│─ Input & Callback Difference: ${callbackTime - latency} ms\n│─ Use ${prefix}help to view command details\n╰───────────𖤓`, thread.threadID);

    // Add the thread to processedThreads
    processedThreads.add(thread.threadID);
  }
};
