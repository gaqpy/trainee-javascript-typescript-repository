export const getPrice = (data) => {
    let price = 0;
    if (data.lang === "en") {
        price = data.count * 0.12;
    } else {
        price = data.count * 0.05;
    }

    if (data.mimetype === "other") {
        price = price * 1.2;
    }

    if (data.lang === "en" && price < 120) {
        price = 120;
    }

    if (data.lang !== "en" && price < 50) {
        price = 50;
    }
    return Math.floor(price);
};

export const getTime = (data) => {
    let time = 0;

    if (data.lang === "en") {
        time = data.count / 333;
    } else {
        time = data.count / 1333;
    }

    if (data.mimetype === "other") {
        time = time * 1.12;
    }

    time = 0.5 + time;

    if (time < 1) {
        time = 1;
    }

    return Math.round(time);
};

const setDayEnd = (date) => {
    date.setHours(19, 0, 0, 0);
};

export const getDeadline = (currentDate, time) => {
    let deadline = new Date(currentDate.getTime());

    while (time !== 0) {
        if (deadline.getDay() === 6 || deadline.getDay() === 0) {
            deadline.setDate(deadline.getDate() + 7 - deadline.getDay() + 1);
            deadline.setHours(12, 0, 0, 0);
        } else {
            if (deadline.getHours() >= 19) {
                deadline.setDate(deadline.getDate() + 1);
                deadline.setHours(12, 0, 0, 0);
            } else if (deadline.getHours() < 12) {
                deadline.setHours(12, 0, 0, 0);
            } else {
                let newDate = new Date(deadline.getTime());
                setDayEnd(newDate);
                if (time > newDate.getTime() - deadline.getTime()) {
                    time -= newDate.getTime() - deadline.getTime();
                    deadline.setDate(deadline.getDate() + 1);
                    deadline.setHours(12, 0, 0, 0);
                } else if (time === newDate.getTime() - deadline.getTime()) {
                    time -= newDate.getTime() - deadline.getTime();
                    setDayEnd(deadline);
                    return deadline;
                } else {
                    deadline.setTime(deadline.getTime() + time);
                    time = 0;
                    return deadline;
                }
            }
        }
    }
};

export const getOrderDetails = (requestBody) => {
    const price = getPrice(requestBody);
    const time = getTime(requestBody);
    const currentDate = new Date();
    const deadline = getDeadline(currentDate, time * 3600 * 1000);

    return {
        price: price,
        time: time,
        deadline: deadline.getTime(),
        deadline_date: deadline.toISOString(),
    };
};

export default {
    getOrderDetails,
    getPrice,
    getTime,
    getDeadline,
};