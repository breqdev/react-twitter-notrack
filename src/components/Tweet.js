import React from "react"
import styled from "styled-components"

import useSWR from "swr"

import twitterLogo from "./branding/twitterLogo.svg"
import twitterVerified from "./branding/twitterVerified.svg"


const Card = styled.article`
    border: 1px solid rgb(207, 217, 222);
    border-radius: 12px;
    padding: 12px 16px 4px;

    max-width: 550px;

    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue';
`


const BlockLink = styled.a`
    color: #000000;
    text-decoration: none;
    &:hover {
        text-decoration: none;
    }
`


const Header = styled.div`
    display: flex;
    align-items: center;
`


const Avatar = styled.img`
    border-radius: 50%;
    height: 48px;
    width: 48px;
`


const UserInfo = styled.div`
    min-width: 0;
    flex-grow: 1;

    margin-left: 8px;
    display: flex;
    flex-direction: column;

    & > strong {
        font-weight: bold;
        display: flex;

        & > span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    & > span {
        color: rgb(83, 100, 113);
    }
`

const TwitterLogo = styled.img`
    height: 24px;
    width: 24px;

    align-self: flex-start;
`

const Verified = styled.img`
    align-self: flex-start;

    height: 16px;
    width: 16px;

    margin-left: 4px;
    margin-right: 12px;
`

const Content = styled.div`
    margin: 12px 0;
    font-size: 19px;
`

const Metadata = styled.div`
    color: rgb(83, 100, 113);
`

const Divider = styled.hr`
    margin: 8px 0;
    border: none;
    height: 1px;
    background-color: rgb(207, 217, 222);
`


const Photo = styled.img`
    max-width: 100%;

    margin-bottom: 12px;

    border-radius: 16px;
`


const Stats = styled.div`
    display: flex;
    margin: 8px 0;
    gap: 24px;
`

const Stat = styled.div`
    display: flex;
    gap: 8px;

    align-items: center;

    color: rgb(83, 100, 113);

    & > svg {
        height: 24px;

        & > path {
            fill: none;
            stroke: rgb(83, 100, 113);
            stroke-width: 5px;
        }
    }

    & > span {
    }
`

// Source: https://developer.twitter.com/en/docs/twitter-for-websites/web-intents/image-resources
const Reply = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 72">
        <path d="M41 31h-9V19c0-1.14-.647-2.183-1.668-2.688-1.022-.507-2.243-.39-3.15.302l-21 16C5.438 33.18 5 34.064 5 35s.437 1.82 1.182 2.387l21 16c.533.405 1.174.613 1.82.613.453 0 .908-.103 1.33-.312C31.354 53.183 32 52.14 32 51V39h9c5.514 0 10 4.486 10 10 0 2.21 1.79 4 4 4s4-1.79 4-4c0-9.925-8.075-18-18-18z"/>
    </svg>
)

const Like = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 72">
        <path d="M38.723,12c-7.187,0-11.16,7.306-11.723,8.131C26.437,19.306,22.504,12,15.277,12C8.791,12,3.533,18.163,3.533,24.647 C3.533,39.964,21.891,55.907,27,56c5.109-0.093,23.467-16.036,23.467-31.353C50.467,18.163,45.209,12,38.723,12z"/>
    </svg>
)

const fetcher = (...args) => fetch(...args).then(res => res.json())

const parseDate = (string) => {
    if (!string) return [null, null]

    const date = new Date(string)

    const timeStr = date.toLocaleTimeString([], { timeStyle: "short" })
    const dateStr = date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })

    return [timeStr, dateStr]
}

const Symbol = styled.span`
    color: rgb(27, 149, 224);
`

const isolateContent = (data) => {
    if (!data) return null

    const tokens = data.text.split(" ")

    const elements = tokens.map((token) => {
        if (token.startsWith("@") || token.startsWith("#")) {
            return <Symbol>{token}</Symbol>
        } else if (token.startsWith("https://")) {
            const matchingURLs = data.entities.urls.filter(url => url.url === token)
            if (matchingURLs.length) {
                return <Symbol>{matchingURLs[0].display_url}</Symbol>
            }
            return <></>
        } else {
            return <>{token}</>
        }
    })

    return elements.reduce((prev, curr) => [prev, " ", curr])
}

function Media({ data }) {
    if (data?.photos) {
        return <Photo src={data.photos[0].url} />
    }

    return null
}

export default function Tweet(props) {
    const url = new URL(props.apiUrl)

    url.searchParams.append("tweet", props.id)
    url.searchParams.append("lang", props.lang || "en")

    const { data } = useSWR(url, fetcher)

    const content = isolateContent(data)
    const [timeString, dateString] = parseDate(data?.created_at)

    return (
        <Card>
            <BlockLink href={`https://twitter.com/${data?.user?.screen_name}/status/${props.id}`}>
                <Header>
                    <Avatar src={data?.user?.profile_image_url_https} />
                    <UserInfo>
                        <strong>
                            <span>{data?.user?.name}</span>
                            {data?.user?.verified && <Verified src={twitterVerified} alt="Verified" />}
                        </strong>
                        <span>@{data?.user?.screen_name}</span>
                    </UserInfo>
                    <TwitterLogo src={twitterLogo} alt="Twitter logo" />
                </Header>
                <Content>
                    {content}
                </Content>
                <Media data={data} />
                <Metadata>
                    <span>{timeString}</span>
                    <span> · </span>
                    <span>{dateString}</span>
                </Metadata>
                <Divider />
                <Stats>
                    <Stat>
                        <Reply /> <span>{data?.conversation_count}</span>
                    </Stat>
                    <Stat>
                        <Like /> <span>{data?.favorite_count}</span>
                    </Stat>
                </Stats>
            </BlockLink>
        </Card>
    )
}
