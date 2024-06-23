import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

type ButtonAttributes = JSX.HTMLAttributes<HTMLButtonElement> & {
  vibratePattern?: number[];
};
export function Button(props: ButtonAttributes) {
  if (props.onClick) {
    const originalOnClick = props.onClick;
    props.onClick = (event) => {
      props.vibratePattern && window.navigator.vibrate(props.vibratePattern);
      return originalOnClick(event);
    };
  }
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="px-2 py-1 border-gray-500 border-2 rounded bg-white hover:bg-gray-200 transition-colors"
    />
  );
}
