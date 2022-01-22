import React, {useState, useEffect} from 'react';
import { Stepper, Step, StepLabel, StepContent, Button, Typography, Container, Avatar, FormControl, Select, InputLabel, OutlinedInput, Box, Chip, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import {db, storageRef} from '../../firebase'
import { doc, collection, updateDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../store/actions/authActions';
import { RootState } from '../../store';

let steps = ["Set a profile picture", "Select up to 3 preferred genres"]


const ProfileFinalizer = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [fileUrl, setFileUrl] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const auth: any = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    getDocs(collection(db, '/genres')).then((snapshot)=> setGenres(snapshot.docs[0].data().names));
  }, []);

  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onFileChange = async (e: any) => {
      const file = e.target.files[0]
      const fileRef = ref(storageRef,'Profile_images/'+auth.user.id)
      await uploadBytes(fileRef, file)
      setFileUrl( await getDownloadURL(fileRef))
  }

  const submitImage = () =>{
      try{
        updateDoc(doc(db, '/users', auth.user.id), {
            profileImage: fileUrl
        });
      }
      catch(e){
          console.log(e)
      }
      let user = auth.user
      user.profileImage = fileUrl
      dispatch( setUser(user) )
  }

  const handleGenresChange = (event: SelectChangeEvent<typeof selectedGenres>) => {
    const {
      target: { value },
    } = event;
    if(value.length > selectedGenres.length && value.length > 3) return
    setSelectedGenres(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSubmit = () => {
      submitImage();
      let user = auth.user
      user.finnishedInit = true
      user.preferredGenres = selectedGenres
      dispatch( setUser(user) )

      try{
        updateDoc(doc(db, '/users', auth.user.id), {
            finnishedInit: true,
            preferredGenres: selectedGenres
        });
      }
      catch(e){
          console.log(e)
      }
  };

  return(
    <Container>
      <Typography variant="h3">
        Let's complete your profile info
      </Typography>
    <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
            <Step key={index}>
                <StepLabel sx={{mb:'20px'}}>{label}</StepLabel>
                <StepContent>
                    {activeStep === 0 ? 
                        <Container>
                            <Typography variant='h5'>Upload a profile picture</Typography>
                            {fileUrl ? 
                                <Avatar
                                    alt="Profile image"
                                    src={fileUrl}
                                    sx={{ width: 200, height: 200, padding:'35px' }}     
                                /> : null}
                            <input
                            accept="image/*"
                            hidden
                            id="button-file"
                            type="file"
                            onChange={onFileChange}
                            />
                            <label htmlFor="button-file">
                                <Button variant="contained" component="span">
                                    Upload
                                </Button>
                            </label>
                        </Container>
                    : null}
                    {activeStep === 1?
                    <Container>
                        <Typography variant='h5'>Select up to 3 preferred music genres</Typography>
                        <Select
                        multiple
                        value={selectedGenres}
                        onChange={handleGenresChange}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selectedGenres.map((value) => (
                                <Chip key={value} label={value}/>
                            ))}
                            </Box>
                        )}
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
                    </Container>
                  : null}
                    {activeStep === steps.length-1 ? 
                        <Button onClick={handleSubmit}>Finnish</Button>    
                            : 
                        <Button onClick={handleNext}>Next</Button>
                    }
                    <Button onClick={handleBack}>Back</Button>
                </StepContent>
            </Step>
        ))}
    </Stepper>
    </Container>
  );
}

export default ProfileFinalizer; 