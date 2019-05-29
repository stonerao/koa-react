const WebSocket = require('ws');
const ws = new WebSocket.Server({ port: 3002 });
ws.on('connection', (ws, req) => {
    ws.on('message', msg => {
        switch (req.url) {
            case "/test":
                ws.send(JSON.stringify({
                    code: 200
                }))
                break;
        }
    });
});
module.exports = ws;