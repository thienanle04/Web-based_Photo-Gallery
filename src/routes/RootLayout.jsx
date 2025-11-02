import React, { useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const RootLayout = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <ScrollRestoration /> 
      
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Lorem Picsum Gallery
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Outlet 
          context={{
            photos, setPhotos,
            page, setPage,
            hasMore, setHasMore,
            loading, setLoading
          }} 
        />
      </Container>
    </>
  );
};

export default RootLayout;