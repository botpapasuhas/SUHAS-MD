
const {cmd , commands} = require('../command')
const { fetchJson } = require('../lib/functions')

const apilink = 'https://www.dark-yasiya-api.site'

cmd({
    pattern: "xvsearch",
    desc: "search xvideos",
    category: "search",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {


const workGrp = config.XVDL_JID
let code = await conn.groupInviteCode('120363370870982845@g.us')
if(!workGrp.includes(from)) return reply(`*_Can't use xvsearch cmd in this group.If you want to search xvideos, join this group :_* https://chat.whatsapp.com/${code}`)

let dt = `*_INFINITY WA BOT XVIDEO SEARCH 🔎_*\n\n`
let cap = `\n\n> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

if(!q) return reply("*_Please give me a text._*")

const xv = await fetchJson(`${apilink}/search/xvideo?text=${q}`)

const array = xv.result;
        
if (!array || array.length === 0) {
            return reply("*_Can't find anything._*");
        }

const result = array.map((xvideo, index) => `${index + 1}. *Title :* ${array[index].title}\n*Duration :* ${array[index].duration}\n*Link :* ${array[index].url}`).join("\n\n");

let inf = await conn.sendMessage(from, { text: `${dt} ${result} ${cap}` }, {quoted: mek})

//=======================================================================

conn.ev.on('messages.upsert', async (msgUpdate) => {
            let msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            let selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === inf.key.id) {

		    let index = parseInt(selectedOption)

        let xv = await fetchJson(`${apilink}/download/xvideo?url=${array[index - 1].url}`)

let xvdlink = xv.result.dl_link

        if (!xvdlink) {
            return reply("*_Can't download your video._*");
        }

let msg = `*_INFINITY WA BOT XVIDEO DOWNLOADER 📥_*

┌───────────────────
├ ℹ️ *Title:* ${xv.result.title}
├ 👁️‍🗨️ *Views:* ${xv.result.views}
├ 👍 *Likes:* ${xv.result.like}
├ 🖇️ *Url:* ${array[index - 1].url}
└───────────────────

🔢 Reply Below Number :

1 || Video
2 || Document

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

let send = await conn.sendMessage(from,{image:{url: xv.result.image},caption:msg},{quoted:mek})

conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === send.key.id) {
                switch (selectedOption) {
                    case '1':

await conn.sendMessage(from,{video: {url: xvdlink },mimetype:"video/mp4",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted: send})

                        break; 
                    case '2':

await conn.sendMessage(from,{document: {url: xvdlink },mimetype:"video/mp4",fileName: xv.result.title + ".mp4",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted: send})
                        
                        break;
                    default:
                        reply("*_Invalid number.Please reply a valid number._*")
				
}
}
})
}
})
//=======================================================================
        
}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "xvideo",
    desc: "download xvideos",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {


const workGrp = config.XVDL_JID
let code = await conn.groupInviteCode('120363370870982845@g.us')
if(!workGrp.includes(from)) return reply(`*_Can't use xvideo cmd in this group.If you want to download xvideos, join this group :_* https://chat.whatsapp.com/${code}`)

if(q.startsWith("https://www.xvideos.com/")) {

let xv = await fetchJson(`${apilink}/download/xvideo?url=${q}`)

let xvdlink = xv.result.dl_link

        if (!xvdlink) {
            return reply("*_Can't download your video._*");
        }

let msg = `*_INFINITY WA BOT XVIDEO DOWNLOADER 📥_*

┌───────────────────
├ ℹ️ *Title:* ${xv.result.title}
├ 👁️‍🗨️ *Views:* ${xv.result.views}
├ 👍 *Likes:* ${xv.result.like}
├ 🖇️ *Url:* ${q}
└───────────────────

🔢 Reply Below Number :

1 || Video
2 || Document

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

let send = await conn.sendMessage(from,{image:{url: xv.result.image},caption:msg},{quoted:mek})
        
conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === send.key.id) {
                switch (selectedOption) {
                    case '1':

await conn.sendMessage(from,{video: {url: xvdlink },mimetype:"video/mp4",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted: send})

                        break; 
                    case '2':

await conn.sendMessage(from,{document: {url: xvdlink },mimetype:"video/mp4",fileName: xv.result.title + ".mp4",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted: send})
                        
                        break;
                    default:
                        reply("*_Invalid number.Please reply a valid number._*");
                }

            }
        })

} else if (!q.startsWith("https://")) {

let xvs = await fetchJson(`${apilink}/search/xvideo?text=${q}`)

if (!xvs) {
            return reply("*_Can't find anything._*");
        }

let xvUrl = xvs.result[0].url

let xv = await fetchJson(`${apilink}/download/xvideo?url=${xvUrl}`)

let xvdlink = xv.result.dl_link

        if (!xvdlink) {
            return reply("*_Can't download your video._*");
        }

let msg = `*_INFINITY WA BOT XVIDEO DOWNLOADER 📥_*

┌───────────────────
├ ℹ️ *Title:* ${xv.result.title}
├ 👁️‍🗨️ *Views:* ${xv.result.views}
├ 👍 *Likes:* ${xv.result.like}
├ 🖇️ *Url:* ${xvUrl}
└───────────────────

🔢 Reply Below Number :

1 || Video
2 || Document

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

let sendd = await conn.sendMessage(from,{image:{url: xv.result.image},caption:msg},{quoted:mek})
        
conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === sendd.key.id) {
                switch (selectedOption) {
                    case '1':

await conn.sendMessage(from,{video: {url: xvdlink },mimetype:"video/mp4",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted: sendd})

                        break; 
                    case '2':

await conn.sendMessage(from,{document: {url: xvdlink },mimetype:"video/mp4",fileName: xv.result.title + ".mp4",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted: sendd})
                        
                        break;
                    default:
                        reply("*_Invalid number.Please reply a valid number._*");
                }

            }
        })

} else if(!q){
return reply("*_Please give me a text or xvideos.com url._*")
}
}catch(e){
console.log(e)
reply(`${e}`)

}
})

cmd({
    pattern: "phub",
    desc: "Download phub videos",
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {


const workGrp = config.XVDL_JID
let code = await conn.groupInviteCode('120363370870982845@g.us')
if(!workGrp.includes(from)) return reply(`*_Can't use phub cmd in this group.If you want to download pornhub.com videos, join this group :_* https://chat.whatsapp.com/${code}`)

if(!q && !q.startsWith('https://www.pornhub.com/')) return reply(`*_Please give me a pornhub.com url._*`)

let ph = await fetchJson(`${apilink}/download/phub?url=${q}`)

let phdlink = ph.result.format

        if (phdlink.length < 1) {
            return reply("*_Can't download your video._*")
        }

const dlLinksV = phdlink.map((link, index) => {
            return `1.${index + 1} || ${link.resolution}p` 
        }).join("\n")

const dlLinksD = phdlink.map((link, index) => {
            return `2.${index + 1} || ${link.resolution}p` 
        }).join("\n")

let q240 = phdlink.filter((link) => link.resolution.includes("240"))
let q480 = phdlink.filter((link) => link.resolution.includes("480"))
let q720 = phdlink.filter((link) => link.resolution.includes("720"))
let q1080 = phdlink.filter((link) => link.resolution.includes("1080"))

let msg = `*_INFINITY WA BOT PORNHUB DOWNLOADER 📥_*

┌───────────────────
├ ℹ️ *Title :* ${ph.result.video_title}
├ 👤 *Author :* ${ph.result.video_uploader}
├ 🖇️ *Url :* ${ph.result.original_url}
└───────────────────

🔢 Reply Below Number :

_Video_

${dlLinksV}

_Document_

${dlLinksD}

> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ꜱᴀᴅᴀʀᴜ`

let send = await conn.sendMessage(from,{image:{url: ph.result.video_cover},caption:msg},{quoted:mek})

conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === send.key.id) {
                switch (selectedOption) {
                    case '1.1':

await conn.sendMessage(from,{video: {url: q240[0].download_url },mimetype:"video/mp4",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted: send})

                        break;
                    case '1.2':

await conn.sendMessage(from,{video: {url: q480[0].download_url },mimetype:"video/mp4",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted: send})

                        break;
                    case '1.3':

await conn.sendMessage(from,{video: {url: q720[0].download_url },mimetype:"video/mp4",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted: send})

                        break;
                    case '1.4':

await conn.sendMessage(from,{video: {url: q1080[0].download_url },mimetype:"video/mp4",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted: send})

                        break;
                    case '2.1':

await conn.sendMessage(from,{document: {url: q240[0].download_url },mimetype:"video/mp4",fileName: ph.result.video_title + ".mp4",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted: send})
                        
                        break;
                    case '2.2':

await conn.sendMessage(from,{document: {url: q480[0].download_url },mimetype:"video/mp4",fileName: ph.result.video_title + ".mp4",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted: send})

                        break;
                    case '2.3':

await conn.sendMessage(from,{document: {url: q720[0].download_url },mimetype:"video/mp4",fileName: ph.result.video_title + ".mp4",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted: send})
                        break;
                    case '2.4':

await conn.sendMessage(from,{document: {url: q1080[0].download_url },mimetype:"video/mp4",fileName: ph.result.video_title + ".mp4",caption:"> ɪɴꜰɪɴɪᴛʏ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ"},{quoted: send})
                        break;

                    default:
                        reply("*_Invalid number.Please reply a valid number._*")
}
}
})

}catch(e){
console.log(e)
reply(`${e}`)
}
})
