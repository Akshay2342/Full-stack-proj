import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { NavLink } from "react-router-dom"

const defaultTheme = createTheme();
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
export default function ViewBook() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      if (searchTerm) {
        axios.get(`http://localhost:5000/api/books/search?bookName=${searchTerm}`)
          .then(response => {
            setBooks(response.data);
          })
          .catch(error => {
            console.error(`There was an error retrieving the book data: ${error}`);
          });
      } else {
        setBooks([]);
      }
    }, [searchTerm]);
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleViewClick = (bookFilePath) => {
      // Open the book file in a new window or tab
     window.open(bookFilePath); 

    };
  
    return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <main>
          <Button variant="contained">
            <NavLink to="/register" className="text-decoration-none text-light">
              Add User
            </NavLink>
          </Button>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Search>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {books.map((book) => (
                <Grid item key={book.id} xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="div"
                      sx={{
                        pt: '56.25%',
                      }}
                      image={`data:image/jpeg;base64,${book.book_img}`}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2" style={{ marginBottom: '0' }}>
                        {book.username}
                      </Typography>
                      <Typography variant="caption" display="block" gutterBottom>
                        {book.author}
                      </Typography>
                      <Typography>{book.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleViewClick(`data:application/pdf;base64,${book.book_pdf}`)}>
                        View Book
                      </Button>
                    </CardActions>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                      <CardActions>
                        <Button size="small" style={{ width: '2px' }}>
                          <BookmarkBorderIcon />
                        </Button>
                        <AccountCircle />
                        <Typography variant="body1" gutterBottom>
                          cherry
                        </Typography>
                      </CardActions>
                    </div>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    );
  }