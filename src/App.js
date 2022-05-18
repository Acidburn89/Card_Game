import React from "react"

import {
  Box,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material"
import { styled } from '@mui/material/styles'

import Content from "./components/Overview/Content"
import labels from './data/all_labels'

const RootBox = styled(Box, {
  name: "RootBox",
  slot: "Wrapper",
})({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  margin: '60px'
})

function App() {

  const {headline} = labels.aoeCardGame

  return (
    <>
      <CssBaseline />
      <RootBox>
        <Typography variant='h3'>
          {headline}
        </Typography>
        <Grid container spacing={2}>
          <Content labels={labels}/>
        </Grid>
      </RootBox>
    </>
  )
}

export default App;