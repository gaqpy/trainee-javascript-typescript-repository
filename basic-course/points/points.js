function points(string) {
    let str = string;
    let combs = [];
    let maxResults = 2 ** (str.length - 1);

    for (let i = 0; i < maxResults; i++) {
        let binary = i.toString(2).padStart(str.length - 1, '0');
        let combination = str[0];
        for (let j = 0; j < binary.length; j++) {
            if (binary[j] == '1') {
                combination += '.' + str[j + 1];
            } else {
                combination += str[j + 1];
            }
        }
        combs.push(combination);
    }

}
console.log(points('abcd'));