import {defineField, defineType} from 'sanity'

export const transactionType = defineType({
  name: 'transaction',
  title: 'Transaction',
  type: 'document',
  fields: [
    defineField({
      name: 'txHash',
      title: 'Transaction Hash',
      type: 'string',
    }),
    defineField({
      name: 'fromAddress',
      title: 'From(Wallet Address)',
      type: 'string',
    }),
    defineField({
      name: 'toAddress',
      title: 'To(Wallet Address)',
      type: 'string',
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
    }),
    defineField({
      name: 'timeStamp',
      title: 'TimeStamp',
      type: 'datetime',
    }),
  ],
})
