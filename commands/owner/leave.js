const util = require("util")

module.exports = {
    name: "leave",
    alias: ["metu","keluar"],
    desc: "Leave From Group",
    type: "owner",
    start: async(hisoka, m) => {
        let chat = await m.getChat()
        if (chat.isGroup) {
            await chat.leave().then((res) => {
                m.reply(util.format(res))
            }).catch((err) => {
                m.reply(util.format(err))
            })
        } else {
            m.reply("This Feature Only Group")
        }
    },
    isAdmin: true
}