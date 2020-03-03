import dayjs from 'dayjs'
import camelcase from 'camelcase'
import { collection } from '../models/logs'

const diff = (start, end = new Date()) => start && dayjs(end).diff(dayjs(start), 'second')

const groupByDay = logs =>
  logs.reduce((acc, current) => {
    const day = dayjs(current.date).format('YYYY-MM-DD')
    const type = camelcase(current.type)

    acc[day] = { ...acc[day], [type]: current.date }

    return acc
  }, {})

const computeWorkdays = groups =>
  Object.entries(groups).map(([date, workday]) => {
    const morningCommuteTime = diff(workday.leaveHome, workday.arriveWork)
    const lunchTime = diff(workday.lunchStart, workday.lunchEnd)
    const workedTime = diff(workday.arriveWork, workday.leaveWork) - lunchTime
    const afternoonCommuteTime = diff(workday.leaveWork, workday.arriveHome)

    return { date, ...workday, morningCommuteTime, workedTime, lunchTime, afternoonCommuteTime }
  })

export default async (root, { filter: { date = new Date(), by = 'week' } }) => {
  const logs = await collection.find({
    date: { $gte: dayjs(date).startOf(by), $lte: dayjs(date).endOf(by) },
  })

  const groups = groupByDay(logs)

  const workdays = computeWorkdays(groups)

  return workdays
}
