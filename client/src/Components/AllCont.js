import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { Link } from 'react-router-dom';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
const styles = {

  largeIcon: {
    width: 60,
    height: 60,
  },

};

export default function AllCompo() {
  return (
    <div className="allcomp">
        <h2>Explore More !!!</h2>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-around' ,flexWrap: 'wrap', gap : '20px'  }}>
    <Card sx={{ minWidth: 245, height: 275,marginTop :10 }} >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          All Blogs Here
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <ArticleRoundedIcon style={{ fontSize: '100px' }}></ArticleRoundedIcon>
      </CardContent>
      <CardActions>
      <Link to = '/AllBlogs' >   <Button size="small"> Dive to View More</Button></Link>
      </CardActions>
    </Card>

    <Card sx={{ minWidth: 245, height: 275,marginTop :10 }} >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          All Tests Here
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <ArticleRoundedIcon style={{ fontSize: '100px' }}></ArticleRoundedIcon>
      </CardContent>
      <CardActions>
      <Link to = '/AllTests' >  <Button size="small"> Dive to View More</Button></Link>
      </CardActions>
    </Card>
    <Card sx={{ minWidth: 245, height: 275,marginTop :10 }} >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          All Books Here
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <ArticleOutlinedIcon style={{ fontSize: '100px' }}></ArticleOutlinedIcon>
      </CardContent>
      <CardActions>
      <Link to = '/AllBooks' >  <Button size="small"> Dive to View More</Button></Link>
      </CardActions>
    </Card> 
    
       <Card sx={{ minWidth: 245, height: 275,marginTop :10 }} >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          All Courses Here
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <ArticleRoundedIcon style={{ fontSize: '100px' }}></ArticleRoundedIcon>
      </CardContent>
      <CardActions>
      <Link to = '/AllCourses' > <Button size="small"> Dive to View More</Button></Link>
      </CardActions>
    </Card>
    </div>
    </div>
  );
}