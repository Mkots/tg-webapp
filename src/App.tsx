import {useEffect, useState} from 'react'
import {useQuery} from '@tanstack/react-query';
import {TelegramWebApps} from "telegram-webapps-types";
import {Button, Card, Placeholder, Spinner} from "react-bootstrap";

import './App.scss'

type TGWindow = Window & typeof globalThis & {
    Telegram: {
        WebApp: TelegramWebApps.WebApp;
    }
}

const tg = (window as TGWindow).Telegram;

function fetchData() {
    return fetch('https://dummyjson.com/quotes/random')
        .then(res => res.json());
}

function App() {
    const [likesCount, setLikesCount] = useState(0);
    const [dislikesCount, setDislikesCount] = useState(0);
    const [isImageLoading, setIsImageLoading] = useState(true);

    function handleLike() {
        setLikesCount(likesCount + 1);
        setIsImageLoading(true);
    }
    function handleDislike() {
        setDislikesCount(dislikesCount + 1);
        setIsImageLoading(true);
    }

    const {isLoading, data, error} = useQuery<{id: string; quote: string; author: string}, {message: string}>({queryKey: ['quotes', likesCount, dislikesCount], queryFn: fetchData});

    useEffect(() => {
        tg.WebApp.ready();
    }, []);
    const user = tg.WebApp.initDataUnsafe.user;

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <Card style={{
            backgroundColor: "var(--tg-theme-bg-color)",
            color: "var(--tg-theme-text-color)"
        }} key={`card_${likesCount}_${dislikesCount}`}>
            <div
                className={isImageLoading ? "d-block" : "d-none"}
                style={{
                height: "50vh",
                textAlign: "center",
                paddingTop: "10%"
            }}>
                <Spinner animation="grow" style={{
                    width: "15rem",
                    height: "15rem",
                    backgroundColor: "var(--tg-theme-secondary-bg-color)"
                }}/>
            </div>
            <Card.Img
                variant="top"
                className={isImageLoading ? "d-none" : "d-block"}
                src={`https://cataas.com/cat?${likesCount}${dislikesCount}`}
                style={{
                    maxHeight: "50vh"
            }}
                onLoad={() => setIsImageLoading(false)}
            />
            <Card.Body>
                <Card.Title>Have a good day, {user?.first_name} {user?.last_name}!</Card.Title>
                {isLoading && (
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder>
                )}
                {data && (
                    <Card.Text key={data.id}>
                        {data.quote} - {data.author}
                    </Card.Text>
                )}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                <Button
                    variant="primary"
                    style={{
                        backgroundColor: "var(--tg-theme-button-color)",
                        color: "var(--tg-theme-button-text-color)",
                    }}
                    onClick={handleLike}
                >❤: {likesCount}️</Button>
                <Button
                    variant="primary"
                    style={{
                        backgroundColor: "var(--tg-theme-button-color)",
                        color: "var(--tg-theme-button-text-color)",

                    }}
                    onClick={handleDislike}
                >💔: {dislikesCount}</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default App
