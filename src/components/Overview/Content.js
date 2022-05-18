import { useEffect, useMemo, useState } from 'react'
import { Typography, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material'

import DetailView from '../DetailView'
import PreviewCard from './PreviewCard'
import Player from '../../model/Player'

import axios from 'axios'

const Content = props => {
  const {
    labels:{
      overviewTile: {
        headline,
        ascending,
        descending,
        selectLabel,
      }
    },
    labels,
  } = props

  const [sortType, setSortType] = useState('')
  const [showDetails, setShowDetails] = useState(false)
  const [players, setPlayers] = useState([])
  const [player, setPlayer] = useState({})
 
  useMemo(() => {
    const playerData = async () => {
      axios.get('./data/player_data.json')
      .then((res) => {
        setPlayers(res.data.players)
      })
      .catch((err) => console.log('Fetching data failed with: ', err))
    }
    playerData()
  }, [])

  useEffect(() => {
    const sortPlayers = sortType => {
      if (sortType !== '') {
        const sorted = [...players].sort(
          (playerA, playerB) => playerA.realName.localeCompare(playerB.realName)
        )
        sortType === 'asc' ? setPlayers(sorted) : setPlayers(sorted.reverse())
      }
    }
    sortPlayers(sortType)
  }, [sortType])

  const playerCards = players.map((player, index) => {
    player = new Player(
      player.realName,
      player.playerName,
      player.asset
    )

    return (
      <PreviewCard
        key={index}
        player={player}
        labels={props.labels}
        setShowDetails={setShowDetails}
        setPlayer={setPlayer}
      />
    )
  })

  return (
    <>
      <Grid sx={{alignItems: 'center'}} container item xs={12}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h4'>
            {headline}
          </Typography>
        </Grid>
        <Grid sx={{textAlign: 'right'}} item xs={12} sm={6}>
          <FormControl sx={{ m: 1, minWidth: 140 }}>
            <InputLabel>{selectLabel}</InputLabel>
            <Select
              value={sortType}
              label='Select Order'
              onChange={e => setSortType(e.target.value)}
            >
              <MenuItem value={'asc'}>
                {ascending}
              </MenuItem>
              <MenuItem value={'desc'}>
                {descending}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        {playerCards}
      </Grid>
      { showDetails && (
        <Grid container item xs={12}>
          <DetailView
            player={player}
            labels={labels}
          />
        </Grid>
      )}
    </>
  )
}

export default Content