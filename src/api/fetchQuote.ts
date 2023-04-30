export function fetchQuote() {
    return fetch('https://dummyjson.com/quotes/random')
        .then(res => res.json());
}