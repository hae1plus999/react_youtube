import axios from 'axios';

// export async function search (keyword) {
//     return axios.get(`/videos/${keyword ? 'search' : 'popular'}.json`)
//     .then(res => res.data.items);
// };

export default class FakeYoutubeClient {
    async search({ params }) {
        return params.relatedToVideoId 
            ? axios.get('/videos/related.json') 
            : axios.get('/videos/search.json');
    }

    async videos(keyword) {
        return axios.get('/videos/popular.json');
    }

    async channels(keyword) {
        return axios.get('/videos/channel.json');
    }
}