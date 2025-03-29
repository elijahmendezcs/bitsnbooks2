import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const pages = ['Home', 'Catalog', 'About'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar 
      position="static"
      sx={{ 
        backgroundColor: '#1a1a1a', // Dark background for a modern look
        boxShadow: 'none'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <MenuBookIcon 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              mr: 1, 
              color: '#f39c12', 
              fontSize: 40 
            }} 
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto Mono, monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: '#f39c12',
              textDecoration: 'none',
            }}
          >
            BITS & BOOKS
          </Typography>

          {/* Mobile Menu Icon and Logo */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: '#f39c12' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  backgroundColor: '#2c2c2c',
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography 
                    textAlign="center"
                    sx={{
                      color: '#f39c12',
                      fontFamily: 'Roboto Mono, monospace'
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <MenuBookIcon 
            sx={{ 
              display: { xs: 'flex', md: 'none' }, 
              mr: 1, 
              color: '#f39c12', 
              fontSize: 32 
            }} 
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Roboto Mono, monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: '#f39c12',
              textDecoration: 'none',
            }}
          >
            BITS & BOOKS
          </Typography>

          {/* Desktop Navigation Links */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: '#ffffff',
                  display: 'block',
                  fontFamily: 'Roboto Mono, monospace',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: '#333333',
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
