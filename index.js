// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';
const { Console } = require('console');
const fs = require('fs');

// Load the session data if it has been previously saved
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
    // Use the saved values
    const { Client } = require('whatsapp-web.js');
    const client = new Client({
        session: sessionData
    });



    //Cuando el cliente este pronto para usar lanza esta funcion
    client.on('ready', () => {
        console.log('Client is ready to use!');

    });


    client.initialize();



    //A normal text respond
    client.on('message', message => {
        if (message.body === 'Hola') {
            message.reply('Hola putos');
            console.log(message.body);
        }

    });

    //Respond to media downloading it and then sending it back
    client.on('message', message => {
        if (message.hasMedia) {
            const media = message.downloadMedia();
            message.reply(media);
            message.reply("Media");
            //Aca entra
        }
    });




} else {
    const { Client } = require('whatsapp-web.js');
    const client = new Client();
    //QR Code

    const qrcode = require('qrcode-terminal');

    client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log("Please reset the bot to use it");
    });

    client.initialize();

    // Save session values to the file upon successful auth
    client.on('authenticated', (session) => {
        sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
            if (err) {
                console.error(err);
            }
        });
    });



}













