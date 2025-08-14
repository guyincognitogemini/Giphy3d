import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import SearchBar from './components/SearchBar';
import GifGrid from './components/GifGrid';
import Lightbox from './components/Lightbox';
import useGiphySearch from './hooks/useGiphySearch';

function App() {
  const [query, setQuery] = useState('trending');
  const [selectedGif, setSelectedGif] = useState(null);
  const { gifs, loading, hasMore, loadMore } = useGiphySearch(query);

  const handleSearch = (newQuery) => {
    if (newQuery) {
      setQuery(newQuery);
    }
  };

  const handleGifClick = (gif) => {
    setSelectedGif(gif);
  };

  const handleCloseLightbox = () => {
    setSelectedGif(null);
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Giphy Search
        </Typography>
        <SearchBar onSearch={handleSearch} />
        <GifGrid gifs={gifs} loading={loading} loadMore={loadMore} hasMore={hasMore} onGifClick={handleGifClick} />
        <Lightbox gif={selectedGif} onClose={handleCloseLightbox} />
      </Box>
    </Container>
  );
}

export default App;