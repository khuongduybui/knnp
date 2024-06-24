import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>knnp</title>
        <link rel="stylesheet" href="/styles.css" />
        <link
          rel="stylesheet"
          href="https://early.webawesome.com/webawesome@3.0.0-alpha.2/dist/themes/default.css"
        />
        <script
          type="module"
          src="https://early.webawesome.com/webawesome@3.0.0-alpha.2/dist/webawesome.loader.js"
        >
        </script>
        <script type="module" src="ready.js"></script>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
