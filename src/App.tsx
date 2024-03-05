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
  let smallestCoinCount: Result;
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
    let coinsCount = 0;
    let coinsResult: string[] = [];
    let lastIndex = 0;
    let possibleResults: Result[] = [];
    const coinsArr = coins.split(",").map(function (str) {
      return parseInt(str);
    });
    const coinsFiltered = coinsArr.filter((coinValue) => coinValue < value);
    coinsFiltered.sort(function (a, b) {
      return a - b;
    });
    const coinsOrdered: number[] = [
      ...new Set<number>(coinsFiltered.reverse()),
    ];
    while (counting) {
      let divider = 0;
      for (let i = 0; i < coinsOrdered.length; i++) {
        if (value >= coinsOrdered[i]) {
          divider = coinsOrdered[i];
          lastIndex = i;
          break;
        }
      }
      const multiplier = Math.floor(value / divider);
      coinsCount = coinsCount + multiplier;
      coinsResult = [...coinsResult, multiplier + "x " + divider];
      const reminder = value - divider * multiplier;
      if (reminder > 0) {
        value = reminder;
        if (coinsOrdered.every((el) => el > value)) {
          value = value + divider;
          coinsCount = coinsCount - 1;
          coinsResult.pop();
          if (multiplier > 1) {
            coinsResult = [...coinsResult, multiplier - 1 + "x " + divider];
          }
          coinsOrdered.splice(lastIndex, 1);
        }
      } else if (reminder == 0 && coinsOrdered.length > 0) {
        possibleResults = [...possibleResults, { coinsCount, coinsResult }];
        coinsOrdered.shift();
        coinsResult = [];
        coinsCount = 0;
        value = valueToCalculate;
      } else {
        counting = false;
        smallestCoinCount = possibleResults.reduce(function (
          a: Result,
          b: Result
        ) {
          return a.coinsCount < b.coinsCount ? a : b;
        });
        setResult(
          smallestCoinCount.coinsCount +
            " coins: " +
            smallestCoinCount.coinsResult.join(", ")
        );
        setDisplayResult(true);
      }
    }
  }

  return (
    <>
      <h1>Coins</h1>
      <div className="card">
        <p>Coins values</p>
        {coinsProblem && (
          <div className="err">Invalid coins, use only numbers and ","</div>
        )}
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

interface Result {
  coinsCount: number;
  coinsResult: string[];
}

export default App;
