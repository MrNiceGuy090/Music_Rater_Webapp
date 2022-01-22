import React, {useState, useEffect} from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';

import {db, storageRef} from '../../firebase'
import { doc, collection, setDoc, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import MediaRater from '../audio/MediaRater'
import MediaPlayer from '../audio/MediaPlayer'
import { rootShouldForwardProp } from '@mui/material/styles/styled';


const Discover = () => {
  const [audio, setAudio] = useState('');
  const [cover, setCover] = useState('');
  const [genre, setGenre] = useState('');
  const [trackName, setTrackName] = useState('');
  const [artistName, setArtistName] = useState('');

  const auth: any = useSelector((state: RootState) => state.auth);
  const rate: any = useSelector((state: RootState) => state.rate);

  useEffect(() => {
    const q = query(collection(db, '/tracks'), where("user", "!=", auth.user.id))
    getDocs(q).then((snapshot) => {
      setAudio(snapshot.docs[0].data().audio)
      setArtistName(snapshot.docs[0].data().artistName)
      setCover(snapshot.docs[0].data().cover)
      setGenre(snapshot.docs[0].data().genre)
      setTrackName(snapshot.docs[0].data().trackName)
      console.log(audio)
    })
    
  }, []);



  return(
    <Container>
        <Typography variant="h2">Rate songs</Typography>
        <br></br>
        <Container >
          <Box sx={{display:'flex'}}>
            <MediaPlayer audio={audio} artistName={artistName} albumCover={cover} trackName={trackName} ar ></MediaPlayer> 
            <Box>
              <MediaRater></MediaRater>
              <Typography variant="h6">Genre: {genre}</Typography>
            </Box> 
          </Box>
          <br></br>
          <TextField label="Review" sx={{m: "10px"}} fullWidth={true} multiline={true}></TextField>
          <br></br>
          <Button variant="contained" sx={{m: "10px"}}>Submit rating</Button>
          <Button variant="contained" sx={{m: "10px"}}>Next</Button>
        </Container>
    </Container>
  );
}

export default Discover; 