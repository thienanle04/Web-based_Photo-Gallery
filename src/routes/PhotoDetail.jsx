import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Button,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PhotoDetail = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://picsum.photos/id/${id}/info`
        );
        setPhoto(response.data);
      } catch (err) {
        console.error('Error fetching photo details:', err);
        setError('Failed to load photo details. Please try again.');
      }
      setLoading(false);
    };

    fetchPhotoDetails();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error">{error}</Alert>
        <Button
          onClick={handleBack} 
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
          variant="outlined"
        >
          Back to List
        </Button>
      </Container>
    );
  }

  if (!photo) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Button
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Back to List
      </Button>

      <Typography variant="h3" component="h1" gutterBottom>
        Photo by: {photo.author}
      </Typography>

      <Box
        component="img"
        src={photo.download_url}
        alt={photo.author}
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: 2,
          boxShadow: 3,
        }}
      />

      <Typography variant="h5" component="h2" sx={{ mt: 3 }}>
        Author: {photo.author}
      </Typography>
      
      <Typography variant="body1" color="text.secondary">
        Original Dimensions: {photo.width} x {photo.height}
      </Typography>

      <Typography variant="body1" sx={{ mt: 2 }}>
        This is a placeholder description for the image. The Lorem Picsum API
        provides beautiful images but does not include descriptive text or
        titles.
      </Typography>
    </Container>
  );
};

export default PhotoDetail;