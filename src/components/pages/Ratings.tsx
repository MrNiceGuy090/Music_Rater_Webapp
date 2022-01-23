import React, {useState, useEffect} from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import {db} from '../../firebase'
import StarIcon from '@mui/icons-material/Star';
import Loader from "../Loader"

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { collection, getDocs, query, where, DocumentData, getDoc, doc } from "firebase/firestore";

const Ratings = () => {
  const [isLoading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<DocumentData>([]);
  const [zeroReviews, setZeroReviews] = useState(false)
  const auth: any = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    getRatings()
  }, []);

  const getRatings = async() =>{
      
    setLoading(true)
    const userTracks = (await getDocs(query(collection(db, '/tracks'), where("user", "==", auth.user.id)))).docs .map(doc => doc.data().id)
    if (!userTracks.length){
        setZeroReviews(true)
        setLoading(false)
        return
    }
    const ratings = (await getDocs(query(collection(db, '/ratings'), where("trackId", "in", userTracks)))).docs.map(doc => doc.data())    
    if (!ratings.length){
        setZeroReviews(true)
        setLoading(false)
        return
    }
    for(let rating of ratings){
        const track = (await getDoc(doc(db,'/tracks', rating.trackId))).data()
        const trackName = track ? track.trackName : null
        
        const reviewer = (await getDoc(doc(db,'/users', rating.user))).data()
        const reviewerName = reviewer ? reviewer.firstName + " " + reviewer.lastName : null

        rating['trackName'] = trackName
        rating['reviewerName'] = reviewerName
    }
    setRatings(ratings)
    setLoading(false)
  }

  if (isLoading){
      return (
          <Container>
              <Loader></Loader>
          </Container>
      )
  }  else if (zeroReviews){
    return (
        <Container>
            <Typography variant="h5">You currently do not have a submited song reviewed yet.</Typography>
        </Container>
    )
}
  return(
    <Container>
            {ratings.map( (rating:any, index:any) => (
                <Paper sx={{m: "10px", mb:"30px", padding:"10px"}} key={index}>
                    <Box sx={{display:"flex"}}>
                        <Typography variant="h4"> {rating.trackName} </Typography>
                        <Typography variant="h6" sx={{justifyContent:"flexEnd", marginLeft:"auto"}}> {rating.rating} <StarIcon sx={{fontSize:"30px"}}></StarIcon></Typography>
                    </Box>
                    <br></br>
                    <Typography variant="body2"> Reviewer: {rating.reviewerName}</Typography>
                    <Typography variant="body2">"{rating.review}"</Typography>
                </Paper>
            ))}   
    </Container>
  );
}

export default Ratings; 