let express = require('express')
let qrcode = require('qrcode')

function connect(conn, PORT) {
    let app = global.app = express()

    let _qr = 'Invalid Qr'
    app.use(async (req, res) => {
        res.setHeader('content-type', 'image/png')
        res.end(await qrcode.toBuffer(_qr))
    })
    conn.on('qr', qr => {
        _qr = qr
    })

    conn.on("ready", () => {
        let user = {
            name: conn.info.pushname || '',
            jid: conn.info.wid._serialized || '',
            id: conn.info.wid.user || '',
            phone: conn.info.phone || '',
            platform: conn.info.platform || '',
            battery: conn.info.getBatteryStatus() || ''
        }
        _qr = user
    })
    
    let server = app.listen(PORT, () => console.log('App listened on port', PORT))
}

module.exports = connect
