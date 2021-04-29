import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Autocomplete from './Autocomplete1'
import axios from 'axios'


const  getUsers =  ()=>{
    return axios.get('http://localhost:3001/api/users', {
        withCredentials: true,
    })

 
}

const getPosts = () => {
    return axios.get('http://localhost:3001/api/posts', {
            withCredentials: true,
        })
  

}



function SearchContainer(props){

    const history = useHistory();
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])

    // call post api to load all the post in page
    // call post api to load all the post in page
    useEffect(() => {
        getUsers().then((results) => {
            setUsers(results.data.data)
            return getPosts()
        })
        .then((results) => {
            setPosts(results.data.data)
        })
        
        
       
        
    }, [])

    // console.log(users);
    // console.log(posts);

  

    // text area
    return (
        <Box>
            <Container>
                {/* text area to create new post */}
                
                <Autocomplete classes={props.classes} posts={posts} users={users}></Autocomplete>

                
            </Container>
        </Box>
    );
}
export default SearchContainer;