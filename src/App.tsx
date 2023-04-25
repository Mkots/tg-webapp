import {useEffect} from 'react'
import {useQuery} from '@tanstack/react-query';
import {TelegramWebApps} from "telegram-webapps-types";
import {Button, Card} from "react-bootstrap";

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
    const {isLoading, data, error} = useQuery<{id: string; quote: string; author: string}, {message: string}>({queryKey: ['quotes'], queryFn: fetchData});

    useEffect(() => {
        tg.WebApp.ready();
    }, []);
    const user = tg.WebApp.initDataUnsafe.user;
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <Card style={{
            backgroundColor: "var(--tg-theme-bg-color)",
            color: "var(--tg-theme-text-color)"
        }}>
            <Card.Img variant="top" src="https://cataas.com/cat"/>
            <Card.Body>
                <Card.Title>{user?.first_name} {user?.last_name}</Card.Title>
                {data && (
                    <Card.Text key={data.id}>
                        {data.quote} - {data.author}
                    </Card.Text>
                )}
                <Button
                    variant="primary"
                    style={{
                        backgroundColor: "var(--tg-theme-button-color)",
                        color: "var(--tg-theme-button-text-color)",
                    }}
                    onClick={() => {
                        tg.WebApp.sendData({data: "♥"})
                    }}
                >Send Like</Button>
            </Card.Body>
        </Card>
    )
}

export default App
