let newQuoteButton = document.querySelector('#new-quote-button');
const quotesEndpoint = 'https://api.quotable.io/random';
let loadingIcon = document.querySelector('.loading-icon');
let tweetButton = document.querySelector('.twitter');

newQuoteButton.addEventListener('click', getQuote);

async function getQuote() {
  loadingIcon.classList.remove('hidden');
  newQuoteButton.disabled = true;
  try {
    let response = await fetch(quotesEndpoint)
    // If the response is not 200 OK...
    if (!response.ok) {
      // ...throw an error.
      throw Error(response.statusText)
    }
    let json = await response.json();
    displayQuote(json.content);
    displayAuthor(json.author);
    tweetIt(json.content, json.author);
  } catch (error) {
    console.log(error)
    alert('Failed to fetch new quote');
  } finally {
    newQuoteButton.disabled = false;
    loadingIcon.classList.add('hidden');
  }
}

function displayQuote(quote, author) {
  let quoteText = document.querySelector('.quote');
  let authorName = document.querySelector('.author')
  quoteText.textContent = quote;
  authorName.textContent = author;
}

function displayAuthor(author) {
  let authorName = document.querySelector('.author');
  authorName.textContent = author;
}

function tweetIt(quote, author) {
  tweetButton.setAttribute('href', `https://twitter.com/share?text=${quote} - ${author}`);
}

getQuote();
