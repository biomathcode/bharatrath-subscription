export enum OrderStatus {
  ARRIVING = 'arriving',
  INQUEUE = 'inqueue', //default
  DELIVERED = 'delivered',
  DISPATCHED = 'dispatched',
}
export enum TransactionStatus {
  CANCELED = 'cancelled',
  COMPLETED = 'completed',
  FAILED = 'failed',
  ONHOLD = 'onhold',
  PENDING = 'pending',
  PROCESSING = 'processing',
  REFUNDED = 'refunded',
}

export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELED = 'canceled',
}

export enum RecurrenceStatus {
  EVERYDAY = 'everyday', // everyday order will be placed
  EVERYWEEK = 'everyweek', // every week
  ALTERNATEWEEK = 'alternateweek', // alternate weeks
  EVERYMONTH = 'everymonth', // everymonth
}
