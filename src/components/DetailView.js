import {
  Typography,
  Paper,
  Grid,
  Button,
} from '@mui/material'
import { styled } from '@mui/system'

import axios from 'axios'

const DetailPaper = styled(Paper, {
  name: "StyledPaper",
  slot: "Wrapper",
})({
  padding: '18px 18px 18px 18px',
})


const DetailView = props => {
  const {
    labels: {
      details: {
        headline = '', submit = ''
      }
    },
    player = [],
  } = props

  const submitPlayerData = async () => {
    try {
      await axios.post(`https://httpbin.org/post`, player)
      .then(res => {
        console.log('Sent data: ', res.data.json)
      })
    } catch (err) {
      console.log("Failed to post player: ", err)
    }
  }

  const renderUserCredentials = Object.keys(player).map((key) => {
    return (
      <Grid key={key} item xs={12}>
        <Typography key={key} variant='subtitle1'>
          {'- ' + player[key]}
        </Typography>
      </Grid>
    )
  })

  return (
    <Grid item xs={12}>
      <DetailPaper>
        <Typography variant='h4'>
          {headline}
        </Typography>
        {renderUserCredentials}
        <Grid container justifyContent="flex-end">
          <Button
            onClick={submitPlayerData}
            variant='contained'
          >
            {submit}
          </Button>
        </Grid>
      </DetailPaper>
    </Grid>
  )
}

export default DetailView