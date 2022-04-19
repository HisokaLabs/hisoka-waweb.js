const moment = require("moment-timezone")
const { MessageMedia } = require("whatsapp-web.js")
const { parseMention } = require("../../lib/Function")

module.exports = {
    name: "inspect",
    alias: ["inspeksi"],
    desc: "Get Detail Group From Link",
    type: "tool",
    example: "Example : %prefix%command https://chat.whatsapp.com/FpT8DgKeaINLtS1UVwuXMk",
    start: async(hisoka, m, { text }) => {
        let linkRegex = /chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
        let [, code] = text.match(linkRegex) || {}
        if (!code) return m.reply("Link Invalid")
        let res = await hisoka.getInviteInfo(code)
        if (!res) return m.reply(String(res))
        let teks = `
    「 Group Link Inspector 」

⬡ *ID :* ${res.id._serialized}
⬡ *Restrict :* ${res.restrict}
⬡ *Announce :* ${res.announce}
⬡ *Subject :* ${res.subject}
⬡ *Subject Update By :* @${res.subjectOwner._serialized.split("@")[0]}
⬡ *Subject Update At :* ${moment(res.subjectTime * 1000).tz("Asia/Jakarta").format("DD-MM-YYYY, HH:MM:SS")}
⬡ *Owner Group :* ${res.owner._serialized}
⬡ *Create Group At :* ${moment(res.creation * 1000).tz("Asia/Jakarta").format("DD-MM-YYYY, HH:MM:SS")}
⬡ *Members Length :* ${res.size}
⬡ *Desc ID :* ${res.descId}
⬡ *Desc Update By :* @${res.descOwner._serialized.split("@")[0]}
⬡ *Desc Update At :* ${moment(res.descTime * 1000).tz("Asia/Jakarta").format("DD-MM-YYYY, HH:MM:SS")}
⬡ *Description :*\n${res.desc}
⬡ *Friends Who Are Known to Join :*\n${res.participants ? res.participants.map((user, i) => ++i + ". @" + user.id._serialized.split("@")[0]).join("\n").trim() : "Not Found"}
        `
        let mentions = []
        let id = parseMention(teks)
        for (let i of id) mentions.push(await hisoka.getContactById(i))
        let pp
        try {
            pp = await hisoka.getProfilePicUrl(res.id._serialized) || 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
        } catch {
            pp = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
        }
        let media = await MessageMedia.fromUrl(pp)
        hisoka.sendMessage(m.from, media, { caption: teks, mentions, quotedMessageId: m.id._serialized })
    },
    isQuery: true
}