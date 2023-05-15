import { Command } from "commander";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();


const bot = new TelegramBot(process.env.TOKEN, { polling: true });
const program = new Command();

program
    .command("message")
    .description("send message to bot")
    .argument("<string>", "message to send")
    .action((message) => {
        bot.sendMessage(process.env.ID, message);
    });
program
    .command("image")
    .description("send image to bot")
    .argument("<string>", "path to photo")
    .action((pathToPhoto) => {
        bot.sendPhoto(process.env.ID, pathToPhoto);
    });

program.parse();