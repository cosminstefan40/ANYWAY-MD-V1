const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMFBheTdpYnlzengvbjFDWThjbzhrMVdnSUs4VXJzNGdBaE5ybjcrQlNYST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNUZzYmNqa20zYXhoVm0vWkltbzJaR0QrTW5DVm9sc3NTMnl3L0xEWkJ5cz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1SW4rRlFQNFhpcUFMMTNzRTNBT0hMdlczbkNtWlFaSW9xZ1ZMNUlSZldVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2bmgxbFJvcTE4RW9uZHRmRTVTVGp1bWJJQTgvMVFuMFlBWGg2cGo4d25RPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFCbVpxS3AvKzJCRzFVWTQrWEdtVkwvYVZzZ21NbnBvWUNZNStoTHRJRkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikdma2Y0TFZxL0hiWUhmc2JYT0NaSlpneEdrOXprcXlJWUgwdXpOYUJ1UTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK05ab2FsNW1zdzBhcUpFMHZRYjBYZ2IrbDdZRjJxNmRIYlMydWtNbFZtQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVGpZbFpaeHlRbmhIVDBUdFhYZWtqT2NYd2VjbzZyZ1ZhSzQ4UVhqZkEzYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjgrVE9Fa2paZTEyV1pDNEpUdzdFZENIeStkdTdpNVd3bnBhWGVZbnFGQlZwNGViYnNCZWM3Y2UvbWxJYWV5V0lVcVZEM2JpVWtmUUEwcHczTFZqVGpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg5LCJhZHZTZWNyZXRLZXkiOiJEaXZ3VGVkZjA4bVBsa0FMMHN3WEpIbU5YdzErSDVqZGFFYzFhck9WTUJBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjQwNzcwODExOTI5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjU2MkNGODM2N0I3NjUzNDAzNkRDQ0Y5OEIwNDJDQkMwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzM3NDIwMDF9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Im41VUJ3WEN1VENXSHJxVlBXYm1WbGciLCJwaG9uZUlkIjoiMTUxNGRjZmQtNDcyMi00YjczLThiNDctMDU4ZDViMmE1YmU1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRDR1dIaFNWbXVxTWpydXhjNG9wbXE4UUpFZz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUTndBTTZPdFNIcGNNeUM4aFpSNmxSb1pGL2c9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUkIxMUxMOTQiLCJtZSI6eyJpZCI6IjQwNzcwODExOTI5Ojk2QHMud2hhdHNhcHAubmV0IiwibmFtZSI6ImFub25pbSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTkw5ejVVRkVLS2IyN29HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWW5adm5HTTdzNGFlejRieTZ3dmpVMXFYSExGcWxFRHIzMkpTOUN2SHNrbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiMThPM0JiQmVESzhGcVo0eThraHZxUXREcU9VcWZTQU10YW5yVkZLcjViS045QlBYUUhOU1hrVFVpTitlYXhtaS80ZGY4SzREYjVXTlhlTHNLc0VsQlE9PSIsImRldmljZVNpZ25hdHVyZSI6IjZEWUo3VmtLK2dCcWR6Q3JZY1RSQURQeXZKWnZvWnVpSUtzUFIzU1pobEFRWVk5MW9EbTk4QjdhcXZyTXZYQnVlVnozbFk1R0d2OVFaZEFtVnJNampRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDA3NzA4MTE5Mjk6OTZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV0oyYjV4ak83T0ducytHOHVzTDQxTmFseHl4YXBSQTY5OWlVdlFyeDdKSyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMzc0MTk5OSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFEZEIifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "ANONIM",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "0770811929",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANYWAY_MD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
