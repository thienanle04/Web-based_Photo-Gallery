import React, { useEffect, useRef, useCallback } from "react";
import axios from "axios";
// Import useOutletContext
import { Link as RouterLink, useOutletContext } from "react-router-dom"; 
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

const PhotoList = () => {
  const {
    photos, setPhotos,
    page, setPage,
    hasMore, setHasMore,
    loading, setLoading
  } = useOutletContext();

  const observer = useRef();

  const lastPhotoElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, setPage] // Add setPage to dependencies
  );

  const fetchPhotos = useCallback(async () => {
    const expectedPhotos = (page - 1) * 20; // 20 is the API limit
    if (loading || !hasMore || photos.length > expectedPhotos) {
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=20`
      );
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((prevPhotos) => {
          const allPhotos = [...prevPhotos, ...response.data];
          const uniquePhotos = Array.from(
            new Set(allPhotos.map((p) => p.id))
          ).map((id) => allPhotos.find((p) => p.id === id));
          return uniquePhotos;
        });
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
    setLoading(false);
  }, [page, loading, hasMore, photos.length, setPhotos, setHasMore, setLoading]); 

  useEffect(() => {
    fetchPhotos();
  }, [page, fetchPhotos]); 

  return (
    <Box>
      {/* START of PHOTO LIST */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {photos.map((photo) => (
          // This Box acts as the flex item
          <Box
            key={photo.id}
            sx={{
              flexBasis: "300px", 
              flexGrow: 1, 
              minWidth: "280px", 
              maxWidth: "400px", 
            }}
          >
            <Card sx={{ height: "100%" }}>
              <CardActionArea component={RouterLink} to={`/photos/${photo.id}`}>
                <CardMedia
                  component="img"
                  height="250"
                  image={`https://picsum.photos/id/${photo.id}/400/300`}
                  alt={photo.author}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" noWrap>
                    {photo.author}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Box>
      {/* === END OF PHOTO LIST === */}

      {/* Loader and End-of-List Indicator */}
      <Box
        ref={lastPhotoElementRef}
        sx={{ display: "flex", justifyContent: "center", p: 4 }}
      >
        {loading && <CircularProgress />}
        {!loading && !hasMore && (
          <Typography>You've reached the end of the list!</Typography>
        )}
      </Box>
    </Box>
  );
};

export default PhotoList;