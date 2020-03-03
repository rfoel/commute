import dayjs from 'dayjs'

import { collection } from '../models/logs'

const createLog = async (root, { input }) => {
  const { date, type } = input

  const log = await collection.findOneAndUpdate(
    {
      date: { $gte: dayjs(date).startOf('day'), $lte: dayjs(date).endOf('day') },
      type: { $eq: type },
    },
    { date, type },
    { returnOriginal: false, upsert: true },
  )

  return log
}

export default createLog
