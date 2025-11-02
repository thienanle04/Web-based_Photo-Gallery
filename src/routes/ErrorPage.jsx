import React from 'react';
import { useRouteError, Link as RouterLink } from 'react-router-dom';

// MUI Imports
import { Container, Box, Typography, Button, Alert } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const ErrorPage = () => {
  const error = useRouteError(); // Hook to get error details
  console.error(error);

  let status = error.status || 500;
  let statusText = error.statusText || 'An unexpected error occurred';
  let message = error.data || 'Sorry, something went wrong.';

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" component="h1" fontWeight="bold" color="primary">
          {status}
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          {statusText}
        </Typography>
        <Alert severity="error" sx={{ mb: 3 }}>
          {message}
        </Alert>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          startIcon={<HomeIcon />}
        >
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;