const fs = require("fs")
const chalk = require("chalk")


global.reloadFile = (file, options = {}) => {
    nocache(file, module => console.log(`File "${file}" has updated`))
}


// Rest Api
global.APIs = {
	zenz: 'https://zenzapis.xyz',
}

// Apikey
global.APIKeys = {
	'https://zenzapis.xyz': 'Your Apikey',
}

// Other
global.mess = (type, m) => {
    let msg = {
        owner: 'Perintah ini hanya dapat digunakan oleh Owner!',
        group: 'Perintah ini hanya dapat digunakan di group!',
        private: 'Perintah ini hanya dapat digunakan di private chat!',
        admin: 'Perintah ini hanya dapat digunakan oleh admin group!',
        botAdmin: 'Bot bukan admin, tidak dapat mengakses fitur tersebut',
        bot: 'Fitur ini hanya dapat diakses oleh Bot',
        dead: 'Fitur ini sedang dimatikan!',
        media: 'Reply media',
        error: "No Results Found"
    }[type]
    if (msg) return m.reply(msg)
}
global.options = {
    autoRead: true,
    mute: false,
    public: true
}
global.owner = ["6288292024190","6285784918313"]
global.sessionName = "hisoka"
global.packname = "hisoka-waweb.js"
global.author = "Dika Ardnt."


function nocache(module, cb = () => {}) {
    //console.log(chalk.whiteBright(`Load File "${module}"`))
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update File "${file}"`))
})
