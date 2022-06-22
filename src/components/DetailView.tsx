import {
  Typography,
  Paper,
  Grid,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  Button,
} from '@mui/material'
import { styled } from '@mui/system'

import axios from 'axios'
import React from 'react'
import Player from '../model/Player'

const DetailPaper = styled(Paper, {
  name: "StyledPaper",
  slot: "Wrapper",
})({
  padding: '18px 18px 18px 18px',
})

const TypographyHeadline = styled(Typography, {
  name: "TypographyHeadline",
  slot: "Wrapper",
})({
  paddingRight: '20px',
})

const SubmitButton = styled(Button, {
  name: "TypographyHeadline",
  slot: "Wrapper",
})({
  marginTop: '20px',
})

interface Props {
  labels: {
    details: {
      headline: string
      submit: string
    },
    player: {
      realName: string
      playerName: string
      asset: string
    }
  },
  player: Player
}

const DetailView: React.FC<Props> = ({
  labels: {
    details: {headline, submit},
    player: {realName, playerName, asset}},
    player
  }) => {
  
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

  const renderUserCredentials = Object.keys(player).slice(1,4).map((key) => {
    return (
      <TableRow>
        <TableCell>
          <TypographyHeadline display='inline' variant='h5'>
            {key + ': '}
          </TypographyHeadline>
        </TableCell>
        <TableCell>
          <Typography display='inline' variant='subtitle1'>
            {player[key as keyof Player]}
          </Typography>
        </TableCell>
      </TableRow>
    )
  })

  return (
    <Grid item xs={6}>
      <DetailPaper>
        <Typography variant='h4'>
          {headline}
        </Typography>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
              {renderUserCredentials}
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container justifyContent="flex-end">
          <SubmitButton
            onClick={submitPlayerData}
            variant='contained'
          >
            {submit}
          </SubmitButton>
        </Grid>
      </DetailPaper>
    </Grid>
  )
}

export default DetailView