const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    //разбиваем на отдельные слова
    let arrOfWords = expr.split('**********');
    
    let arrOfLetters = [];
    
    //каждое слово разбиваем на массив, в каждом элементе которого по 10 символов
    arrOfWords.forEach(word => {
        let arrOfLetter = [];
        for(a=0; a<word.length; a+10){
            let codedLetter = word.slice(a, a+=10);
            //ищем индекс первой единицы (тем самым отсекая ненужные нули вначале)
            let index = codedLetter.indexOf(1);
            codedLetter = codedLetter.slice(index, codedLetter.length);
            //делим строку на 10 и 11
            let tens = [];
            let arrOfTens = [];
            for(i=0; i<codedLetter.length; i+2){
                tens = codedLetter.slice(i, i+=2);
                arrOfTens.push(tens);
            }
            arrOfLetter.push(arrOfTens);
        }
       arrOfLetters.push(arrOfLetter);
    });

    
    arrOfLetters.forEach(element => {
        for(let i = 0; i<element.length; i++){
            for(let a = 0; a<element[i].length; a++){
                if(element[i][a] === '10'){
                    element[i][a] = '.';
                }
                else{
                    element[i][a] = '-';
                }
            }
            element[i] = element[i].join('');
            element[i] = MORSE_TABLE[element[i]];
        } 
    });

    let message = [];
    for(i=0; i<arrOfLetters.length; i++){
        let str = arrOfLetters[i].join('');
        message.push(str);
    }
    return message.join(' ');
}


module.exports = {
    decode
}