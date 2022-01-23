import React from 'react';
import { Box, Rating, Typography } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

import { setRating, setRater } from '../../store/actions/rateActions';

const MediaRater = () => {
  const rate: any = useSelector((state: RootState) => state.rate);
  const auth: any = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch();

  return(
    <Box sx={{display: "flex"}} >
        <Rating name="customized-10" max={10} precision={0.5} 
            value={rate.rating}
            onChange={(event, newValue) => {
                if(newValue == null) newValue = 0;
                dispatch(setRating(newValue));
                dispatch(setRater(auth.user.id))
            }}
        /> 
        {rate.rating !== null && (
            <Typography  variant="h6">
                {rate.rating}
            </Typography>
        )}
    </Box>
  );
}

export default MediaRater; 