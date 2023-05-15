import TgBot from "node-telegram-bot-api";
import currency from "./currency.js";
import weather from "./weather.js";

import dotenv from "dotenv";

dotenv.config();


const bot = new TgBot(process.env.tgBot, { polling: true });

const keyboard = {
    keyboard: [[{ text: "Get weather forecast" }], [{ text: "Get currency rate" }]]
};

bot.setMyCommands([
    { command: 'start', description: 'Start bot' },
    { command: 'forecast', description: 'Get forecast' },
    { command: 'currency', description: 'Get currency rates' }
]);

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Hello! I am bot.',
        {
            reply_markup: JSON.stringify(keyboard),
        }
    );
});

bot.onText(/(Go back to main menu)/, (msg) => {
    bot.sendMessage(msg.chat.id, "Choose option", {
        reply_markup: JSON.stringify(keyboard),
    });
});


weather(bot, keyboard);
currency(bot, keyboard);