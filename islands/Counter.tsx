import type { Signal } from "@preact/signals";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  return (
    <div style={{ flexGrow: 1, width: "100vw", display: "flex", alignItems: "center" }} onClick={(_event) => {
      props.count.value++;
      window.navigator.vibrate?.([1]);
      // TODO: Add a sound effect when count mod 10 === 0
      // TODO: fetch api to increment counter
    }}>
      <div style={{ width: "100vw", textAlign: "center", fontSize: "8rem", cursor: "default"}}>{props.count}</div>
    </div>
  );
}
