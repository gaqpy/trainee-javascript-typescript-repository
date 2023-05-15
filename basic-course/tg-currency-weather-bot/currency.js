import axios from "axios";
import dotenv from "dotenv";
import fs from 'fs';

dotenv.config();

const currencyLinkMono = "https://api.monobank.ua/bank/currency";
const currencyLinkPrivat = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

const currency = (bot, mainKeyboard = null) => {
    bot.onText(/(\/currency|Get currency rate)/, (msg) => {
        const options = ['USD', 'EUR', 'return to menu'];
        const currenciesKeyboard = options.map(currency => [{ text: currency }]);
        const currenciesOptions = {
            reply_markup: JSON.stringify({
                keyboard: currenciesKeyboard,
            }),
        };
        bot.sendMessage(msg.chat.id, 'Choose currency', currenciesOptions);


        bot.onText(/(USD|EUR)/, (currencyMsg) => {
            axios.get(currencyLinkMono).then((result) => {
                fs.writeFile('dataBase.json', JSON.stringify(result.data), (err) => {
                    if (!err) {
                        console.log('Rate saved');
                    }
                });

                const ratesFromDb = result.data.find(curr => curr.currencyCodeA === currToNum(currencyMsg.text));

                bot.sendMessage(msg.chat.id,
                    `${currencyMsg.text} to UAH\nBUY: ${ratesFromDb.rateBuy}\nSALE: ${ratesFromDb.rateSell}`,
                    {
                        reply_markup: JSON.stringify(mainKeyboard ? mainKeyboard : {
                            hide_keyboard: true
                        }),
                    });
            })
                .catch((err) => {
                    if (err.response.status === 429) {
                        fs.readFile('dataBase.json', (readErr, data) => {
                            if (!readErr) {
                                const ratesFromDb = JSON.parse(data).find(curr => curr.currencyCodeA === currToNum(currencyMsg.text));
                                bot.sendMessage(msg.chat.id,
                                    `${currencyMsg.text} to UAH\nBUY: ${ratesFromDb.rateBuy}\nSALE: ${ratesFromDb.rateSell}`,
                                    {
                                        reply_markup: JSON.stringify(mainKeyboard ? mainKeyboard : {
                                            hide_keyboard: true
                                        }),
                                    });
                            }
                        })
                    }
                });

            bot.removeTextListener(/(USD|EUR)/);
        });
    });
};

export default currency;

function currToNum(curr) {
    switch (curr) {
        case 'USD':
            return 840;
        case 'EUR':
            return 978;
        default:
            return null;
    }
}