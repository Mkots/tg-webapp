import {TelegramWebApps} from "telegram-webapps-types";

export type ImageResponse = Array<{
    id: string;
    url: string
}>
export type QuoteResponse = {
    id: string;
    quote: string;
    author: string
}
export type ErrorResponse = {
    message: string;
}
export type TGWindow = Window & typeof globalThis & {
    Telegram: {
        WebApp: TelegramWebApps.WebApp;
    }
}