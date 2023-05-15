import axios from "axios";
import TgBot from "node-telegram-bot-api";

import dotenv from "dotenv";

dotenv.config();

const bot = new TgBot(process.env.TgBot, { polling: true });

bot.setMyCommands([
    { command: "/start", description: "Приветствие" },
]);
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    if (msg.text === "/start") {
        bot.sendMessage(chatId, 'Добрий день, я создан чтобы повторять то что вы напишете или выдавать рандомные фото по вашему запросу.');
    }
    else if (msg.text !== "photo") {
        bot.sendMessage(chatId, `Вы написали: ${msg.text} `);
    }
    console.log(`Пользователь написал: ${msg.text} `);
});

bot.onText(/photo/, (msg) => {
    const chatId = msg.chat.id;
    axios.get("https://picsum.photos/200/300")
        .then((response) => {
            bot.sendPhoto(chatId, response.request.res.responseUrl);
        });
});