import React, {useState, useEffect} from 'react';
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
import { Link, useLocation, useParams } from 'react-router-dom';



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
    color: 'black',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color: 'black',
    backgroundColor: 'rgba(var(--b3f,250,250,250),1)',
    '&:hover': {
      backgroundColor: fade('rgba(var(--b3f,250,250,250),1)'),
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
    color:'grey',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'black',
    backgroundColor: 'none'

  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    color: 'black',
    backgroundColor: 'none',
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
  const store = GlobalStore.useGlobalContext()
  const [active, setActive] = useState('') 
  const location = useLocation();
  let { id } = useParams();

  console.log(store.auth.authState.currentUser._id); 
  const logout = () => {
    axios.get('http://localhost:3001/api/logout')
        .then((response) => {
            window.location.href = '/'
        }).catch((err) => {
            console.log(err);
        })
}

  useEffect(() => {
    console.log(location);
    if(location.pathname === '/newsfeed') {
      setActive('home')
    }
    else if(location.pathname === '/explore') {
      setActive('explore')
    }
    else if(location.pathname === '/upload') {
      setActive('upload')
    }
    else if(location.pathname === `/profile/${id}`) {
      setActive('profile')
    }
    
  
  }, [])


 //


  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{backgroundColor: 'rgba(var(--d87,255,255,255),1)', boxShadow: 'none', borderBottom: '1px solid #ccc'}}>
        <Toolbar >
        <Grid container spacing={3} justify="center">
                <Grid item sm={3}>
                   
                </Grid>
                <Grid item sm={2} >
                    <Typography variant="h6" className={classes.title} style={{paddingLeft: '10px', color: '#ff6701'}}>
                        Tombola
                    </Typography>
                </Grid>
                <Grid item  sm={3} style={{display:'flex', alignItems:'center'}}>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                      <SearchIcon />
                      </div>
                      <SearchContainer
                     />
                    </div>
                </Grid>
                <Grid item  sm={1}>
                   
                </Grid>
                <Grid item  sm={3}>
                <div>
                    <Link to='/newsfeed' style={{textDecoration:'none', color: active=== 'home' ? '#ff6701': 'black', marginLeft:'0.5rem', marginRight:'0.5rem'}}><FontAwesomeIcon icon={faHome} size="lg"/></Link>
                    <Link to='/explore' style={{textDecoration:'none', color: active=== 'explore' ? '#ff6701': 'black', marginLeft:'0.5rem', marginRight:'0.5rem'}}><FontAwesomeIcon icon={faSearch} size="lg"/></Link>
                    <Link to='/upload' style={{textDecoration:'none', color: active=== 'upload' ? '#ff6701': 'black', marginLeft:'0.5rem', marginRight:'0.5rem'}}><FontAwesomeIcon  icon={faPlusSquare} size="lg"/></Link>
                    <Link to={`/profile/${store.auth.authState.currentUser._id}`} style={{textDecoration:'none', color: active=== 'profile' ? '#ff6701': 'black', marginLeft:'0.5rem', marginRight:'0.5rem'}}><FontAwesomeIcon  icon={faUserCircle} size="lg" /></Link>
                    <Button onClick={logout} style={{color:"black"}}> Logout</Button>
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