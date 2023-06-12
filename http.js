
process.on("unhandledRejection", function (e) {
    console.log(e);
});

const setTitle = require('console-title');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 443;
const fs = require('fs');

setTitle(`ToriKuru Protect > Ultimate > Users`);

let FLOOD_TIME = 20000;
let FLOOD_MAX = 200;
let flood = {
    floods: {},
    lastFloodClear: new Date(),
    protect: (io, socket) => {
        if (Math.abs( new Date() - flood.lastFloodClear) > FLOOD_TIME) {
            flood.floods = {};
            flood.lastFloodClear = new Date();
        }
        flood.floods[socket.id] == undefined ? flood.floods[socket.id] = {} : flood.floods[socket.id];
        flood.floods[socket.id].count == undefined ? flood.floods[socket.id].count = 0 : flood.floods[socket.id].count;
        flood.floods[socket.id].count++;
        if (flood.floods[socket.id].count > FLOOD_MAX) {
            io.sockets.connected[socket.id].disconnect();
            return false;
        }
        return true;
    }
};

// Advance Blacklist Attackers
var blacklist = new Map();
var timeout = 10 * 1000;
function add_address(address) {
    blacklist.set(address, Date.now() + timeout);
};

// Ultimate Blacklist Attackers
if (blacklist.length > 0) {
    setTimeout(function() {
        blacklist.clear();
        console.log("Blacklist cleared");
        process.exit(0);
    }, timeout);
    };

// Botnet Detection
var botnet_detection = function(req, res) {
    let connection = req.connection.remoteAddress;
    if (connection === undefined || connection === null) {
        return;
    } else if (connection.toString().indexOf('/growtopia/server_data.php') !== -1) {
        console.log(`Botnet detected ${connection.toString()}`);
    }
};

app.get('/growtopia/server_data.php', function(req, res) {
    let AddressConnection = req.connection.remoteAddress;
    AddressConnection.split('/::fff:/g').filter(a => a).join('');
    if (req.method === 'GET') {
        if (req.url == "/growtopia/server_data.php" || req.url == "C:/xampp/htdocs/growtopia/server_data.php") {
            res.writeHead(200, { status:"200"}); //200 OK
            res.write('Tori Protection Actived');
            res.end();
        }
        else if (url && files.has(url.replace(/\//g, "")) && req.method.toLowerCase() === "GET") {
            if (!fs.existsSync(`.${req.url}`)) {
                console.log(`[ERROR] CUSTOM ITEM ${req.url} NOT FOUND!`.red);
                res.writeHead(404, `.${req.url} Not Found`)
                res.write(`.${req.url} Not Found`);
                res.end();
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Content-Disposition": "attachment; filename=" + !url.endsWith(".rttex") ? url + ".rttex" : url,
                'Content-Length': req.url.length,
                "beserver": "06",
                "Connection": "keep-alive",
                "Accept-Ranges": "bytes"
            });
            console.log(`[LOAD]${ipvps}:17091 => Load Custom Item In:${req.url}[${req.method}]`);
            res.write(files.get(url), function (err) {
                if (err)
                    console.log(err);
            });
        }
    }});


    function add_address(address) {
        blacklist.set(address, Date.now() + 5000);
    }
    app.on("connection", function (socket) {
        let ipsocket = socket.remoteAddress;
        ipsocket = ipsocket.split(/::ffff:/g).filter(i => i).join("");
        if (!blacklist.has(socket.remoteAddress)) {
            add_address(socket.remoteAddress);
        }
        else {
            var not_allowed = blacklist.get(socket.remoteAddress);
            if (Date.now() > not_allowed) {
                blacklist.delete(socket.remoteAddress);
            }
            else
                socket.destroy();
                console.log(`banned Connection With IP = ${ipsocket}`);
                process.env.BLACKLIST
        }
    });

//Pack Connection Server
const pack = `
server|127.0.0.1
port|17091
type|1
#maint|
beta_server|127.0.0.1
beta_port|17091
beta_type|1
meta|defined
RTENDMARKERBS1001|unknown
`;

app.post("/growtopia/server_data.php", (req, res) => {
    res.status(200).send(pack).end();
    if (req.connection !== undefined) {
        let ipsocket = req.connection.remoteAddress;
        ipsocket = ipsocket.split(/::fff:/g).filter(ip => !ip.startsWith("localhost")[0]);
        if (!blacklist[ipsocket]) {
            add_address(ipsocket);
            console.log(`Connection Detect: ${ipsocket}`);
            process.env.BLACKLIST
        }
        else {
            if (ipsocket === undefined || unknown) {
                botnet_detection;
                console.log(`Botnet Detect: ${ipsocket}`);
                process.env.BLACKLIST
            }
        }
    }
  });

var developer = "ToriKuru";
var udpport = 17091;

app.listen(PORT + udpport, function () {
    console.log(`                                                                     
 ████████  ██████  ██████  ██ ██   ██ ██    ██ ██████  ██    ██ 
    ██    ██    ██ ██   ██ ██ ██  ██  ██    ██ ██   ██ ██    ██ 
    ██    ██    ██ ██████  ██ █████   ██    ██ ██████  ██    ██ 
    ██    ██    ██ ██   ██ ██ ██  ██  ██    ██ ██   ██ ██    ██ 
    ██     ██████  ██   ██ ██ ██   ██  ██████  ██   ██  ██████  

             Ultimate Protection, Made By ${developer}
                 Listening On Port ${PORT}, ${udpport}`);
});