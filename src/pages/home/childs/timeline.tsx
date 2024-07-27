import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab'
import { Box, Typography } from '@mui/material'

const transactions = [
  { id: 1, type: 'collected', points: 100, remaining: 1200 },
  { id: 2, type: 'redeemed', points: 50, remaining: 1150 },
  { id: 3, type: 'collected', points: 200, remaining: 1350 },
  { id: 4, type: 'redeemed', points: 150, remaining: 1200 },
  { id: 5, type: 'collected', points: 300, remaining: 1500 }
]

const TimelineComponent = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Recent Activities
      </Typography>
      <Timeline>
        {transactions.map((transaction) => (
          <TimelineItem key={transaction.id}>
            <TimelineOppositeContent sx={{ flex: 0.1 }}>
              <Typography variant="body2" color="textSecondary">
                {transaction.points} pts
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                color={
                  transaction.type === 'collected' ? 'primary' : 'secondary'
                }
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="body2">
                Points {transaction.type} - Remaining: {transaction.remaining}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  )
}

export default TimelineComponent
