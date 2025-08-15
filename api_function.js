const url = 'https://pctsfmsaxrfljpbscoou.supabase.co/rest/v1/Quotes';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjdHNmbXNheHJmbGpwYnNjb291Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI5MTY4MywiZXhwIjoyMDcwODY3NjgzfQ.rDcII6Z2QcJeNVDqryc2Ua1m0xb7RgZNMg1pUW4UNoU';

async function fetchData(url, api_key) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'apikey': api_key,
                'Authorization': `Bearer ${api_key}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data, status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error; 
    }
}

// Main execution
(async () => {
    try {
        const container = document.getElementById('quotes-container');
        if (!container) {
            throw new Error('Quotes container not found');
        }

        const quotes = await fetchData(url, apiKey);
        console.log('Fetched quotes:', quotes);

        // Clear previous content
        container.innerHTML = '';

        // Add each quote to the container
        quotes.forEach(item => {
            const quoteElement = document.createElement('h6');
            quoteElement.textContent = item.Quote || item.quote || 'No quote text available';
            container.appendChild(quoteElement);
        });

    } catch (error) {
        console.error('Error:', error);
        const container = document.getElementById('quotes-container');
        if (container) {
            container.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        }
    }
})();