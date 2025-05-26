export interface CreateCurrentAccountRequest {
  initialBalance: number;
  overDraft: number;
  customerId: number;
}

export interface CreateSavingAccountRequest {
  initialBalance: number;
  interestRate: number;
  customerId: number;
} 