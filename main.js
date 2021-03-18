const quote = document.getElementById("quote-text");
const spinner = document.getElementById("loader");
const author = document.getElementById("quote-author");
const tweetButton = document.getElementById("tweet-btn");
const newQuoteButton = document.getElementById("new-quote-btn");



// asyn function to get data from API
async function getQuote () {
    const proxyUrl = 'https://immense-meadow-23437.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const fetchedData = await fetch(proxyUrl + apiUrl);
        const parsedData = await fetchedData.json();

        // If theres no authorText, it will display "Unknown" instead of leaving it empty
        if (parsedData.quoteAuthor.length === "") {
            author.innerText = "Unknown"
        } else {
            author.innerText = parsedData.quoteAuthor;
        }

        
        // Toggles the loader on/off while laoding the quoteText
        if (parsedData.quoteText.length === "") {
            spinner.classList.remove("loader-display");
        } else {
            spinner.classList.add("loader-display");
            quote.innerText = parsedData.quoteText;
        }
        
        
    // Catches error
    } catch (err) {
        console.log('chai, something broke', err);
        getQuote();
    }
}

// Tweet function for sharing quote on twitter
function tweetFunction () {
    let quoteText = quote.innerText;
    let quoteAuthor = author.innerText;
    let tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${quoteAuthor}`;

    window.open(tweetUrl, '_blank');
    console.log('button clicked');
}

// EventHandlers
newQuoteButton.addEventListener('click', getQuote);
tweetButton.addEventListener('click', tweetFunction);

// Calls the getQuote function
getQuote();