module.exports = {
    name: "caripesan",
    alias: ["searchmsg"],
    desc: "Search Message From Chat",
    type: "tool",
    example: "Example : %prefix%command <query>, limit",
    start: async(hisoka, m, { text }) => {
        let [text1, text2] = text.split`,`
        let fetch = await hisoka.searchMessages(text1, { page: 1, limit: text2 || null, chatId: m.from })
        let total = fetch.length
        let sp = total < Number(text2) ? `Hanya Ditemukan ${total} Pesan` : `Ditemukan ${total} pesan`
        m.reply(sp)

        fetch.map(async ({ id }) => {
            let { remote: remoteJid, _serialized: serial } = id
            hisoka.sendMessage(m.from, "Nih Pesannya", { quotedMessageId: serial })
        })
    },
    isQuery: true
}
