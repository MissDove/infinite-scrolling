(function () {

const quotesEl = document.querySelector('.quotes');
const loader = document.querySelector('.loader');

// get the quotes from the API
const getQuotes = async (page, limit) => {
    const API_URL = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=${limit}`;
    const response = await fetch(API_URL);

    // handle 404
    if (!response.ok) {
        throw new Error(`An error has occured: ${response.status}`)
    }

    return await response.json();

}

    // show the quotes
    const showQuotes = (quotes) => {
        quotes.forEach(quote => {
            const quoteEl = document.createElement('blockquote');
            quoteEl.classList.add('quote');

            quoteEl.innerHTML = `
            <span>${quote.id}</span>
            ${quote.quote}
            <footer>${quote.author}</footer>
            `;

            quotesEl.appendChild(quoteEl);
        });
    };

const hideLoader = () => {
    loader.classList.remove('show');
};

const showLoader = () => {
    loader.classList.add('show');
};


const hasMoreQuotes = (page, limit, total) => {
    const startIndex = (page - 1) * limit + 1;
    return total === 0 || startIndex < total;
}


// load Quotes
    const loadQuotes = async (page, limit) => {
    // show the loader
        showLoader();

        // to make sure that the loading indicator is always showing, add setTimeout() function

        // 0.5 second later
        setTimeout(async () => {
            try {
                // if having more quotes to fetch
                if (hasMoreQuotes(page, limit, total)) {
                    // call the API to get quotes
                    const response = await getQuotes(page, limit);

                    // show quotes
                    showQuotes(response.data);

                    // update the total
                    total = response.total;
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                hideLoader();
            }
        }, 500);

    };

    // control variables
    let currentPage = 1;
    const limit = 10;
    let total = 0;

    window.addEventListener("scroll", () => {
        const { scrollTop, scrollHeight, clientHeight} = document.documentElement;

        if ((scrollTop + clientHeight >= scrollHeight - 5) && hasMoreQuotes(currentPage, limit, total)) {
            currentPage++;
            loadQuotes(currentPage, limit);
        }}, {
        passive: false
    });

    // initialize
    loadQuotes(currentPage, limit);
})();