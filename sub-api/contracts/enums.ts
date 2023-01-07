export type OrderStatus =
  | 'arriving'
  | 'inqueue' //default
  | 'delivered'
  | 'dispatched'

export type TransactionStatus =
  | 'cancelled'
  | 'completed'
  | 'failed'
  | 'onhold'
  | 'pending'
  | 'processing'
  | 'refunded'

export type TransactionType = 'credit' | 'debit'

export type SubscriptionStatus = 'active' | 'canceled'

export type RecurrenceStatus = 'Every Day' | 'Every Week' | 'Every Month'
