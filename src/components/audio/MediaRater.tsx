import React, {useState} from 'react';

import { CardMedia, Card, Box, Rating, Typography } from '@mui/material';
import MediaPlayer from '../audio/MediaPlayer';

const MediaRater = () => {
  const [rating, setRating] = useState<number | null>(0);
  return(
    <Box sx={{display: "flex"}} >
        <Rating name="customized-10" max={10} precision={0.5} 
            value={rating}
            onChange={(event, newValue) => {
                setRating(newValue);
            }}
        /> 
        {rating !== null && (
            <Typography  variant="h6">
                {rating}
            </Typography>
        )}
    </Box>
  );
}

export default MediaRater; 