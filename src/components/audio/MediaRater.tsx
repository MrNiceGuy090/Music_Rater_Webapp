import React, {useState} from 'react';

import { CardMedia, Card, Box, Rating, Typography } from '@mui/material';
import MediaPlayer from '../audio/MediaPlayer';

const MediaRater = () => {
  const [rating, setRating] = useState<number | null>(0);
  return(
    <Box sx={{display: "flex"}} >
        <MediaPlayer trackName="Beach Boys" artist="Smeu" albumCover="https://upload.wikimedia.org/wikipedia/commons/e/ee/Chain_link_icon.png"
            audio="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3">
        </MediaPlayer>
        <Rating name="customized-10" max={10} precision={0.5} 
            value={rating}
            onChange={(event, newValue) => {
                setRating(newValue);
            }}
        /> 
        {rating !== null && (
            <Typography  variant="h4">
                {rating}
            </Typography>
        )}
    </Box>
  );
}

export default MediaRater; 