const { MessageMedia } = require("whatsapp-web.js")
const chalk = require("chalk")
const { jsonformat } = require("./lib/Function")


module.exports = async (hisoka, m) => {
    if (m) {
        let contact = await hisoka.getContactById(m.author)
        let nameUser = contact.pushname || contact.shortName || contact.name
        let metadata = await hisoka.getChatById(m.id.remote)
        let groupName = metadata.name
        console.log(chalk.black(chalk.bgWhite("[ Group Update ]")), chalk.black(chalk.bgGreen(new Date(m.timestamp * 1000))), chalk.black(chalk.bgGreen(m.body || m.type)) + "\n" + chalk.black(chalk.bgWhite("=> Author")), chalk.black(chalk.bgGreen(m.author)), chalk.black(chalk.yellow(nameUser)) + "\n" + chalk.black(chalk.bgWhite("=> Di")), chalk.bgGreen(groupName, m.id.remote))
    }
    try {
        if (m.type == "description") {
            // get metadata group
           let metadata = await hisoka.getChatById(m.id.remote)
           // get contact info
            let contact = await hisoka.getContactById(m.author)
           let teks = `
   「 Group Description Change 」

⬡ *Author :* @${m.author.split("@")[0]}
⬡ *In :* ${metadata.name}
⬡ *Time :* ${new Date(m.timestamp * 1000)}
⬡ *New Description :*\n${m.body}
`
           hisoka.sendMessage(m.id.remote, teks, { mentions: [contact] })
       } else if (m.type == "subject") {
           // get metadata group
           let metadata = await hisoka.getChatById(m.id.remote)
           // get contact info
           let contact = await hisoka.getContactById(m.author)
           let teks = `
   「 Group Subject Change 」

⬡ *Author :* @${m.author.split("@")[0]}
⬡ *In :* ${metadata.name}
⬡ *Time :* ${new Date(m.timestamp * 1000)}
⬡ *New Subject :*\n${m.body}
`
           hisoka.sendMessage(m.id.remote, teks, { mentions: [contact] })
       } else if (m.type == "picture") {
           // get metadata group
           let metadata = await hisoka.getChatById(m.id.remote)
           // get contact info
           let contact = await hisoka.getContactById(m.author)
           let teks = `
   「 Group Profile Change 」

⬡ *Author :* @${m.author.split("@")[0]}
⬡ *In :* ${metadata.name}
⬡ *Time :* ${new Date(m.timestamp * 1000)}
⬡ *Type :* ${m.body}
`
           let pp = hisoka.getProfilePicUrl(m.id.remote) || 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
           let message = await MessageMedia.fromUrl(pp)
           hisoka.sendMessage(m.id.remote, message, { caption: teks, mentions: [contact] })
       } else if (m.type == "ephemeral") {
           // get metadata group
           let metadata = await hisoka.getChatById(m.id.remote)
           // get contact info
           let contact = await hisoka.getContactById(m.author)
           let teks = `
   「 Group Ephemeral Detect 」

⬡ *Author :* @${m.author.split("@")[0]}
⬡ *In :* ${metadata.name}
⬡ *Time :* ${new Date(m.timestamp * 1000)}
⬡ *Type :*\n${m.body}
`
           hisoka.sendMessage(m.id.remote, teks, { mentions: [contact] })
       } else if (m.type == "announce") {
           // get metadata group
           let metadata = await hisoka.getChatById(m.id.remote)
           let participants = metadata.groupMetadata.participants.map(v => v.id._serialized) || []
           let mentions = []
           for (let jid of participants) mentions.push(await hisoka.getContactById(jid))
           let teks = `
   「 Group Announce Detect 」

⬡ *Author :* @${m.author.split("@")[0]}
⬡ *In :* ${metadata.name}
⬡ *Time :* ${new Date(m.timestamp * 1000)}
⬡ *Send Message :*\n${(m.body == "on") ? "Only Admins" : "All Members"}
`
           hisoka.sendMessage(m.id.remote, teks, { mentions })
       } else if (m.type == "restrict") {
           // get metadata group
           let metadata = await hisoka.getChatById(m.id.remote)
           let participants = metadata.groupMetadata.participants.map(v => v.id._serialized) || []
           let mentions = []
           for (let jid of participants) mentions.push(await hisoka.getContactById(jid))
           let teks = `
   「 Group Restrict Detect 」

⬡ *Author :* @${m.author.split("@")[0]}
⬡ *In :* ${metadata.name}
⬡ *Time :* ${new Date(m.timestamp * 1000)}
⬡ *Edit Info :*\n${(m.body == "on") ? "Only Admins" : "All Members"}
`
           hisoka.sendMessage(m.id.remote, teks, { mentions })
       } else if (m.type == "promote") {
           let metadata = await hisoka.getChatById(m.id.remote)
           let participants = m.recipientIds
           for (let jid of participants) {
               // get contact
               let contact = await hisoka.getContactById(jid)
               // get profile url user
               let ppuser = await hisoka.getProfilePicUrl(jid) || 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
               // to message
               let message = await MessageMedia.fromUrl(ppuser)
               let teks = '「 *Promote Deteᴄted* 」\n\n```User : @user```\n```Name : @name```\n```Group : @subject```\n\nHas Become An Admin'
               hisoka.sendMessage(m.id.remote, message, { caption: teks.replace(/@subject/g, metadata.name).replace(/@user/g, `@${jid.split("@")[0]}`).replace(/@name/g, `${contact.pushname || contact.shortName || contact.name}`).replace(/@date/g, `${new Date(m.timestamp * 1000)}`), mentions: [contact] })
           }
       } else if (m.type == "demote") {
           let metadata = await hisoka.getChatById(m.id.remote)
           let participants = m.recipientIds
           for (let jid of participants) {
               // get contact
               let contact = await hisoka.getContactById(jid)
               // get profile url user
               let ppuser = await hisoka.getProfilePicUrl(jid) || 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
               // to message
               let message = await MessageMedia.fromUrl(ppuser)
               let teks = '「 *Demote Deteᴄted* 」\n\n```User : @user```\n```Name : @name```\n```Group : @subject```\n\nHas Benn Take Down From Admin'
               hisoka.sendMessage(m.id.remote, message, { caption: teks.replace(/@subject/g, metadata.name).replace(/@user/g, `@${jid.split("@")[0]}`).replace(/@name/g, `${contact.pushname || contact.shortName || contact.name}`).replace(/@date/g, `${new Date(m.timestamp * 1000)}`), mentions: [contact] })
           }
       } else if (m.type == "add" && m.type == "invite") {
           let metadata = await hisoka.getChatById(m.id.remote)
           let participants = m.recipientIds
           for (let jid of participants) {
               // get contact
               let contact = await hisoka.getContactById(jid)
               // get profile url user
               let ppuser = await hisoka.getProfilePicUrl(jid) || 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
               // to message
               let message = await MessageMedia.fromUrl(ppuser)
               let teks = '```Welcome To @subject```\n─────────────────\n```User : @user```\n```Name : @name```\n```Date : @date```\n```Dont Forget to Read the Group Rules```\n─────────────────\n@desc'
               hisoka.sendMessage(m.id.remote, message, { caption: teks.replace(/@subject/g, metadata.name).replace(/@user/g, `@${jid.split("@")[0]}`).replace(/@name/g, `${contact.pushname || contact.shortName || contact.name}`).replace(/@date/g, `${new Date(m.timestamp * 1000)}`), mentions: [contact] })
           }
       } else if (m.type == "remove" && m.type == "leave" && m.type == "kick") {
           let metadata = await hisoka.getChatById(m.id.remote)
           let participants = m.recipientIds
           for (let jid of participants) {
               // get contact
               let contact = await hisoka.getContactById(jid)
               // get profile url user
               let ppuser = await hisoka.getProfilePicUrl(jid) || 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
               // to message
               let message = await MessageMedia.fromUrl(ppuser)
               let teks = '```Goodbye``` 👋\n─────────────────\n```User : @user```\n```Name : @name```\n```Date : @date```\n\nLeaving From @subject\n'
               hisoka.sendMessage(m.id.remote, message, { caption: teks.replace(/@subject/g, metadata.name).replace(/@user/g, `@${jid.split("@")[0]}`).replace(/@name/g, `${contact.pushname || contact.shortName || contact.name}`).replace(/@date/g, `${new Date(m.timestamp * 1000)}`), mentions: [contact] })
           }
       } else if (m.type == "revoke_invite") {
            // get metadata group
            let metadata = await hisoka.getChatById(m.id.remote)
            let participants = metadata.groupMetadata.participants.map(v => v.id._serialized) || []
            let mentions = []
            for (let jid of participants) mentions.push(await hisoka.getContactById(jid))
            let teks = `
「 Group Revoke Invite Detect 」
 
 ⬡ *Author :* @${m.author.split("@")[0]}
 ⬡ *In :* ${metadata.name}
 ⬡ *Time :* ${new Date(m.timestamp * 1000)}
 ⬡ *Link :* https://chat.whatsapp.com/${await metadata.getInviteCode()}
 `
            hisoka.sendMessage(m.id.remote, teks, { mentions })
       }
    } catch (e) {
        console.error(e)
    }
}


global.reloadFile(__filename)