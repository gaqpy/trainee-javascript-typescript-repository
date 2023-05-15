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

            axios.get(currencyLinkPrivat)
                .then((result) => {
                    const currencyData = result.data.find(
                        (curr) => curr.ccy === currencyMsg.text
                    );
                    if (currencyData) {
                        bot.sendMessage(
                            msg.chat.id,
                            `${currencyData.ccy} в UAH\n ПОКУПКА: ${currencyData.buy}\n ПРОДАЖА: ${currencyData.sale}`,
                            {
                                reply_markup: JSON.stringify(
                                    mainKeyboard
                                        ? mainKeyboard
                                        : {
                                            hide_keyboard: true,
                                        }
                                ),
                            }
                        );
                    }
                })
                .catch((error) => {
                    bot.sendMessage(msg.chat.id, 'An error occurred while retrieving currency data.');
                });
            bot.removeTextListener(/(USD|EUR)/);
        });
    });
};

export default currency;