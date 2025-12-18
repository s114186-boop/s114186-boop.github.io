// 遊戲邏輯
let secretNumbers = [];
let attempts = 0;

// 開始遊戲
document.getElementById('startBtn').addEventListener('click', startGame);

function startGame() {
    // 產生4個不重複的數字
    secretNumbers = generateRandomNumbers();
    document.getElementById('gameArea').style.display = 'block';
    document.getElementById('result').textContent = '';
    attempts = 0;
    console.log("Secret numbers are:", secretNumbers);  // 方便測試，會顯示在console裡
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
    let guess = [
        parseInt(document.getElementById('guess1').value),
        parseInt(document.getElementById('guess2').value),
        parseInt(document.getElementById('guess3').value),
        parseInt(document.getElementById('guess4').value),
    ];

    // 檢查輸入是否合法
    if (guess.some(isNaN) || new Set(guess).size !== 4) {
        alert("請輸入4個不重複的數字");
        return;
    }

    attempts++;
    let result = compareNumbers(secretNumbers, guess);
    displayResult(result);

    // 判斷是否贏得遊戲
    if (result.A === 4) {
        setTimeout(() => {
            alert('恭喜，你贏了！');
            startGame(); // 重新開始遊戲
        }, 500);
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
