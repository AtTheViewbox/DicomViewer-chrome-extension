import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';





const HeaderComp: React.VFC = () => {

  return (

    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" color="transparent" elevation={0}>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          DicomViewer URL Generator
        </Typography>
      
    </AppBar>
  </Box>


  );
}
export default HeaderComp
