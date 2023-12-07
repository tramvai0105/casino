const cost = 10;
const itemsCosts = [2, 6, 12];
const fee = 0.2;
let rezP = [0.01, 0.01];

//1 * 0.72 + 6 * 0.28 = 2.4;
function checkRez(itemsCosts, rezP) {
    let rezCost = 0;
    for (let i = 0; i < itemsCosts.length; i++) {
        rezCost += itemsCosts[i] * rezP[i];
    }
    return rezCost == Math.floor((cost - cost * fee) * 100);
}

// Function to generate combinations
function generateCombinations(n, p) {
    let found = false;
    let rez = []
    if (n > 100) {
        throw new Error('Number of combinations must be less than or equal to 100');
    }
    let combinations = [];
    function backtrack(start, currentCombination) {
        if (currentCombination.length === n) {
            if (checkRez(itemsCosts, currentCombination) || checkRez(itemsCosts, [currentCombination[1], currentCombination[0]])) {
                rez.push([...currentCombination]);
            }
            combinations.push([...currentCombination]);
            return;
        }
        for (let i = start; i <= 100; i += 1) {
            currentCombination.push(i);
            backtrack(i, currentCombination);
            currentCombination.pop();
        }
    }
    backtrack(1, []);
    for (let i = 0; i < rez.length; i++) {
        let acc = 0
        for(let j = 0; j < n; j++){
            acc += rez[i][j];
        }
        if(acc > p){
            return rez[i]
        }
    }
    return rez;
}
let combinations = generateCombinations(itemsCosts.length, 100);
console.log(combinations);

