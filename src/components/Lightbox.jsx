import React, { useState } from 'react';
import { Modal, Box, Paper, Slider, Typography } from '@mui/material';
import GifCube from './GifCube';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  height: '80vh',
  bgcolor: 'background.default',
  boxShadow: 24,
  p: { xs: 2, md: 3 },
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 2, md: 3 },
  borderRadius: '12px',
};

const Lightbox = ({ gif, onClose }) => {
  const [rotationSpeed, setRotationSpeed] = useState(0.5);

  return (
    <Modal
      open={Boolean(gif)}
      onClose={onClose}
      aria-labelledby="gif-lightbox"
      aria-describedby="enlarged-gif-view"
      keepMounted
    >
      <Box sx={style}>
        {gif && (
          <>
            <Box sx={{ display: 'flex', flex: '1 1 auto', gap: { xs: 2, md: 4 }, height: 'calc(100% - 60px)' }}>
              <Box
                sx={{
                  flex: '1 1 55%',
                  height: '100%',
                  minWidth: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Paper
                  elevation={6}
                  sx={{
                    p: 1,
                    borderRadius: '12px',
                    lineHeight: 0,
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                >
                  <Box
                    component="img"
                    src={gif.images.original.url}
                    alt={gif.title}
                    sx={{
                      display: 'block',
                      maxWidth: '100%',
                      maxHeight: '100%',
                      borderRadius: '8px',
                    }}
                  />
                </Paper>
              </Box>
              <Paper
                elevation={6}
                sx={{
                  flex: '1 1 45%',
                  height: '100%',
                  minWidth: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                <GifCube gif={gif} rotationSpeed={rotationSpeed} />
              </Paper>
            </Box>
            <Box sx={{ flex: '0 0 auto', width: '50%', alignSelf: 'center' }}>
              <Typography id="rotation-speed-slider" gutterBottom>
                Rotation Speed
              </Typography>
              <Slider
                value={rotationSpeed}
                onChange={(e, newValue) => setRotationSpeed(newValue)}
                aria-labelledby="rotation-speed-slider"
                valueLabelDisplay="auto"
                step={0.1}
                marks
                min={0}
                max={2}
              />
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default Lightbox;
