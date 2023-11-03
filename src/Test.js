import { useState } from "react";

function SlowComponent() {
  // If this is too slow on your maching, reduce the `length`
  const words = Array.from({ length: 100_000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

function Counter({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {children}
    </div>
  );
}

export default function Test() {
  // **** previous code:
  // const [count, setCount] = useState(0);
  // return (
  //   <div>
  //     <h1>Slow counter?!?</h1>
  //     <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
  //     <SlowComponent />
  //   </div>
  // );

  // creating Counter component and passing the slow compoent in as a child means that React bails out of re-rendering it when only Counter state changes.
  //   React is able to detect that the slow component is created first to be passed as a child prop to Count so it cannot be affected by a state change within Counter
  // The same applies to children of a context provider, which do not consume the context. They are created first to then be passed in as a children prop,
  //   so if they do not consume the context they would not be automatically rerendered on a context change.

  return (
    <div>
      <h1>Slow Counter?!?</h1>
      <Counter>
        <SlowComponent />
      </Counter>
    </div>
  );
}
