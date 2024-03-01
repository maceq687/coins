import { useState } from "react";
import "./App.css";

function App() {
  const [coinsArr, setCoins] = useState([1, 2, 5]);
  // 1 5 7 : 10
  // 2 3 5 : 9
  const coins = coinsArr.join(",");
  const [valueToCalculate, setValueToCalculate] = useState(11);
  const coinsResult: string[] = [];
  let result: string = "";
  let counting = true;

  const updateValueToCalculate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValueToCalculate(parseInt(event.target.value));
  };

  const updateCoins = (event: React.ChangeEvent<HTMLInputElement>) => {
    const coinsArr = event.target.value.split(",").map(function (str) {
      return parseInt(str);
    });
    setCoins(coinsArr);
  };

  function calculate() {
    let value = valueToCalculate;
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
    result = coinsResult.join(", ");
    console.log(result);
  }

  function findBiggestDivider(value: number, arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
      if (value >= arr[i]) return arr[i];
    }
  }

  function divideByBiggestDivider(value: number, divider: number) {
    let result = value / divider;
    result = Math.floor(result);
    coinsResult.push(divider + "*" + result);
    result = value - divider * result;
    if (result > 0) return result;
    else {
      counting = false;
    }
  }

  return (
    <>
      <h1>Coins</h1>
      <div className="card">
        <p>Coins values</p>
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
      {!counting && <div>Result: {result}</div>}
    </>
  );
}

export default App;
