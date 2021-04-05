import React, { useState, useEffect } from 'react';
import Recipe from '../Recipe/Recipe';
import axios from 'axios';
// material
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';

// css
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    margin: '25px auto',
    alignItems: 'center',
    flexGrow: 1,
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
const SearchForm = () => {
  const classes = useStyles();
  const [recipe, setRecipe] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('banana');
  const APP_ID = '591284b5';
  const APP_KEY = '1a2f5c1f6b75510b4d388bad54a269f4';
  useEffect(() => {
    getRecipe();
  }, [query]);

  const getRecipe = async () => {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    setRecipe(response.data.hits);
    console.log(response.data.hits);
  };

  const updateSearch = (e) => {
    const seacrh_input = e.target.value;
    setSearch(seacrh_input);
  };
  const postQuery = (e) => {
    e.preventDefault();
    setQuery(search);
  };
  return (
    <div>
      <div className='search_form_body'>
        <Paper component='form' className={classes.root} onSubmit={postQuery}>
          <InputBase
            type='text'
            value={search}
            onChange={updateSearch}
            className={classes.input}
            placeholder='Search recipe '
            inputProps={{ 'aria-label': 'search recipe' }}
          />
          <IconButton
            type='submit'
            className={classes.iconButton}
            aria-label='search'
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <Container>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          spacing={3}
        >
          {recipe.map((recipe) => (
            <Grid item xs={3}>
              <Recipe
                // key={recipe.racipe.label}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default SearchForm;
