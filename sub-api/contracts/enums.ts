export const OrderStatus = {
  ARRIVING: 'arriving',
  INQUEUE: 'inqueue', //default
  DELIVERED: 'delivered',
  DISPATCHED: 'dispatched',
} as const
export const TransactionStatus = {
  CANCELED: 'cancelled',
  COMPLETED: 'completed',
  FAILED: 'failed',
  ONHOLD: 'onhold',
  PENDING: 'pending',
  PROCESSING: 'processing',
  REFUNDED: 'refunded',
} as const

export const TransactionType = {
  CREDIT: 'credit',
  DEBIT: 'debit',
} as const

export const SubscriptionStatus = {
  ACTIVE: 'active',
  CANCELED: 'canceled',
} as const

export const RecurrenceStatus = {
  EVERYDAY: 'Every Day', // everyday order will be placed
  EVERYWEEK: 'Every Week', // every week //days
  ALTERNATEWEEK: 'Every Alternate Week', // alternate weeks //days
  EVERYMONTH: 'Every Month', // everymonth // select date
} as const
