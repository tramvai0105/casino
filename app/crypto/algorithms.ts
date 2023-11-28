const abcFromNumber = new Map(Object.entries({
    '1': 'а',
    '2': 'б',
    '3': 'в',
    '4': 'г',
    '5': 'д',
    '6': 'е',
    '7': 'ё',
    '8': 'ж',
    '9': 'з',
    '10': 'и',
    '11': 'й',
    '12': 'к',
    '13': 'л',
    '14': 'м',
    '15': 'н',
    '16': 'о',
    '17': 'п',
    '18': 'р',
    '19': 'с',
    '20': 'т',
    '21': 'у',
    '22': 'ф',
    '23': 'х',
    '24': 'ц',
    '25': 'ч',
    '26': 'ш',
    '27': 'щ',
    '28': 'ъ',
    '29': 'ы',
    '30': 'ь',
    '31': 'э',
    '32': 'ю',
    '33': 'я'
  }))

const numberFromAbc = new Map(Object.entries({
    'а': 1,
    'б': 2,
    'в': 3,
    'г': 4,
    'д': 5,
    'е': 6,
    'ё': 7,
    'ж': 8,
    'з': 9,
    'и': 10,
    'й': 11,
    'к': 12,
    'л': 13,
    'м': 14,
    'н': 15,
    'о': 16,
    'п': 17,
    'р': 18,
    'с': 19,
    'т': 20,
    'у': 21,
    'ф': 22,
    'х': 23,
    'ц': 24,
    'ч': 25,
    'ш': 26,
    'щ': 27,
    'ъ': 28,
    'ы': 29,
    'ь': 30,
    'э': 31,
    'ю': 32,
    'я': 33
  })) 

let punc = [" ", ".", ",", "?", "!"]

export function codeAlgorithm(phrase: string, keyPhrase: string){
    if(phrase.length < 1){
        return ""
    }
    for (let i = 0; i < punc.length; i++) {
        if(keyPhrase.includes(punc[i])){
            return ""
        }
    }
    phrase.toLocaleLowerCase();
    let key = []
    for(let i = 0; i < keyPhrase.length; i++){
        key.push(numberFromAbc.get(keyPhrase[i]))
    }
    let p = 0;
    let res = "";
    for(let i = 0; i < phrase.length; i++){
        if(!punc.includes(phrase[i])){
            let phraseQ = numberFromAbc.get(phrase[i])
            if(p == keyPhrase.length){
                p = 0;
            }
            console.log(keyPhrase.length);
            let keyPhraseQ = key[p]
            let num;
            if(phraseQ && keyPhraseQ){
                num = phraseQ + keyPhraseQ;
                while(num > 33){
                    num -= 33;
                } 
                res += abcFromNumber.get(String(num))
                p += 1;
            }
        }else{
            res += phrase[i]
        }
    }
    return res;
}

export function decodeAlgorithm(phrase: string, keyPhrase: string){
    if(phrase.length < 1){
        return ""
    }
    for (let i = 0; i < punc.length; i++) {
        if(keyPhrase.includes(punc[i])){
            return ""
        }
    }
    phrase.toLocaleLowerCase();
    let key = []
    for(let i = 0; i < keyPhrase.length; i++){
        key.push(numberFromAbc.get(keyPhrase[i]))
    }
    let p = 0;
    let res = "";
    for(let i = 0; i < phrase.length; i++){
        if(!punc.includes(phrase[i])){
            let phraseQ = numberFromAbc.get(phrase[i])
            if(p == keyPhrase.length){
                p = 0;
            }
            let keyPhraseQ = key[p]
            let num;
            if(phraseQ && keyPhraseQ){
                num = phraseQ - keyPhraseQ;
                if(num < 1){
                    num += 33;
                }
                res += abcFromNumber.get(String(num))
                p += 1;
            }
        }else{
            res += phrase[i]
        }
    }
    return res;
}

export function bestTime(time: number[]){
    let nums = [0,0,0,0,0,0,0,0,0,0]
    let res: number[] = [0,0,0,-1];
    for (let i = 0; i < 4; i++) {
        nums[time[i]]++
    }
    if(nums[7] + nums[8] + nums[9] + nums[6] > 1 
        || nums[5] > 2 
        || nums[4] > 3 
        || nums[3] > 3
        || nums[6] && nums[3] + nums[4] > 2){
        throw Error()
    }
    if(nums[7] || nums[8] || nums[9]){
        res[3] = nums.reduce((j, k, i, arr)=> {if(arr[i] && i > j){return i}else{return j}}, 7)
    }
    if(nums[6] && nums[0] && nums[3] + nums[4] < 2){
        res[2] = 6;
        nums[6]--
        res[3] = 0
        nums[0]--
    }else if(nums[6]){
        res[3] = 6 
        nums[6]--
    }
    if(nums[5] && res[3] > 0){
        res[2] = 5;
        nums[5]--
    }else if(nums[5] > 1){
        res[2] = 5;
        nums[5]--
        res[3] = 5 
        nums[5]--
    }else if(nums[5]){
        res[2] = 5;
        nums[5]--
    }
    if(nums[4] > 2){
        res[1] = 4; res[2] = 4; res[3] = 4;
        nums[4] = 0
    }else if(nums[4]){
        res[1] = 4;
        nums[4]--;
        if(nums[4] && res[2] > 4){
            res[3] = 4;
            nums[4]--;
        }else if(nums[4]){
            res[2] = 4;
            nums[4]--;
        }
    }
    let p = 1;
    while(nums[3]){
        if(res[p] < 1){ 
            res[p] = 3;
            nums[3]--  
        }
        p += 1;
    }
    p = 0;
    while(nums[2]){
        if(res[p] < 1){ 
            res[p] = 2;
            nums[2]--  
        }
        p += 1;
    }
    p = 0;
    while(nums[1]){
        if(res[p] < 1){ 
            res[p] = 1;
            nums[1]--  
        }
        p += 1;
    }
    p = 0;
    while(nums[0]){
        if(res[p] < 1){ 
            res[p] = 0;
            nums[0]--  
        }
        p += 1;
    }
    return res.join("");
}