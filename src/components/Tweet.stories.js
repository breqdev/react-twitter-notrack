import React from "react"
import Tweet from "./Tweet"

export default {
    title: "Tweet",
    component: Tweet,
}

const Template = (args) => <Tweet {...args} />

export const TweetStory = Template.bind({})

TweetStory.args = {

}
