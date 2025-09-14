const shortenBtn = document.getElementById('shorten-btn');
const longUrlInput = document.getElementById('long-url');
const resultContainer = document.getElementById('result-container');
const shortUrlLink = document.getElementById('short-url-link');
const copyBtn = document.getElementById('copy-btn');
const messageArea = document.getElementById('message-area');

shortenBtn.addEventListener('click', async () => {
    const longUrl = longUrlInput.value.trim();
    if (!longUrl) {
        messageArea.textContent = 'Please enter a URL.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ longUrl })
        });
        const data = await response.json();

        if (response.ok) {
            shortUrlLink.href = data.shortUrl;
            shortUrlLink.textContent = data.shortUrl;
            resultContainer.style.display = 'block';
            messageArea.textContent = '';
        } else {
            messageArea.textContent = data.error || 'Something went wrong.';
            resultContainer.style.display = 'none';
        }
    } catch (error) {
        messageArea.textContent = 'Server not responding. Make sure the server is running.';
        console.error('Fetch error:', error);
    }
});

copyBtn.addEventListener('click', () => {
    const textToCopy = shortUrlLink.href;
    navigator.clipboard.writeText(textToCopy).then(() => {
        messageArea.textContent = 'Copied to clipboard!';
        setTimeout(() => messageArea.textContent = '', 2000);
    }).catch(err => {
        console.error('Could not copy text: ', err);
        messageArea.textContent = 'Failed to copy URL.';
    });
});
