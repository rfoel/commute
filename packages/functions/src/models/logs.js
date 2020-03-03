import mongoose from 'mongoose'

import * as types from '../utils/constants'

const { Schema, model } = mongoose

export const schema = new Schema(
  {
    date: Date,
    type: { enum: Object.values(types), type: String },
  },
  { timestamps: true },
)

export const collection = model('logs', schema)
