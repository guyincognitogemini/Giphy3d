import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', mb: 2 }}>
      <TextField
        label="Search Giphy"
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          ml: 1,
          '&:hover': {
            backgroundColor: 'secondary.main',
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;