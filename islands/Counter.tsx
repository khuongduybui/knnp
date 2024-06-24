import type { Signal } from "@preact/signals";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  return (
    <div
      style={{
        flexGrow: 1,
        width: "100vw",
        display: "flex",
        alignItems: "center",
      }}
      onClick={(_event) => {
        props.count.value++;
        if (props.count.value % 100 === 0) {
          window.navigator.vibrate?.([100]);
        } else if (props.count.value % 10 === 0) {
          window.navigator.vibrate?.([10]);
        } else {
          window.navigator.vibrate?.([1]);
        }
      }}
    >
      <div
        style={{
          width: "100vw",
          textAlign: "center",
          fontSize: "8rem",
          cursor: "default",
        }}
      >
        {props.count}
      </div>
    </div>
  );
}
