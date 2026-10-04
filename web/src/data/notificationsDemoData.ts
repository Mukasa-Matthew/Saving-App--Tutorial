export type NotificationCategory = 'Savings' | 'Transactions' | 'Security' | 'System'

export type NotificationDemo = {
  id: number
  category: NotificationCategory
  title: string
  message: string
  timestamp: string
  read: boolean
}

// Frontend-only inbox examples. State changes are intentionally not persisted.
export const notificationsDemo: NotificationDemo[] = [
  { id: 1, category: 'Savings', title: 'Savings reminder', message: 'Your weekly Laptop contribution is scheduled for today.', timestamp: 'Today, 9:00 AM', read: false },
  { id: 2, category: 'Savings', title: 'Goal milestone reached', message: 'You have reached 70% of your Laptop savings goal.', timestamp: 'Yesterday, 4:20 PM', read: false },
  { id: 3, category: 'Transactions', title: 'Deposit confirmed', message: 'Your demonstration deposit to Emergency Fund was successful.', timestamp: 'Oct 4, 10:15 AM', read: true },
  { id: 4, category: 'Transactions', title: 'Withdrawal update', message: 'A demonstration withdrawal status is ready to review.', timestamp: 'Oct 3, 2:45 PM', read: false },
  { id: 5, category: 'Security', title: 'New sign-in detected', message: 'A sign-in was detected from a new browser. Review it if this was not you.', timestamp: 'Oct 2, 8:32 PM', read: true },
  { id: 6, category: 'System', title: 'Planned maintenance', message: 'GoalSave demonstration services will receive routine maintenance this weekend.', timestamp: 'Oct 1, 11:00 AM', read: true },
]

export const remindersDemo = [
  { id: 1, goalId: 1, goalName: 'Laptop', frequency: 'Weekly', schedule: 'Friday at 6:00 PM', channels: ['Email'], enabled: true },
  { id: 2, goalId: 2, goalName: 'Emergency Fund', frequency: 'Monthly', schedule: '1st day at 9:00 AM', channels: ['Email', 'Push'], enabled: false },
]
