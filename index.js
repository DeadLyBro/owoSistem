import prompt from 'prompt';
import ora from "ora";
import Discord from "discord.js";
const client = new Discord.Client();

prompt.start();
var inter;

const getToken = async () => {
    let {
        token
    } = await prompt.get(['token']);

    token = token.replaceAll(" ", "");

    let spinner = ora("Token'e giriş yapılıyor...").start();

    try {
        await client.login(token);
        await spinner.stop();
        await getChannel();
    } catch {
        spinner.stop();
        console.log("Token hatalı.");
    };
};

const getChannel = async () => {
    let {
        kanal
    } = await prompt.get(['kanal']);

    kanal = kanal.replaceAll(" ", "");

    let spinner = ora("Kanal kontrol ediliyor...").start();

    try {
        kanal = await client.channels.get(kanal);
        await spinner.stop();
        await startSystem(kanal);
        await client.on("message", message => {
            if (message.author.id == "408785106942164992") {
                let msg = message.content.toLowerCase();
                if (msg.includes("beep") || msg.includes("boop") || msg.includes("real") || msg.includes("check") || msg.includes("complete")) {
                    stopSystem(kanal);
                };
            };
        });
    } catch (err) {
        console.log(err);
        spinner.stop();
        await client.destroy();
        console.log("Kanal hatalı.");
    };
};

const startSystem = async (kanal) => {

    console.log("Sistem başladı...");

    inter = setInterval(() => {
        kanal.send("wh");
        kanal.send("wb");
    }, 15000);
};

const stopSystem = async (kanal) => {

    console.log("Sistem durdu. Doğrulama isteniyor...");

    clearInterval(inter);

    await prompt.get(['Doğrulamayı onayladıktan sonra enterlayın']);

    startSystem(kanal);
};

getToken();