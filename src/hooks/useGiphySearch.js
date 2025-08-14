import { useState, useEffect, useCallback } from 'react';

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const BASE_URL = 'https://api.giphy.com/v1/gifs';

const useGiphySearch = (query) => {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchGifs = useCallback(async (currentQuery, currentOffset) => {
    setLoading(true);
    try {
      const url =
        currentQuery === 'trending'
          ? `${BASE_URL}/trending?api_key=${API_KEY}&limit=25&offset=${currentOffset}`
          : `${BASE_URL}/search?api_key=${API_KEY}&q=${currentQuery}&limit=25&offset=${currentOffset}`;

      const response = await fetch(url);
      const data = await response.json();

      setGifs((prevGifs) => {
        const newGifs = data.data.filter(newGif => !prevGifs.some(prevGif => prevGif.id === newGif.id));
        return [...prevGifs, ...newGifs];
      });
      setHasMore(data.pagination.count + data.pagination.offset < data.pagination.total_count);
    } catch (error) {
      console.error('Failed to fetch gifs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setGifs([]);
    setOffset(0);
    fetchGifs(query, 0);
  }, [query, fetchGifs]);

  const loadMore = useCallback(() => {
    const newOffset = offset + 25;
    setOffset(newOffset);
    fetchGifs(query, newOffset);
  }, [offset, query, fetchGifs]);

  return { gifs, loading, hasMore, loadMore };
};

export default useGiphySearch;
