import { useState } from "react";
import "./App.css";

function App() {
  const coins: number[] = [1, 2, 5];
  // 1 5 7 : 10
  // 2 5 7 : 11
  const [state, setState] = useState(11);
  const coinsResult: string[] = [];
  let counting = true;

  const updateCoinValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(parseInt(event.target.value));
    coins.sort(function (a, b) {
      return a - b;
    });
    let remainingValue = state;
    const coinsOrdered: number[] = coins.reverse();
    while (counting) {
      const biggestDivider: number = findBiggestDivider(
        remainingValue,
        coinsOrdered
      ) as number;
      remainingValue = divideByBD(remainingValue, biggestDivider) as number;
    }
    console.log(coinsResult);
  };

  function findBiggestDivider(value: number, arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
      if (value >= arr[i]) return arr[i];
    }
  }

  function divideByBD(value: number, divider: number) {
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
        <input
          type="string"
          value={state}
          onChange={updateCoinValue}
          autoFocus
        ></input>
      </div>
    </>
  );
}

export default App;
