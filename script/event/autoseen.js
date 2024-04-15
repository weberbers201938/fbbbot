let isAutoSeenEnabled = false;

module.exports.config = {
  name: "autoseen",
  version: "1.0.0"
};

module.exports.handleEvent = async ({ api, event, args }) => {
  if (isAutoSeenEnabled) {
    api.markAsReadAll(() => {});
  }
};

// Function to enable auto seen
module.exports.enableAutoSeen = () => {
  isAutoSeenEnabled = true;
};

// Function to disable auto seen
module.exports.disableAutoSeen = () => {
  isAutoSeenEnabled = false;
};

// Enable auto seen
module.exports.enableAutoSeen();
