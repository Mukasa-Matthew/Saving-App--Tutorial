// Frontend-only demonstration data. Replace this module with API responses later.
export const dashboardSummaryDemo = {
  totalSaved: 8750,
  activeGoals: 3,
  monthlySaved: 1240,
  completedGoals: 2,
}

export const savingsActivityDemo = [
  { month: 'May', saved: 540 },
  { month: 'Jun', saved: 760 },
  { month: 'Jul', saved: 680 },
  { month: 'Aug', saved: 920 },
  { month: 'Sep', saved: 1080 },
  { month: 'Oct', saved: 1240 },
]

export const savingsGoalsDemo = [
  { id: 1, name: 'Laptop', description: 'A reliable setup for work and creative projects.', target: 2400, saved: 1680, progress: 70, targetDate: 'March 15, 2027', createdDate: 'June 12, 2026', status: 'On track', icon: 'L' },
  { id: 2, name: 'Emergency Fund', description: 'Six months of essential living expenses.', target: 10000, saved: 5200, progress: 52, targetDate: 'August 30, 2027', createdDate: 'January 8, 2026', status: 'In progress', icon: 'E' },
  { id: 3, name: 'Vacation', description: 'A relaxing coastal trip at the end of the year.', target: 5000, saved: 1870, progress: 37, targetDate: 'December 10, 2027', createdDate: 'August 21, 2026', status: 'In progress', icon: 'V' },
]

export const recentTransactionsDemo = [
  { id: 1, goalId: 2, description: 'Monthly contribution', type: 'Deposit', goal: 'Emergency Fund', date: 'Oct 4, 2026', amount: 500, method: 'Mobile Money', reference: 'GS-10482', status: 'Successful' },
  { id: 2, goalId: 1, description: 'Weekly savings', type: 'Deposit', goal: 'Laptop', date: 'Oct 3, 2026', amount: 120, method: 'Bank transfer', reference: 'GS-10467', status: 'Successful' },
  { id: 3, goalId: 3, description: 'Extra contribution', type: 'Deposit', goal: 'Vacation', date: 'Oct 2, 2026', amount: 200, method: 'Mobile Money', reference: 'GS-10451', status: 'Pending' },
  { id: 4, goalId: 1, description: 'Goal expense', type: 'Withdrawal', goal: 'Laptop', date: 'Oct 1, 2026', amount: 80, method: 'Bank transfer', reference: 'GS-10439', status: 'Successful' },
  { id: 5, goalId: 2, description: 'Weekly savings', type: 'Deposit', goal: 'Emergency Fund', date: 'Sep 28, 2026', amount: 150, method: 'Mobile Money', reference: 'GS-10412', status: 'Failed' },
  { id: 6, goalId: 3, description: 'Trip booking', type: 'Withdrawal', goal: 'Vacation', date: 'Sep 21, 2026', amount: 300, method: 'Bank transfer', reference: 'GS-10388', status: 'Pending' },
  { id: 7, goalId: 2, description: 'Monthly contribution', type: 'Deposit', goal: 'Emergency Fund', date: 'Sep 15, 2026', amount: 400, method: 'Mobile Money', reference: 'GS-10342', status: 'Successful' },
]
