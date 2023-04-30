import {useEffect, useState} from 'react'
import {useQuery} from '@tanstack/react-query';
import {Card} from "react-bootstrap";

import {ErrorResponse, ImageResponse, QuoteResponse, TGWindow} from "./api/types";
import {fetchImage, fetchQuote} from "./api";

import CatImage from "./components/CatImage";
import Quote from "./components/Quote";
import ActionButtons from "./components/ActionButtons";
import './App.scss'

const tg = (window as TGWindow).Telegram;

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

    const {isLoading: isImgSrcLoading, data: imgSrc, error: imgSrcError} = useQuery<ImageResponse, ErrorResponse>({
        queryKey: ['imgSrc', likesCount, dislikesCount],
        queryFn: fetchImage
    });
    const {isLoading, data, error} = useQuery<QuoteResponse, ErrorResponse>({
        queryKey: ['quotes', likesCount, dislikesCount],
        queryFn: fetchQuote
    });

    useEffect(() => {
        tg.WebApp.ready();
    }, []);
    const user = tg.WebApp.initDataUnsafe.user;

    if (error || imgSrcError) {
        return <div>Error: {error?.message || imgSrcError?.message}</div>;
    }
    return (
        <Card style={{
            backgroundColor: "var(--tg-theme-bg-color)",
            color: "var(--tg-theme-text-color)"
        }} key={`card_${likesCount}_${dislikesCount}`}>
            <CatImage
                isLoading={isImageLoading || isImgSrcLoading}
                imgSrc={imgSrc?.[0]?.url}
                setLoadedState={setIsImageLoading}
            />
            <Card.Body>
                <Card.Title>Have a good day, {user?.first_name} {user?.last_name}!</Card.Title>
                <Quote
                    isLoading={isLoading}
                    data={data}
                />
                <ActionButtons
                likesCount={likesCount}
                dislikesCount={dislikesCount}
                handleLike={handleLike}
                handleDislike={handleDislike}
                />
            </Card.Body>
        </Card>
    )
}

export default App
