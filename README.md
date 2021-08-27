# react-twitter-notrack

A component library for Twitter widgets built without Twitter's tracking scripts.

```js
import { Tweet } from "react-twitter-notrack"

function App() {
    return (
        <Tweet id="20" apiUrl="https://twitter-proxy.breq.workers.dev">
    )
}
```

You will need to run a proxy to get around Twitter CORS. Using mine will not
work in production!! I've provided the source code for my Cloudflare Worker in
`src/worker.js`.
