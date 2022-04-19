const util = require("util")
const { jsonformat } = require("../../lib/Function")

module.exports = {
    name: "setdesc",
    alias: ["setdescription"],
    desc: "Change Description From Group",
    type: "group",
    example: "Example : %prefix%command <desc>",
    start: async(hisoka, m, { text }) => {
        let chat = await m.getChat()
        chat.setDescription(text).then((res) => {
            m.reply(jsonformat(res))
        }).catch((err) => {
            m.reply(jsonformat(err))
        })
    },
    isQuery: true,
    isGroup: true,
    isAdmin: true
}