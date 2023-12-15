const express = require('express');
const axios = require('axios');
const path = require('path'); // Import the 'path' module

const app = express();
const PORT = process.env.PORT || 3001; // Use the environment port if available

// Serve the React app's static files
app.use(express.static(path.join(__dirname, 'build')));

app.get('/image', async (req, res) => {
  try {
    // Fetch the image from Cloudinary
    const cloudinaryUrl = 'https://res.cloudinary.com/course4u/image/upload/v1691531557/ghss/photoshop-edited_9_zsq36x.jpg';
    const { data } = await axios.get(cloudinaryUrl, { responseType: 'arraybuffer' });

    // Cache the image (you can use a more sophisticated caching mechanism)
    // For simplicity, we're just storing it in memory
    const cachedImage = Buffer.from(data, 'binary');

    // Serve the cached image to the client
    res.set('Content-Type', 'image/jpeg');
    res.send(cachedImage);
  } catch (error) {
    console.error('Error fetching and caching image:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
