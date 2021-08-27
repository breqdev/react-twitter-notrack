addEventListener("fetch", (event) => {
    event.respondWith(
        handleRequest(event.request).catch(
            (err) => new Response(err.stack, { status: 500 })
        )
    );
});

async function handleRequest(request) {
    const incomingOrigin = request.headers.get("Origin")

    if (!(/(breq\.dev|localhost)/.test(incomingOrigin))) {
        return new Response("Origin Not Allowed", { status: 403 })
    }

    const url = new URL(request.url)
    const tweet = url.searchParams.get("tweet")
    const lang = url.searchParams.get("lang") || "en"

    const tweetURL = new URL("https://cdn.syndication.twimg.com/tweet")
    tweetURL.searchParams.append("id", tweet)
    tweetURL.searchParams.append("lang", lang)

    request = new Request(tweetURL)
    request.headers.set("Origin", "platform.twitter.com")

    let response = await fetch(request)

    response = new Response(response.body, response)
    response.headers.set("Access-Control-Allow-Origin", incomingOrigin)
    response.headers.set("Vary", "Origin")

    return response
}
