document.getElementById('searchButton').addEventListener('click', function() {
    const vocab = document.getElementById('vocabInput').value;
    const query = document.getElementById('queryInput').value;
    const lang = document.getElementById('langInput').value;

    fetch(`http://localhost:3000/rest/v1/search?vocab=${vocab}&query=${query}&lang=${lang}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched:', data);
            // Display the results in the UI
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = ''; // Clear previous results

            if (data.results && data.results.length > 0) {
                data.results.forEach(item => {
                    const resultDiv = document.createElement('div');
                    resultDiv.className = 'result-item';
                    resultDiv.innerHTML = `<strong>${item.label}</strong> (ID: ${item.id}, Language: ${item.lang})<br>${item.description}`;
                    resultsContainer.appendChild(resultDiv);
                });
            } else {
                resultsContainer.innerHTML = '<p>No results found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('results').innerHTML = `<p>Error: ${error.message}</p>`;
        });
});
