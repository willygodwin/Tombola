import React, { useState, useEffect } from 'react';
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
import { faHome, faSearch, faUserCircle, faPlusSquare, faBars } from '@fortawesome/free-solid-svg-icons'
import Grid from '@material-ui/core/Grid';
import SearchContainer from '../../../containers/explore/searchcontent/SearchContainer'
import { Link, useLocation, useParams } from 'react-router-dom';
import NavMenu from './NavMenu'



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
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const store = GlobalStore.useGlobalContext()
  const location = useLocation();
  let { id } = useParams();
  const [active, setActive] = useState('')
  const [width, setWindowWidth] = useState(0);



  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const responsive = {
    showTopNavMenu: width > 1023
  }

  // console.log(store.auth.authState.currentUser._id);
  const logout = () => {
    axios.get('/api/logout')
      .then((response) => {
        // window.location.href = '/'
      }).catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    // console.log(location);

    if (location.pathname === '/newsfeed' || location.pathname === '/wall') {
      setActive('home')
    }
    else if (location.pathname === '/explore') {
      setActive('explore')
    }
    else if (location.pathname === '/upload') {
      setActive('upload')
    }
    else if (location.pathname === `/profile/${id}`) {
      setActive('profile')
    }
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);

  }, [])


  //
  const propsPC = {
    icon: faUserCircle,
    active: active,

    links: [{
      to: `/profile/${store.auth.authState.currentUser._id}`,
      name: 'Profile'
    },
    {
      onClick: logout,
      to: '/',
      name: 'Logout'
    }

    ]

  }

  const propsMobile = {
    icon: faBars,
    active: active,

    links: [
      {
        to: `/newsfeed`,
        name: 'Home'
      },
      {
        to: `/explore`,
        name: 'Explore'
      },
      {
        to: `/upload`,
        name: 'Upload'

      },
      {
        to: `/profile/${store.auth.authState.currentUser._id}`,
        name: 'Profile'
      },
      {
        onClick: logout,
        to: '/',
        name: 'Logout'
      }

    ]
  }
  const renderNavLinks = () => {
    if (responsive.showTopNavMenu) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Link to='/newsfeed' style={{ textDecoration: 'none', color: active === 'home' ? '#ff6701' : 'black', marginLeft: '0.5rem', marginRight: '0.5rem' }}><FontAwesomeIcon icon={faHome} size="lg" /></Link>
          <Link to='/explore' style={{ textDecoration: 'none', color: active === 'explore' ? '#ff6701' : 'black', marginLeft: '0.5rem', marginRight: '0.5rem' }}><FontAwesomeIcon icon={faSearch} size="lg" /></Link>
          <Link to='/upload' style={{ textDecoration: 'none', color: active === 'upload' ? '#ff6701' : 'black', marginLeft: '0.5rem', marginRight: '0.5rem' }}><FontAwesomeIcon icon={faPlusSquare} size="lg" /></Link>
          <NavMenu {...propsPC}>
          </NavMenu>
          {/* <Link to={`/profile/${store.auth.authState.currentUser._id}`} style={{ textDecoration: 'none', color: active === 'profile' ? '#ff6701' : 'black', marginLeft: '0.5rem', marginRight: '0.5rem' }}><FontAwesomeIcon icon={faUserCircle} size="lg" /></Link>
                  <Button onClick={logout} style={{ color: "black" }}> Logout</Button> */}
        </div>
      )
    }
    return (<div >
      <NavMenu {...propsMobile}></NavMenu>
    </div>)
  }


  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ backgroundColor: 'rgba(var(--d87,255,255,255),1)', boxShadow: 'none', borderBottom: '1px solid #ccc' }}>
        <Toolbar >
          <Grid container spacing={3} justify="center">
            <Grid item sm={2}>

            </Grid>
            <Grid item sm={2} >
              <img src="/images/Tombola-04.png" style={{height:'65px'}}alt="Tombola" />
              {/* <Typography variant="h6" className={classes.title} style={{ paddingLeft: '10px', color: '#ff6701' }}>
                Tombola
                    </Typography> */}
            </Grid>
            <Grid item sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              <SearchContainer
              />

            </Grid>
            <Grid item sm={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              {renderNavLinks()}

              {/* {responsive.showTopNavMenu ?
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Link to='/newsfeed' style={{ textDecoration: 'none', color: active === 'home' ? '#ff6701' : 'black', marginLeft: '0.5rem', marginRight: '0.5rem' }}><FontAwesomeIcon icon={faHome} size="lg" /></Link>
                  <Link to='/explore' style={{ textDecoration: 'none', color: active === 'explore' ? '#ff6701' : 'black', marginLeft: '0.5rem', marginRight: '0.5rem' }}><FontAwesomeIcon icon={faSearch} size="lg" /></Link>
                  <Link to='/upload' style={{ textDecoration: 'none', color: active === 'upload' ? '#ff6701' : 'black', marginLeft: '0.5rem', marginRight: '0.5rem' }}><FontAwesomeIcon icon={faPlusSquare} size="lg" /></Link>
                  <NavMenu {...propsPC}>
                  </NavMenu> */}
              {/* <Link to={`/profile/${store.auth.authState.currentUser._id}`} style={{ textDecoration: 'none', color: active === 'profile' ? '#ff6701' : 'black', marginLeft: '0.5rem', marginRight: '0.5rem' }}><FontAwesomeIcon icon={faUserCircle} size="lg" /></Link>
                  <Button onClick={logout} style={{ color: "black" }}> Logout</Button> */}
              {/* </div>
                : <div >
                  <NavMenu {...propsMobile}></NavMenu>
                </div>} */}
            </Grid>
            <Grid item sm={2}>

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