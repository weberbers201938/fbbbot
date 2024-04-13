const fs = require('fs-extra');
const pathFile = 'txt/autoseen.txt';

module.exports.config = {
  name: "autoseen",
  version: "1.0.0"

};

module.exports.handleEvent = async ({ api, event, args }) => {
if (!fs.existsSync(pathFile))
   fs.writeFileSync(pathFile, 'false');
   const isEnable = fs.readFileSync(pathFile, 'utf-8');
   if (isEnable == 'true')
     api.markAsReadAll(() => {});
};
