const fs = require("fs")
const wa = require("whatsapp-web.js")
const util = require("util")


module.exports = {
    name: "eval",
    alias: [">",">>","=>"],
    desc: "Running JavaScript Code via Command",
    type: "owner",
    start: async (hisoka, m, opt) => {
        let evaled
        let { name, body, from, isMedia, type, sender, prefix, command, commands, args, isOwner, text, quoted, mime, isGroup, metadata, groupName, participants, groupAdmins, isBotAdmin, isAdmin, toUpper, Function } = opt
        try {
            if (text.endsWith("--sync")) {
                evaled = await eval(`(async () => { ${text.trim.replace("--sync", "")} })`)
                return m.reply(evaled)
            }
            evaled = await eval(text)
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled)
            await m.reply(evaled)
        } catch (e) {
            m.reply(util.format(e))
        }
    },
    isOwner: true
}
