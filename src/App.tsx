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
  let possibleResults: { coinsCount: number; coinsResult: string[] }[] = [];
  let smallestCoinCount: { coinsCount: number; coinsResult: string[] };
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
    const coinsFiltered = coinsArr.filter((coinValue) => coinValue < value);
    coinsFiltered.sort(function (a, b) {
      return a - b;
    });
    const coinsOrdered: number[] = coinsFiltered.reverse();
    while (counting) {
      let divider = 0;
      for (let i = 0; i < coinsOrdered.length; i++) {
        if (value >= coinsOrdered[i]) {
          divider = coinsOrdered[i];
          break;
        }
      }
      let reminder = value / divider;
      reminder = Math.floor(reminder);
      coinsCount = coinsCount + reminder;
      coinsResult = [...coinsResult, reminder + "x " + divider];
      reminder = value - divider * reminder;
      if (reminder > 0) value = reminder;
      else if (reminder == 0 && coinsOrdered.length > 0) {
        possibleResults = [...possibleResults, { coinsCount, coinsResult }];
        coinsOrdered.shift();
        coinsResult = [];
        coinsCount = 0;
        value = valueToCalculate;
      } else {
        counting = false;
        smallestCoinCount = possibleResults.reduce(function (
          a: { coinsCount: number; coinsResult: string[] },
          b: { coinsCount: number; coinsResult: string[] }
        ) {
          return a.coinsCount < b.coinsCount ? a : b;
        });
        setDisplayResult(true);
      }
    }
    setResult(
      smallestCoinCount.coinsCount +
        " coins: " +
        smallestCoinCount.coinsResult.join(", ")
    );
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

export default App;
