const util = require("util")
const { jsonformat } = require("../../lib/Function")

module.exports = {
    name: "restrict",
    alias: ["editinfo"],
    desc: "Set Restrict Group",
    type: "group",
    example: "List Option :\n\n1. open\n2. close\n3.buka\n4. tutup\n\nExample : %prefix%command buka",
    start: async(hisoka, m, { text, args }) => {
        let chat = await m.getChat()
        switch(text.toLowerCase()) {
            case "buka":
            case "open":
            case "1":
            case "yes":
            case "true":
                chat.setInfoAdminsOnly(false).then((res) => {
                    m.reply(jsonformat(res))
                }).catch((err) => {
                    m.reply(jsonformat(err))
                })
            break
            case "close":
            case "tutup":
            case "0":
            case "no":
            case "false":
                chat.setInfoAdminsOnly(true).then((res) => {
                    m.reply(jsonformat(res))
                }).catch((err) => {
                    m.reply(jsonformat(err))
                })
            break
        }
    },
    isGroup: true,
    isQuery: true,
    isAdmin: true
}