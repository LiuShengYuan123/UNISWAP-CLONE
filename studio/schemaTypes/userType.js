import {defineField, defineType} from 'sanity'
import { transactionType } from './transactionType'

export const userType = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'address',
      title: 'Wallet Address💴',
      type: 'string',
    }),
    defineField({
      name: 'transaction',
      title: 'Transaction',
      type: 'array',
      of:[
        {
            type:'reference',
            to:[{type:'transaction'}]
        }
      ]
    }),
  ],
})
