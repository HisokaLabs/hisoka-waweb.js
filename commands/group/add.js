const util = require("util")
const { jsonformat } = require("../../lib/Function")

module.exports = {
    name: "add",
    alias: ["undang","culik"],
    desc: "Add User From Group",
    type: "group",
    example: "Example : %prefix%command <tag>. <tag> = @62xxx",
    start: async(hisoka, m, { quoted, text, participants }) => {
        let chat = await m.getChat()
        let _participants = participants.map(v => v.id._serialized)
        let users = (await Promise.all(
            text.split(",")
            .filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + 'c.us'))
            .map(async v => [
                v,
                await hisoka.isRegisteredUser(v + '@c.us')
            ])
        )).filter(v => v[1]).map(v => v[0] + '@c.us')
        chat.addParticipants(users).then((res) => {
            m.reply(jsonformat(res))
        }).catch((err) => {
            m.reply(jsonformat(err))
        })
    },
    isGroup: true,
    isAdmin: true
}
