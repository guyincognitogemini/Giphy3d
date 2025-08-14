import React, { useRef, useCallback } from 'react';
import { Grid, Card, CardMedia, CircularProgress, Box } from '@mui/material';

const GifGrid = ({ gifs, loading, loadMore, hasMore, onGifClick }) => {
  const observer = useRef();
  const lastGifElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  return (
    <Box>
      <Grid container spacing={{ xs: 1, md: 2 }}>
        {gifs.map((gif, index) => {
          const isLastElement = gifs.length === index + 1;
          return (
            <Grid xs={12} sm={6} md={4} lg={3} key={gif.id + '-' + index} ref={isLastElement ? lastGifElementRef : null}>
              <Card
                onClick={() => onGifClick(gif)}
                sx={{
                  cursor: 'pointer',
                  borderRadius: '12px', // New border radius
                  p: 1, // 8px padding
                }}
              >
                <CardMedia
                  component="img"
                  image={gif.images.fixed_height.url}
                  alt={gif.title}
                  sx={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px', // Slightly smaller radius for the image
                  }}
                />
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default GifGrid;
