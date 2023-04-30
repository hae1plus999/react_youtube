export default class Youtube {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async search(keyword) {
        return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
    }

    async channelImageURL(id) {
        return this.apiClient
            .channels({ params: { part: 'snippet', id } })
            .then((res) => res.data.items[0].snippet.thumbnails.default.url);
    }

    async relatedVideos(id) {
        return this.apiClient.search({
                params: {
                    part: 'snippet',
                    maxResults: 25,
                    type: 'video',
                    relatedToVideoId: id
                },
            })
            .then((res) => res.data.items.map((item) => ({...item, id: item.id.videoId })));
    }

    async# searchByKeyword(keyword) {
        return this.apiClient
            .search({
                params: {
                    part: 'snippet',
                    maxResults: 25,
                    type: 'video',
                    q: keyword
                },
            })
            .then((res) => res.data.items)
            .then((items) => items.map((item) => ({...item, id: item.id.videoId })));
    }

    async# mostPopular(keyword) {
        return this.apiClient
            .videos({
                params: {
                    part: 'snippet',
                    maxResults: 25,
                    chart: 'mostPopular'
                }
            })
            .then((res) => res.data.items);
    }
}

// export default class Youtube {
//     constructor() {
//         this.httpClient = axios.create({
//             baseURL: 'https://www.gooleapis.com/youtube/v3',
//             params: {key: process.env.REACT_APP_YOUTUBE_API_KEY},
//         });
//     }

//     async search(keyword) {
//         return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
//     }

//     async #searchByKeyword(keyword) {
//         return this.httpClient
//             .get('search', {params: {
//                 part: 'snippet',
//                 maxResults: 25,
//                 type: 'video',
//                 q: keyword
//             }})
//             .then((res) => res.data.items)
//             .then((items) => items.map((item) => ({...item, id: item.id.videoId})));
//     }

//     async #mostPopular(keyword) {
//         return this.httpClient
//             .get('videos', {params: {
//                 part: 'snippet',
//                 maxResults: 25,
//                 chart: 'mostPopular'
//             }})
//             .then((res) => res.data.items);
//     }
// }