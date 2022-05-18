import { Paper, IconButton, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

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


const PreviewCard = props => {
  const {
    player,
    setShowDetails,
    setPlayer
  } = props

  const renderPlayerData = Object.keys(player).map((key) => {
    return (
      <Typography key={key}>
        {player[key]}
      </Typography>
    )
  })

  const handlePreviewCardClick = () => {
    setPlayer(player)
    setShowDetails(true)
  }

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <PreviewCardButton
          onClick={handlePreviewCardClick}
        >
          <PreviewCardPaper>
            {renderPlayerData}
          </PreviewCardPaper>
        </PreviewCardButton>
      </Grid>
    </>
  )
}

export default PreviewCard