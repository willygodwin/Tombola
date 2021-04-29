import React, {useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/Button";
import GlobalStore from "../../../utils/context/GlobalStore";
import isEmpty from "lodash/isEmpty";
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faUserCircle, faPlusSquare, faSafari  } from '@fortawesome/free-solid-svg-icons'
import Grid from '@material-ui/core/Grid';
import SearchContainer from '../../../containers/explore/searchcontent/SearchContainer'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
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

export default function SearchAppBar() {
  const classes = useStyles();
  let id 

  const logout = () => {
    axios.get('http://localhost:3001/api/logout')
        .then((response) => {
            window.location.href = '/'
        }).catch((err) => {
            console.log(err);
        })
}

  const getProfile = () => {
    axios.get('http://localhost:3001/api/current-user')
    .then((response) => {
      console.log(response.data.data._id);
      id = response.data.data._id
      window.location.href = `/profile/${id}`
    }).catch((err) => {
      console.log(err);
    })
  }
 


  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar >
        <Grid container spacing={3}>
                <Grid item  sm={3}>
                   
                </Grid>
                <Grid item  sm={2}>
                    <Typography variant="h6" className={classes.title}>
                        Tombola
                    </Typography>
                </Grid>
                <Grid item  sm={3}>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                      <SearchIcon />
                      </div>
                      <SearchContainer
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}/>
                      {/* <InputBase
                      placeholder="Search…"
                      classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                      /> */}
                    </div>
                </Grid>
                <Grid item  sm={1}>
                   
                </Grid>
                <Grid item  sm={3}>
                <div>
                    <a href='/newsfeed' style={{textDecoration:'none', color:'white', marginLeft:'0.5rem', marginRight:'0.5rem' }}><FontAwesomeIcon icon={faHome} size="lg"/></a>
                    <a href='/explore' style={{textDecoration:'none', color:'white', marginLeft:'0.5rem', marginRight:'0.5rem'}}><FontAwesomeIcon icon={faSearch} size="lg"/></a> 
                    <a href='/upload' style={{textDecoration:'none', color:'white', marginLeft:'0.5rem', marginRight:'0.5rem'}}><FontAwesomeIcon icon={faPlusSquare} size="lg"/></a>
                    <a onClick={getProfile} style={{textDecoration:'none', color:'white', marginLeft:'0.5rem', marginRight:'0.5rem'}}><FontAwesomeIcon icon={faUserCircle} size="lg" /></a> 
                    <Button onClick={logout} color="inherit"> Logout</Button>
                </div>


                {/* if user is not logged in then we display the logout button */}
            
                
                </Grid>
            </Grid>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
           

        


            

        </Toolbar>
      </AppBar>
    </div>
  );
}