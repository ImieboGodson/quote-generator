async function getQuote () {
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

    try {
        const fetchedData = await fetch(proxyUrl + apiUrl);
        const parsedData = await fetchedData.json();
        console.log(parsedData)
    } catch (err) {
        console.log('chai, something no work', err);
    }
}

getQuote();