// 遊戲邏輯
let secretNumbers = [];
let attempts = 0;

// 開始遊戲
document.getElementById('startBtn').addEventListener('click', startGame);

function startGame() {
    secretNumbers = generateRandomNumbers();
    document.getElementById('gameArea').style.display = 'block';
    document.getElementById('result').textContent = '';
    document.getElementById('guessInput').value = "";
    attempts = 0;

    console.log("答案（測試用）：", secretNumbers);
}


// 生成4個不重複的隨機數字
function generateRandomNumbers() {
    let numbers = [];
    while (numbers.length < 4) {
        let num = Math.floor(Math.random() * 10);  // 生成 0 - 9 的數字
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
}

// 提交玩家的猜測
document.getElementById('submitBtn').addEventListener('click', checkGuess);

function checkGuess() {
    let input = document.getElementById('guessInput').value.trim();

    // 依空格切割
    let guess = input.split(" ").map(Number);

    // 檢查是否為 4 個數字
    if (guess.length !== 4 || guess.some(isNaN)) {
        alert("請輸入 4 個數字，並以空格隔開");
        return;
    }

    // 檢查是否重複
    if (new Set(guess).size !== 4) {
        alert("數字不可重複");
        return;
    }

    attempts++;
    let result = compareNumbers(secretNumbers, guess);
    displayResult(result);

    // 勝利判斷
    if (result.A === 4) {
        setTimeout(() => {
            alert("🎉 4A！完全正確，你贏了！");
            startGame();
        }, 300);
    }
}


// 比較玩家猜測與正確數字
function compareNumbers(secret, guess) {
    let A = 0, B = 0;
    for (let i = 0; i < 4; i++) {
        if (secret[i] === guess[i]) {
            A++;  // 數字和位置都正確
        } else if (secret.includes(guess[i])) {
            B++;  // 數字正確，但位置錯誤
        }
    }
    return { A, B };
}

// 顯示結果
function displayResult(result) {
    let resultText = `${result.A}A ${result.B}B`;
    document.getElementById('result').textContent = resultText;
}
