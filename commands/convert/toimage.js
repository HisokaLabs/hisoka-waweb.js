const { exec } = require("child_process")
const fs = require("fs")
const path = require("path")
const { MessageMedia } = require("whatsapp-web.js")
const { webp2mp4File } = require("../../lib/Converter")
const { getRandom } = require("../../lib/Function")
const dir = path.join(process.cwd(), `./tmp/undefined.jpg`)

module.exports = {
    name: "toimage",
    alias:["toimg","tovideo","tovid"],
    desc: "Convert webp to Image",
    type: "convert",
    start: async(hisoka, m, { mime, quoted }) => {
        if (!/webp/.test(mime)) return m.reply(`Hanya Support mime webp`)
        let message = await quoted.downloadMedia()
        let buff = Buffer.from(message.data, "base64")
        fs.writeFileSync(dir, buff)
        if (!quoted._data.isAnimated) {
            let ran = await getRandom(".png")
            exec(`ffmpeg -i ${dir} ${ran}`, (err) => {
                fs.unlinkSync(dir)
                if(err) throw err
                let media = MessageMedia.fromFilePath(ran)
                hisoka.sendMessage(m.from, media, { caption: `Sticker to Image`, quotedMessageId: m.id._serialized })
                fs.unlinkSync(ran)
            })
        } else if (quoted._data.isAnimated) {
            let message = await quoted.downloadMedia()
            let buff = Buffer.from(message.data, "base64")
            fs.writeFileSync(dir, buff)
            let webp = await webp2mp4File(dir)
            let media = MessageMedia.fromUrl(webp.result)
            hisoka.sendMessage(m.from, media, { caption: `Sticker to Video`, quotedMessageId: m.id._serialized })
            fs.unlinkSync(dir)
        }
    }
}