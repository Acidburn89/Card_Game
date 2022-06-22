import { useEffect, useMemo, useState } from 'react'
import { Typography, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material'

import DetailView from '../DetailView'
import PreviewCard from './PreviewCard'
import Player from '../../model/Player'

import axios from 'axios'
import React from 'react'


interface Props {
  labels: {
    overviewTile: {
      headline: string,
      ascending: string,
      descending: string,
      selectLabel: string,
    },
    details: {
      headline: string,
      submit: string,
    },
    player: {
      realName: string,
      playerName: string,
      asset: string,
    },
  },
}

const Content: React.FC<Props> = ({
  labels: {overviewTile: {headline, ascending, descending, selectLabel}, details}
}) => {

  const [sortType, setSortType] = useState<string>("")
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [players, setPlayers] = useState<Array<Player>>([])
  const [player, setPlayer] = useState<Player>({
    id: 0,
    realName: '',
    playerName: '',
    asset: ''
  })
 
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

  //loading state
  useEffect(() => {
    const sortPlayers = (sortType: string) => {
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
    
    return (
      <PreviewCard
        key={index}
        player={player}
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
            labels={{details, player}}
          />
        </Grid>
      )}
    </>
  )
}

export default Content