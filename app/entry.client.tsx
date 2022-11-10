import ReactDOM from "react-dom";
import { RemixBrowser } from "@remix-run/react";
import * as Fathom from "fathom-client";

Fathom.load("ROTOLYJX", {
  excludedDomains: ["localhost"],
  url: `https://kind-thirtyeight.mcansh.blog/script.js`,
});

ReactDOM.hydrate(<RemixBrowser />, document);
