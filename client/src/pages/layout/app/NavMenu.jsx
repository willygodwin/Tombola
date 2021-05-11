import React, {useState, useRef, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faUserCircle, faPlusSquare, faSafari } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const CssButton = withStyles({
    root: {
      '&.MuiButton-root': {
        minWidth:'unset', 
        padding:'0px',
        marginBottom: '2px'

      },
      '&.MuiButton-text': {
        padding: "0px" 
        
      }

    }

  })(Button);

export default function MenuListComposition(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    // <div className={classes.root}>
      <div style={{width:'auto', height:'auto', marginLeft:'0.5rem', marginRight:'0.5rem'}}>
        <CssButton
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          
        >
          {<FontAwesomeIcon icon={props.icon} style={{ color: props.active === 'profile' ? '#ff6701' : 'black' }} size="lg" />}
        </CssButton>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      
                    {props.links.map(link => {
                        return <MenuItem onClick={handleClose}><Link to={link.to} style={{ textDecoration: 'none', color: props.active === link.name.toLowerCase() ? '#ff6701' : 'black', marginLeft: '0.5rem', marginRight: '0.5rem' }}>{link.name}</Link></MenuItem>
                    })}
                    

                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    // </div>
  );
}