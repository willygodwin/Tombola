import React, { useEffect, useState, useRef } from "react";
import { Avatar } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import InputBase from '@material-ui/core/InputBase';

import "./Autocomplete.css";

const Auto = (props) => {
  const [display, setDisplay] = useState(false);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

const usersInfo = () => {
    const image = 'images/kanye.png'

    return props.users.map((option) => {
        // console.log(option);
        let firstLetter
        let name
        if (option.name === undefined) {
          firstLetter = 'Z'
          name = "dwillis"
          
        } else{
          firstLetter = option.name[0].toUpperCase();
          name = option.name
  
        }
        // console.log(firstLetter);
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          type: "Users",
          ...option,
          name,
          image
          
      };
      });

        
}

const postsInfo = () => {
    return props.posts.map((option) => {
        //   console.log(option);
          let firstLetter
          let name 
          let image = option.image_refs[0]
          if (option.title === undefined) {
            firstLetter = 'Z'
            name = 'Zilla'
          } else{
            firstLetter = option.title[0].toUpperCase();
            name = option.title
          }
        //   console.log(firstLetter);
          return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            type: 'Posts',
            name,
            ...option,
            image
        };
    
     
      });
}
 
useEffect(() => {

    // setOptions(inputoptions())
    setUsers(usersInfo())
    setPosts(postsInfo())

  }, [props] )


  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const updatePokeDex = poke => {
    setSearch(poke);
    setDisplay(false);
  };

const renderSuggestion = (type, searchInfo) => {
    return (<div> 
    <Typography gutterBottom variant="body1" component="h2" style={{ marginBottom: '0px', marginLeft:'1rem'}}>
        {type}
    </Typography>   
    {searchInfo
        .filter((value) => {
            return value.name.toLowerCase().includes(search.toLowerCase())})
        .slice(0, 5)
        .map((value, i) => { 
            let link 
            if (type === "Users"){
                link = 'profile'
            }
            if (type === 'Posts'){
                link = 'posts'
            }
            if(value.type === type) {

                return (
                    <div
                    onClick={() => updatePokeDex(value.name)}
                    
                    key={i}
                    tabIndex="0"
                    >
                        <a href={`${link}/${value._id}`} className="option">
                            <Avatar alt="Kanye" src={value.image} />
                            <Typography variant="body1" color="textSecondary" component="p" style={{ display:'flex', alignItems:'center',}}>
                                {value.name}
                            </Typography>
                        </a>
                    
                    </div>
                );
            }
        })
    }
    </div>
    )
}

  const renderSearchBar = () => {
    if (props.posts.length === 0 ) {
      return (<div>Loaddingnngngng.......</div>)
    }
    else if(props.users.length === 0 )
    {
      return (<div>Loaddingnngngng.......</div>)
    }

    return (
        
        
            <div ref={wrapperRef} className="flex-container flex-column pos-rel" style={{width:'100%'}}>
            
            {/* <input
                id="auto"
                onClick={() => {
                    setDisplay(!display)}}
                placeholder="Type to search for users or posts"
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value)
                }}
            /> */}
            <InputBase
                placeholder="Search for posts or users"
                classes={{
                    root: props.classes.root,
                    input: props.classes.input,
                }}
                onClick={() => {
                setDisplay(!display)}}
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value)
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
            {display && (
                <div className="autoContainer"> 
                {renderSuggestion('Users', users)}
                {renderSuggestion('Posts', posts)}
                </div>
                
            )}
            </div>
        
      );
    
  }

  return (
    <div className="auto-container">
      {renderSearchBar()}
    </div>
  )
 
};



export default Auto;