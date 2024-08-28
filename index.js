const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Mock Data
const mockData = {
  'Test': [
    {
      id: '1',
      label: 'Art History',
      lang: 'fi',
      description: 'A comprehensive overview of art history in Finland.'
    },
    {
      id: '2',
      label: 'Modern Art',
      lang: 'fi',
      description: 'An exploration of modern art trends in Finland.'
    }
  ],
  'ysa': [
    {
      id: '3',
      label: 'Traditional Art',
      lang: 'fi',
      description: 'Insights into traditional Finnish art forms.'
    },
    {
      id: '4',
      label: 'Contemporary Art',
      lang: 'en',
      description: 'Exploring contemporary art from an international perspective.'
    },
    {
      id: '5',
      label: 'Modern Art',
      lang: 'fi',
      description: 'Modern art movements and their influence in Finland.'
    }
  ]
};

// API Endpoint
app.get('/rest/v1/search', (req, res) => {
  const { vocab, query, lang } = req.query;

  console.log('Query Parameters:', { vocab, query, lang });

  // Filter mock data based on query parameters
  const results = (mockData[vocab] || [])
    .filter(item =>
      item.label.toLowerCase().includes(query.toLowerCase()) &&
      item.lang === lang
    );

  console.log('Filtered Data:', results);

  // Return results as JSON
  res.json({ results });
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
