import { useRef, useState, useEffect } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import convertNumberToText from "./pembacaAngka.js";
import "material-symbols";

let clearAll;
function clearFn(nums, fn) {
  clearAll = setTimeout(() => {
    nums.textContent = "0";
    fn("Backspace");
  }, 600);
  // fn("Backspace");
}

function cancelClear() {
  clearTimeout(clearAll);
}

function Tombol({ nums, fn }) {
  const [isKeyboard, setIsKeyboard] = useState(false);

  /*onpointerdown
  onpointerenter
  onpointerup
  onpointerleave*/

  return (
    <div id="container" className={(isKeyboard && "active") || ""}>
      <div
        id="btn-keyboard"
        className="material-symbols-rounded"
        onClick={() => setIsKeyboard(isKeyboard === false ? true : false)}
      >
        keyboard
      </div>
      <div id="tombol-angka">
        <div key={1} onClick={() => fn(1)}>
          1
        </div>
        <div key={2} onClick={() => fn(2)}>
          2
        </div>
        <div key={3} onClick={() => fn(3)}>
          3
        </div>
        <div key={4} onClick={() => fn(4)}>
          4
        </div>
        <div key={5} onClick={() => fn(5)}>
          5
        </div>
        <div key={6} onClick={() => fn(6)}>
          6
        </div>
        <div key={7} onClick={() => fn(7)}>
          7
        </div>
        <div key={8} onClick={() => fn(8)}>
          8
        </div>
        <div key={9} onClick={() => fn(9)}>
          9
        </div>
        <div key="," onClick={() => fn(",")}>
          ,
        </div>
        <div key={0} onClick={() => fn(0)}>
          0
        </div>
        <div
          key="Backspace"
          onClick={() => fn("Backspace")}
          onPointerDown={() => clearFn(nums, fn)}
          onPointerUp={cancelClear}
          className="material-symbols-rounded"
        >
          backspace
        </div>
      </div>
    </div>
  );
}

function App() {
  function diBaca(nums) {
    let num;
    if (nums !== "Backspace") num = numberRef.current.textContent + nums;
    else num = numberRef.current.textContent.slice(0, -1);
    num = num.replace(/(\d+,?\d*)\D?.*$/, "$1");
    num.length > 15 && (num = num.slice(0, 15));
    num = num.replace(/^0+(?!,|$)/, "");
    if (!num || num === "0") {
      numberRef.current.textContent = "0";
      setText("Nol");
      return;
    }

    let [, bulat, desimal] = num.match(/(^\d{0,15})(?:(?=,),(\d+))?/);
    let result = convertNumberToText(bulat, desimal);
    setText(result.replace(/(^.)/, (x) => x.toUpperCase()));
    numberRef.current.textContent = num;
  }

  // function kursor(e) {
  //   alert(e.target.selectionStart)
  // }

  const [text, setText] = useState("Nol");
  // const [number, setNumber] = useState("0");
  const numberRef = useRef("0");

  function InputNumber() {
    useEffect(() => {
      const inputNum = (e) => {
        diBaca(e.key);
      };

      document.documentElement.addEventListener("keydown", inputNum);

      return () => {
        document.documentElement.removeEventListener("keydown", inputNum);
      };
    }, []);
  }

  return (
    <>
      <InputNumber />
      <h1>Pembaca Bilangan</h1>
      <div className="card">
        <div ref={numberRef} id="input-number" type="text">
          0
        </div>
        {/*<input id="input-number" type="text" value={number} ref={inputRef} />*/}
        <p id="text-baca">{text}</p>
      </div>
      <Tombol nums={numberRef.current} fn={diBaca} />
    </>
  );
}

export default App;
