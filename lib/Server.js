let express = require('express')
let qrcode = require('qrcode')

function connect(conn, PORT) {
    let app = global.app = express()

    let _qr = 'invalid'
    app.use(async (req, res) => {
        res.setHeader('content-type', 'image/png')
        res.end(await qrcode.toBuffer(_qr))
    })
    conn.on('qr', qr => {
        _qr = qr
    })
    
    let server = app.listen(PORT, () => console.log('App listened on port', PORT))
}

module.exports = connect
