import refs from './refs';


export default {
    query: '',
    page: 1,
    apiKey: '18862670-b1698d422e60fbfd1dac31137',
    

// toGetFetch() {
//     let url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${this.apiKey}`;

//     fetch(url)
//     .then(res => res.json())
//     .then(data => console.log(data))
//     }

    async toGetFetch() {
        let url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${this.apiKey}`;

        let response = await fetch(url);
        let result = await response.json();

        return result.hits;
    },


    setPage() {
        return this.page += 1;
    }
}