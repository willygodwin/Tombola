import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FileList from './FileList'
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
        width: '100%'
    },
    numberInput: {
        width: '100%',
        marginRight:0
    }
});

const CssOutlinedInput = withStyles({
    root: {
//MuiInputBase-input
    //   '&.Mui-focused': {
          //   color:'#FF6701',
          
            '&.MuiOutlinedInput-root':{
  
                '&.Mui-focused fieldset':{

                    '&.MuiOutlinedInput-notchedOutline':{
            
                        borderColor: '#FF6701',
                    }
                }
            }
            
        //   borderBottom: '2px solid #FF6701',
        //   color:'#FF6701'
        
        
 
    //   },
    },
  })(OutlinedInput);

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
            setTicketPrice(event.target.value/noTickets)
            return
        }
        else if(totalPrice > 0 && noTickets > 0) {
            console.log('hello');
            setTotalPrice(event.target.value)
            setTicketPrice(event.target.value/noTickets)
            
        }
        else if(noTickets > 0 ) {
            console.log('hello');
            setTotalPrice(event.target.value)
            setTicketPrice(event.target.value/noTickets)
        }
        else {
            setTotalPrice(event.target.value)
        }
        
    }

    const handleNoTickets = (event) => {
        
        let number
        if(ticketPrice > 0 && totalPrice > 0 && noTickets > 0){
            setNoTickets(event.target.value)
            setTicketPrice(totalPrice/event.target.value)
            return
        }
        else if(totalPrice > 0 && noTickets > 0) {
            console.log('hello');
            setNoTickets(event.target.value)
            setTicketPrice(totalPrice/event.target.value)
            
        }
        else if(noTickets > 0 ) {
            console.log('hello');
            setNoTickets(event.target.value)
            setTicketPrice(totalPrice/event.target.value)
        }
        else {
            setNoTickets(event.target.value)
        }
    }
    


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
        
        <Grid container justify="center">
            <Grid item xs={12} sm={12}>
            <form onSubmit={createPost}>

            <Typography variant="h5"  style={{textAlign: 'center'}}>
                Upload a new Tombola
            </Typography>
        
            <div style={{display:'flex', flexDirection: 'column', width: '100%'}}>

                <Typography variant="div">
                Title:
                </Typography>
                <CssOutlinedInput
                    onChange={handlePostTitle}
                    className={classes.newPost}
                    placeholder="Title"
                />
            </div>
            <div style={{display:'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
            <div style={{display:'flex', flexDirection: 'column'}}>
                <Typography variant="div">
                Total Price ($):
                </Typography>
                <CssOutlinedInput
                    onChange={handleTotalPrice}
                    // style={{width: '200px'}}
                    className={classes.numberInput}
                    placeholder="Total Price"
                    type='number'
                    // value ={totalPrice}
                />
            </div>
            <div style={{display:'flex', flexDirection: 'column'}}>
                <Typography variant="div">
                Ticket Price ($):
                </Typography>
                <OutlinedInput
                    // onChange={handleTicketPrice}
                    // style={{width: '200px'}}
                    
                    className={classes.numberInput}
                    placeholder="Price Per Ticket"
                    type='number'
                    value ={ticketPrice}
                    disabled={true}
                />
            </div>
            <div style={{display:'flex', flexDirection: 'column'}}>
                <Typography variant="div">
                Number of Tickets:
                </Typography>
                <CssOutlinedInput
                    onChange={handleNoTickets}
                    // style={{width: '200px'}}
                    className={classes.numberInput}
                    placeholder="Number of Tickets"
                    type='number'
                    // value ={noTickets}
                />
            </div>
                
               
            </div>
            <FileList onDropped={handleDrop} ></FileList>
            
               
                <div style={{display:'flex', flexDirection: 'column'}}>
                    <CssOutlinedInput
                        onChange={handlePostBody}
                        className={classes.newPost}
                        placeholder="Description"
                        multiline
                        rows={5}
                        rowsMax={10}
                    />
                </div>
            
                    <Grid container justify="flex-end">
                        <Button color="primary" style={{color: '#FF6701'}} onClick={createPost}>
                            Post!
                        </Button>
                    </Grid>
                </form >


            </Grid>
      

        
            </Grid>
        
            
        
       
    )

}

export default NewPost