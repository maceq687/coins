import { useState } from "react";
import "./App.css";

const regexCoins = /^(\d+(,(\d+)*)*)?$/;

function App() {
  const coinsArr = [1, 2, 5];
  // 1 5 7 : 10
  // 2 3 5 : 9
  const [coins, setCoins] = useState(coinsArr.join(","));
  const [coinsProblem, setCoinsProblem] = useState(false);
  const [valueToCalculate, setValueToCalculate] = useState(11);
  let coinsCount = 0;
  let coinsResult: string[] = [];
  const [result, setResult] = useState("");
  let counting = true;
  const [displayResult, setDisplayResult] = useState(false);

  const updateValueToCalculate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValueToCalculate(parseInt(event.target.value));
  };

  const updateCoins = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (regexCoins.test(event.target.value)) {
      setCoinsProblem(false);
      setCoins(event.target.value);
    } else setCoinsProblem(true);
  };

  function calculate() {
    let value = valueToCalculate;
    const coinsArr = coins.split(",").map(function (str) {
      return parseInt(str);
    });
    coinsArr.sort(function (a, b) {
      return a - b;
    });
    const coinsOrdered: number[] = coinsArr.reverse();
    while (counting) {
      const biggestDivider: number = findBiggestDivider(
        value,
        coinsOrdered
      ) as number;
      value = divideByBiggestDivider(value, biggestDivider) as number;
    }
    setResult(coinsCount + " coins: " + coinsResult.join(", "));
  }

  function findBiggestDivider(value: number, arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
      if (value >= arr[i]) return arr[i];
    }
  }

  function divideByBiggestDivider(value: number, divider: number) {
    let reminder = value / divider;
    reminder = Math.floor(reminder);
    coinsCount = coinsCount + reminder;
    coinsResult = [...coinsResult, reminder + "x " + divider];
    reminder = value - divider * reminder;
    if (reminder > 0) return reminder;
    else {
      counting = false;
      setDisplayResult(true);
    }
  }

  return (
    <>
      <h1>Coins</h1>
      <div className="card">
        <p>Coins values</p>
        {coinsProblem && <div className="err">Invalid coins</div>}
        <input type="string" value={coins} onChange={updateCoins} />
        <br />
        <p>Value to calculate</p>
        <input
          type="number"
          value={valueToCalculate}
          onChange={updateValueToCalculate}
        />
      </div>
      <button onClick={calculate}>Run</button>
      {displayResult && (
        <p>
          Result: <br />
          {result}
        </p>
      )}
    </>
  );
}

export default App;
