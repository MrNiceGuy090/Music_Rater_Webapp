import React, {useState, useEffect} from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';

import {db} from '../../firebase'
import { doc, collection, setDoc, getDocs, updateDoc, query, where, increment } from "firebase/firestore";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setSuccess, setError } from '../../store/actions/alertActions';
import { setReview, setTrack, setWholeState } from '../../store/actions/rateActions';
import { setUser } from '../../store/actions/authActions'

import MediaRater from '../audio/MediaRater'
import MediaPlayer from '../audio/MediaPlayer'
import Loader from '../Loader';


const Discover = () => {
  const [isLoading, setLoading] = useState(true);
  const [noTrackFound, setNoTrackFound] = useState(false);
  const [audio, setAudio] = useState('');
  const [cover, setCover] = useState('');
  const [genre, setGenre] = useState('');
  const [trackName, setTrackName] = useState('');
  const [artistName, setArtistName] = useState('');

  const auth: any = useSelector((state: RootState) => state.auth);
  const rate: any = useSelector((state: RootState) => state.rate);
  const dispatch = useDispatch();

  useEffect(() => {
    getNewTrack();        
    return () => {
      dispatch(setSuccess(''));
    }
  }, []);

  const getNewTrack = async () =>{
    setLoading(true);
    getDocs(query(collection(db, '/tracks'), where("user", "!=", auth.user.id))).then(async (snapshot) => {
      // get rating of current user
      const reviewedTracks = (await getDocs(query(collection(db, '/ratings'), where("user", "==", auth.user.id)))).docs.map(doc => doc.data().trackId )
      for(const el of snapshot.docs){
        if(reviewedTracks.includes(el.data().id)) continue
        dispatch(setTrack(el.data().id))
        setAudio(el.data().audio)
        setArtistName(el.data().artistName)
        setCover(el.data().cover)
        setGenre(el.data().genre)
        setTrackName(el.data().trackName)
        setLoading(false)
        console.log(rate.track)
        return
      }
      setNoTrackFound(true);
      setLoading(false);
    })
  }

  const submitRating = async (e: any) =>{
    if( !rate.rating ){
      dispatch(setError('Rating is required'))
    }
    else{
      dispatch(setSuccess('Rating has been submited'))
      console.log('nasol')
      setDoc(doc(db, '/ratings', rate.track + '-' + auth.user.id), {
        user: rate.rater,
        trackId: rate.track,
        rating: rate.rating,
        review: rate.review
      });
      updateDoc(doc(db, '/users', auth.user.id), {
        credits: increment(1)
      })
      dispatch(setUser({
        ...auth.user,
        credits: auth.user.credits +1
      }))
      dispatch(setWholeState(0,'','',''))
      getNewTrack()
    }
  }

  if(isLoading){
    return <Container><Loader></Loader></Container>
  }
  else
  if(noTrackFound){
    return(
      <Container>
        <Typography variant="h5">No songs found</Typography>
      </Container>
    )
  }
  else

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
          <TextField label="Review" sx={{m: "10px"}} fullWidth={true} multiline={true} onChange={(e) => dispatch(setReview(e.currentTarget.value))}></TextField>
          <br></br>
          <Button variant="contained" sx={{m: "10px"}} onClick={submitRating}>Submit rating</Button>
        </Container>
    </Container>
  );
}

export default Discover; 