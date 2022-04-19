module.exports = {
    name: "sticker",
    alias: ["stiker","setiker","sgif","s"],
    desc: "Convert Image or Video To Sticker",
    type: "convert",
    start: async(hisoka, m, { mime, quoted }) => {
        let message = await quoted.downloadMedia()
        hisoka.sendMessage(m.from, message, { quotedMessageId: m.id._serialized, sendMediaAsSticker: true, stickerName: global.packname, stickerAuthor: global.author, stickerCategories: ['😎','😾','🗿'] })
    }
}
