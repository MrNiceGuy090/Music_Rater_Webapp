import React, {useState, useRef} from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

export default function MediaPlayer(props: any) {
  const theme = useTheme();
  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = () => {
    const node = audioRef.current;
    if (node != null)
        node.play();
  };

  return (
    <Card sx={{ display: 'flex', width: "500px"}}>
        <CardMedia
            component="img"
            sx={{ width: 151, height: 151, display:"flex", flex: '1 0 auto'}}
            image={props.albumCover}
            src={props.audio}//"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            alt="Album cover"
        />
        <CardContent sx={{"&:last-child": {paddingBottom: "0px"} }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
          <audio controls ref={audioRef} style={{marginTop:"6px"}}>
            <source src={props.audio}>
            </source>
          </audio>
        </CardContent>
    </Card>
  );
}