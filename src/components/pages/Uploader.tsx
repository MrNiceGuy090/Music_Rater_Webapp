import React, {useState, useEffect} from 'react';
import { FormControl, Button, Container, Typography, Avatar, Select, MenuItem, InputLabel, Alert, TextField } from '@mui/material';

import {db, storageRef} from '../../firebase'
import { doc, collection, setDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { setSuccess } from '../../store/actions/alertActions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';


const Uploader = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [audioFileName, setAudioFileName] = useState(null);
    const [trackName, setTrackName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [trackCover, setTrackCover] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [genres, setGenres] = useState<string[]>([]);

    const auth: any = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        getDocs(collection(db, '/genres')).then((snapshot)=> setGenres(snapshot.docs[0].data().names));
        console.log(auth.success)
        return () => {
            console.log(auth.success)
            if(auth.success){
              dispatch(setSuccess(''));
            }
          }
      }, []);

    const handleAudioFileImport = (e: any) => {
        setAudioFile(e.target.files[0])
        setAudioFileName(e.target.files[0].name)
    }

    const handleTrackCoverImport = (e: any) => {
        setTrackCover(e.target.files[0])
    }

    const handleGenreChange = (e: any) => {   
        setSelectedGenre( e.target.value  )
    }

    const handleSubmit = async (e: any) => {
        const audioRef = ref(storageRef,'Tracks/'+auth.user.id+'-'+trackName)
        if(audioFile !== null)
            await uploadBytes(audioRef, audioFile)
            
        const imageRef = ref(storageRef,'Covers/'+auth.user.id+'-'+trackName)
        if(trackCover !== null)
            await uploadBytes(imageRef, trackCover)


        await setDoc(doc(db, '/tracks', auth.user.id + '-' + trackName), {
            id: auth.user.id + '-' + trackName,
            trackName: trackName,
            artistName: artistName,
            user: auth.user.id,
            audio: await getDownloadURL(audioRef),
            cover: await getDownloadURL(imageRef),
            genre: selectedGenre
        });
        auth.success = true
        dispatch(setSuccess('Success'));
    }
    
  return(
    <Container sx={{display:"flex"}}>
        <Container >
            <Typography variant="h3" >Track upload form</Typography>
            <br></br>
            <Container>
                <input
                    accept="audio/*"
                    hidden
                    id="upload-track"
                    type="file"
                    onChange={handleAudioFileImport}
                />
                <label htmlFor="upload-track">
                    <Button variant="contained" component="span" color='secondary'>
                        Upload track
                    </Button>
                </label>
                <Typography variant="body2">{audioFileName}</Typography>
            </Container>
            <br></br>
            <Container>
                <TextField 
                    label='Artist name' variant="outlined" 
                    value={artistName} 
                    onChange={(e) => setArtistName(e.target.value)}
                />
                <TextField 
                    label='Track name' variant="outlined" 
                    value={trackName} 
                    onChange={(e) => setTrackName(e.target.value)}
                />
            </Container>
            <br></br>
            <Container>
                    <input
                        accept="image/*"
                        hidden
                        id="upload-cover"
                        type="file"
                        onChange={handleTrackCoverImport}
                    />
                    <label htmlFor="upload-cover">
                        <Button variant="contained" component="span" color='secondary'>
                            Upload cover art
                        </Button>
                    </label>   
                        
            </Container>
            <br></br>
            <Container>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel>Genre</InputLabel>
                <Select
                value={selectedGenre}
                onChange={handleGenreChange}
                >
                    {genres.map((genre) => (
                        <MenuItem
                        key={genre}
                        value={genre}
                        >
                        {genre}
                        </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </Container>
            <br></br>
            <Container>
                <Button onClick={handleSubmit} variant="contained" >Submit</Button>       
            </Container>     
        </Container>
            {trackCover ? 
                <Avatar
                    alt="Track cover"
                    src={URL.createObjectURL(trackCover)}
                    sx={{ width: 200, height: 200, padding:'35px' }}     
                /> 
            : null}

    </Container>
  );
}

export default Uploader; 