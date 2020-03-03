import dayjs from 'dayjs'

import { collection } from '../models/logs'

export default async (root, { filter: { date = new Date(), by = 'week' } }) => {
  const logs = await collection.find({
    date: { $gte: dayjs(date).startOf(by), $lte: dayjs(date).endOf(by) },
  })

  return logs
}
