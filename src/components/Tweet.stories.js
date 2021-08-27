import React from "react"
import Tweet from "./Tweet"

export default {
    title: "Tweet",
    component: Tweet,
}

const Template = (args) => <Tweet {...args} />

export const NotVerified = Template.bind({})

NotVerified.args = {
    id: "1427912476834861064",
    apiUrl: "https://twitter-proxy.breq.workers.dev"
}

export const Verified = Template.bind({})

Verified.args = {
    id: "1431349927263752195",
    apiUrl: "https://twitter-proxy.breq.workers.dev"
}
