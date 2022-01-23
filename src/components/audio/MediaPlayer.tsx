import React, { useRef} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function MediaPlayer(props: any) {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <Card sx={{ display: 'flex', width: "500px"}}>
        <CardMedia
            component="img"
            sx={{ width: 151, height: 151, display:"flex", flex: '1 0 auto'}}
            image={props.albumCover}
            alt="Album cover"
        />
        <CardContent sx={{"&:last-child": {paddingBottom: "0px"} }}>
          <Typography component="div" variant="h5">
            {props.trackName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {props.artistName}
          </Typography>
          <audio controls ref={audioRef} style={{marginTop:"6px"}} src={props.audio}>
            <source >
            </source>
          </audio>
        </CardContent>
    </Card>
  );
}