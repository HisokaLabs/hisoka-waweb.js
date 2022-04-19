module.exports = {
    name: "linkgroup",
    alias: ["linkgc","linkinvite"],
    desc: "Get Link Group",
    type: "group",
    start: async(hisoka, m) => {
        let chat = await m.getChat()
        if (chat.isGroup) {
            let link = await chat.getInviteCode()
            hisoka.sendMessage(m.from, `https://chat.whatsapp.com/${link}\n\nLink Group : ${chat.groupMetadata.name}`, { linkPreview: true })
        } else {
            m.reply("This Feature Only Group")
        }
    }
}