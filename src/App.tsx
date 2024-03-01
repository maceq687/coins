import { useState } from "react";
import "./App.css";

function App() {
  const coins: number[] = [1, 2, 5];
  // 1 5 7 : 10
  const [state, setState] = useState(11);
  const coinsResult: string[] = [];
  let counting = true;

  const updateCoinValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(parseInt(event.target.value));
    console.log(state);
    coins.sort(function (a, b) {
      return a - b;
    });
    const coinsOrdered: number[] = coins.reverse();
    const biggestDivider: number = findBiggestDivider(
      state,
      coinsOrdered
    ) as number;
    while (counting) {
      let remainingValue = state;
      remainingValue = divideByBD(remainingValue, biggestDivider) as number;
      console.log(remainingValue);
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
    console.log(result);
    coinsResult.push(divider + "*" + result);
    result = value - divider * result;
    if (result != 0) return result;
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
