import { Customer } from "./customer.model"; // Assuming customer.model.ts exists and exports Customer

export interface BankAccount {
  id: string; 
  balance: number;
  createdAt: Date;
  status: string; // or specific enum AccountStatus if defined
  type: string; // To distinguish 'CurrentBankAccountDTO' or 'SavingBankAccountDTO', or 'SA', 'CA'
  customerDTO?: Customer; // From backend DTO structure
  operatedByUserId?: string;
}

export interface CurrentBankAccount extends BankAccount {
  overDraft: number;
}

export interface SavingBankAccount extends BankAccount {
  interestRate: number;
} 