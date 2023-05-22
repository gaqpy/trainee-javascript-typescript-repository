import axios from "axios";

const links = [
    "https://jsonbase.com/lambdajson_type1/793",
    "https://jsonbase.com/lambdajson_type1/955",
    "https://jsonbase.com/lambdajson_type1/231",
    "https://jsonbase.com/lambdajson_type1/931",
    "https://jsonbase.com/lambdajson_type1/93",
    "https://jsonbase.com/lambdajson_type2/342",
    "https://jsonbase.com/lambdajson_type2/770",
    "https://jsonbase.com/lambdajson_type2/491",
    "https://jsonbase.com/lambdajson_type2/281",
    "https://jsonbase.com/lambdajson_type2/718",
    "https://jsonbase.com/lambdajson_type3/310",
    "https://jsonbase.com/lambdajson_type3/806",
    "https://jsonbase.com/lambdajson_type3/469",
    "https://jsonbase.com/lambdajson_type3/258",
    "https://jsonbase.com/lambdajson_type3/516",
    "https://jsonbase.com/lambdajson_type4/79",
    "https://jsonbase.com/lambdajson_type4/706",
    "https://jsonbase.com/lambdajson_type4/521",
    "https://jsonbase.com/lambdajson_type4/350",
    "https://jsonbase.com/lambdajson_type4/64",
];

function boolValues(links){
    let trueVal = 0;
    let falseVal = 0;

    Promise.all(
        links.map((links) => 
        axios.get(links).then((result)=>{
            const dataConvert = JSON.stringify(result.data);
            const find = /"isDone":(true|false)/;
            const findValue = dataConvert.match(find)[0].split(":")[1];
            console.log(links + ": isDone - " + findValue);
            if (findValue === "true") {
                trueVal++;
            } else {
                falseVal++;
            }
        })   
        )

    ).then(()=>{
        console.log("True values:  " + trueVal);
        console.log("False values:  " + falseVal);
    });  
}

boolValues(links);