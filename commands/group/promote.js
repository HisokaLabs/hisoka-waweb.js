const util = require("util")
const { jsonformat } = require("../../lib/Function")


module.exports = {
    name: "promote",
    alias: ["admin"],
    desc: "Make Admin User from Group",
    type: "group",
    example: "Example : %prefix%command <tag>. <tag> = @62xxx",
    start: async(hisoka, m, { participants }) => {
        let chat = await m.getChat()
        let members = participants.filter(v => !v.isAdmin).map(v => v.id._serialized)
        let users = m.mentionedIds.filter(v => members.includes(v))
        for (let user of users) chat.promoteParticipants([user]).then((res) => {
            m.reply(jsonformat(res))
        }).catch((err) => {
            m.reply(jsonformat(err))
        })
    },
    isGroup: true,
    isAdmin: true
}