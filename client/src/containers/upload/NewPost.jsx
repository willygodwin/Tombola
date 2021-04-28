import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FileList from './FileList'
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory } from 'react-router';


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    postItem: {
        marginTop: 30,
        marginBottom: 30,
    },
    newPost: {
        marginTop: 30,
        marginBottom: 30,
        width: 400
    },
    numberInput: {
        width: 100,
        marginRight:50
    }
});

function NewPost(props){
    const history = useHistory()

    const classes = useStyles();
    axios.defaults.withCredentials = true;

    
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [totalPrice, setTotalPrice] = useState(0)
    const [ticketPrice, setTicketPrice] = useState(0)
    const [noTickets, setNoTickets] = useState(0)
    const [files, setFiles] = useState([]);

    const handlePostBody = (event) => {
        setDescription(event.target.value)
    }

    const handlePostTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleTotalPrice = (event) => {
        
        if(ticketPrice > 0 && totalPrice > 0 && noTickets > 0){
            setTotalPrice(event.target.value)
            return
        }
        else if(noTickets > 0 && ticketPrice > 0) {
            console.log('hello');
            setTotalPrice(noTickets * ticketPrice)
        }
        else {
            setTotalPrice(event.target.value)
        }
        
    }

    const handleNoTickets = (event) => {
        
        let number
        if(ticketPrice > 0 && totalPrice > 0 && noTickets > 0){
            setNoTickets(event.target.value)
            return
        }
        else if(ticketPrice > 0 && totalPrice > 0){
            number = Math.round(totalPrice/ticketPrice)
            setNoTickets(number)
            setTotalPrice(number * ticketPrice)
        }
        else {
            setNoTickets(event.target.value)
        }
    }
    
        const handleTicketPrice = (event) => {
            let number
            if(ticketPrice > 0 && totalPrice > 0 && noTickets > 0){
                setTicketPrice(event.target.value)
                return
            }
            else if(noTickets > 0 && totalPrice > 0) {
                number = Math.round(totalPrice/noTickets)
                setTicketPrice(number)
                setTotalPrice(number * noTickets)
            }
            else {
                setTicketPrice(event.target.value)
            }
        }
    

        // const handlePrices = (event) => {
        //     console.log("hello");
        //     let number
 
        //     else if(ticketPrice > 0 && totalPrice > 0){
        //         number = Math.round(totalPrice/ticketPrice)
        //         setNoTickets(number)
        //         setTotalPrice(number * ticketPrice)
        //     } 
        //     else if(noTickets > 0 && ticketPrice > 0) {
        //         console.log('hello');
        //         setTotalPrice(noTickets * ticketPrice)
        //     }
          
        // }
    


    const handleDrop = (filesDropped) => {
        setFiles(filesDropped)
    }

    function createFormData(payload) {
        console.log(payload);
        const formData = new FormData();

        for (const key in payload) {
            
            const element = payload[key];
            console.log('start', element);

            if(element instanceof Array){
                console.log(("if working"));

                element.forEach((ele, index) => {
                    console.log("for each working", ele);
                    formData.append(`${key}[${index}]`, ele);
                })

            }else{
                console.log('else working', element);

                formData.append(key, element)
            }
        }
        return formData
        
    }
    const createPost = (event) => {
        console.log(files);

        const payload =  {
            title,
            description,
            files,
            totalPrice,
            ticketPrice,
            noTickets


        }

        const formData = createFormData(payload)

        console.log(formData);
      
        for (var value of formData.values()) {
            console.log('FormData: ', value);
         }

        event.preventDefault();

        fetch('http://localhost:3001/api/posts', {
            method: 'POST',
            // headers: {
            //     'Accept': 'application/json',
            // },
            body: formData,
            credentials: 'include',
        } )
        .then((res) => res.json())
        .then((response) => {
            console.log(response);

            history.push("/wall");
            // const newPost = response.data.data;
            // props.setPosts([
            //     newPost,
            //     ...props.posts,
            // ])
        });
    }

  
    return (
        <>
        <Grid container justify="center">
            <Typography variant="h5">
                Upload a new Tombola
            </Typography>
        </Grid>

        <Grid container justify="center">
            <OutlinedInput
                onChange={handlePostTitle}
                className={classes.newPost}
                placeholder="Title"
            />
            <div style={{display:'flex', flexDirection: 'row', }}>
                <OutlinedInput
                    onChange={handleTotalPrice}
                    className={classes.numberInput}
                    placeholder="Total Price"
                    type='number'
                    value ={totalPrice}
                />
                <OutlinedInput
                    onChange={handleTicketPrice}
                    className={classes.numberInput}
                    placeholder="Price Per Ticket"
                    type='number'
                    value ={ticketPrice}
                />
                
                <OutlinedInput
                    onChange={handleNoTickets}
                    className={classes.numberInput}
                    placeholder="Number of Tickets"
                    type='number'
                    value ={noTickets}
                />
                
               
            </div>
      

        </Grid>

        <Grid container justify="center">
        <FileList onDropped={handleDrop} ></FileList>
        
            <form onSubmit={createPost}>
                <OutlinedInput
                    onChange={handlePostBody}
                    className={classes.newPost}
                    placeholder="Description"
                    multiline
                    rows={5}
                    rowsMax={10}
                />
                
                <Grid container justify="flex-end">
                    <Button color="primary" onClick={createPost}>
                        Post!
                    </Button>
                </Grid>
            </form >
        </Grid>
        </>
    )

}

export default NewPost