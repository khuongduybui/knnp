import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  if (props.onClick) {
    const originalOnClick = props.onClick;
    props.onClick = (event) => {
      if (window.navigator.vibrate) {
        window.navigator.vibrate([500]);
        originalOnClick(event);
      }
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
