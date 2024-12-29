import React from 'react'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          FeedbackApp
        </Typography>
        <Link to={'/'} style={{color:'white'}}><Button color="inherit">Home</Button></Link>
        <Link to={'/addfeedback'} style={{color:'white'}}><Button color="inherit">Add Feedback</Button></Link>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Navbar
