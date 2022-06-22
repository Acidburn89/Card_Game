import { Paper, IconButton, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Player from '../../model/Player'
import React from 'react'

const PreviewCardPaper = styled(Paper, {
  name: "StyledPaper",
  slot: "Wrapper",
})({
  padding: '18px 18px 18px 18px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  width: '100%'
})

const PreviewCardButton = styled(IconButton, {
  name: "PreviewCardButton",
  slot: "Wrapper",
})({
  width: '100%',
  textAlign: 'left',
  '&:hover': { backgroundColor: "transparent" }
})

interface Props {
  player: Player,
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>,
  setPlayer: React.Dispatch<React.SetStateAction<Player>>
}

const PreviewCard: React.FC<(Props)> = ({player: {id, realName, playerName, asset}, setShowDetails, setPlayer}) => {
  
  const handlePreviewCardClick = () => {
    setPlayer({id, realName, playerName, asset})
    setShowDetails(true)
  }

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <PreviewCardButton
          onClick={handlePreviewCardClick}
        >
          <PreviewCardPaper>
            <Typography>
              {realName}
            </Typography>
            <Typography>
              {playerName}
            </Typography>
            <Typography>
              {asset}
            </Typography>
          </PreviewCardPaper>
        </PreviewCardButton>
      </Grid>
    </>
  )
}

export default PreviewCard