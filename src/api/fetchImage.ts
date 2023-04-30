export function fetchImage() {
    return fetch('https://api.thecatapi.com/v1/images/search?size=full')
        .then(res => res.json());
}