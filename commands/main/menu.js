const { MessageMedia } = require("whatsapp-web.js")

module.exports = {
    name: "menu",
    alias: ["help","?","list"],
    desc: "List all command",
    type: "main",
    start: async(hisoka, m, { commands, args, prefix, text, toUpper, name }) => {
        if (args[0]) {
            let data = []
            let name = args[0].toLowerCase()
            let cmd = commands.get(name) || Array.from(commands.values()).find((v) => v.alias.includes(name))
            if (!cmd || cmd.type == "hide") return m.reply("No Command Found")
            else data.push(`*Command :* ${cmd.name.replace(/^\w/, c => c.toUpperCase())}`)
            if (cmd.alias) data.push(`*Alias :* ${cmd.alias.join(", ")}`)
            if (cmd.desc) data.push(`*Description :* ${cmd.desc}`)
            if (cmd.example) data.push(`*Example :* ${cmd.example.replace(/%prefix/gi, prefix).replace(/%command/gi, cmd.name).replace(/%text/gi, text)}`)

            return m.reply(`*Info Command ${cmd.name.replace(/^\w/, c => c.toUpperCase())}*\n\n${data.join("\n")}`)
        } else {
            let teks = ""

            for (let type of commands.type) {
                teks += `┌──⭓ *${toUpper(type)} Menu*\n`
                teks += `│\n`
                teks += `${commands.list[type].filter(v => v.type !== "hide").map((cmd) => `│⭔ ${prefix + cmd.name}`).join("\n")}\n`
                teks += `│\n`
                teks += `└───────⭓\n\n`
            }
            let media = await MessageMedia.fromUrl("https://camo.githubusercontent.com/7ccd7d67ce243f1356a3aec3b96725231ea54253028390711ba30c7203e4b6e4/68747470733a2f2f74656c656772612e70682f66696c652f3039636330393831636366303737353464306166362e6a7067", { unsafeMime: true })
            hisoka.sendMessage(m.from, media, { caption: teks, quotedMessageId: m.id._serialized })
        }
    }
}
