const quote = document.getElementById("quote-text");
const spinner = document.getElementById("loader");
const author = document.getElementById("quote-author");
const tweetButton = document.getElementById("tweet-btn");
const newQuoteButton = document.getElementById("new-quote-btn");


function timeoutFunction () {
    
}


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

        
        // Toggles the loader on/off
        if (parsedData.quoteText.length === "") {
            spinner.hidden = false;
            quote.hidden = true;
        } else {
            quote.innerText = parsedData.quoteText;
            spinner.hidden = true;
            quote.hidden = false;
        }
        
    } catch (err) {
        console.log('Ooops, something broke', err);
        getQuote();
    }
}

// Tweet function for sharing quote on twitter
function tweetFunction () {
    let quoteString = quote.innerText;
    let authorString = author.innerText;
    let tweetUrl = `https://twitter.com/intent/tweet?text="${quoteString}" - ${authorString}`;

    // Creates the tweet in  a new window
    window.open(tweetUrl, '_blank');
}

// Event Handlers
newQuoteButton.addEventListener('click', getQuote);
tweetButton.addEventListener('click', tweetFunction);

// Calls the getQuote function
getQuote();