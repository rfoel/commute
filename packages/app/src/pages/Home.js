import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import dayjs from 'dayjs'
import styled, { css, Box, Col, Heading, Row, Text } from '@1e3/ui'

const GET_WORKDAYS = gql`
  {
    workdays @client {
      date
      morningCommuteTime
      workedTime
      lunchTime
      afternoonCommuteTime
    }
    filter @client {
      date
      by
    }
  }
`

const Day = styled.box(
  () => css`
    align-items: center;
    border: 1px solid white;
    color: white;
    display: flex;
    flex-direction: column;
  `,
)
const getWeek = date => {
  const days = []

  for (let index = 0; index < 7; index += 1) {
    days.push(
      dayjs(date)
        .startOf('week')
        .add(index, 'day'),
    )
  }

  return days
}

export default () => {
  const {
    data: { workdays, filter },
  } = useQuery(GET_WORKDAYS)

  const week = getWeek(filter.date)

  return (
    <Box>
      <Row display="flex">
        {week.map(day => {
          const workday = workdays.find(wd => wd.date === day.format('YYYY-MM-DD'))
          return (
            <Col m={2}>
              <Link to={`/w/${day.format('YYYY-MM-DD')}`}>
                <Day p={3}>
                  <Heading fontSize={3} mb={2}>
                    {day.format('ddd')}
                  </Heading>
                  <Heading mb={2}>{day.format('DD')}</Heading>
                  {!workday && (
                    <Text alignItems="center" display="flex" flex="1" opacity=".4">
                      No data
                    </Text>
                  )}
                </Day>
              </Link>
            </Col>
          )
        })}
      </Row>
    </Box>
  )
}
