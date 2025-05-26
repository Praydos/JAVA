export interface DashboardStats {
  totalCustomers: number;
  totalAccounts: number;
  accountTypeCounts: { [key: string]: number }; // e.g., {"CurrentAccount": 10, "SavingAccount": 15}
  totalOperations: number;
} 