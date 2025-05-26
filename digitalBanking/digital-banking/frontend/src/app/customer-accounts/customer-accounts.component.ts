import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountsService } from '../services/account.service';
import { BankAccount, CurrentBankAccount, SavingBankAccount } from '../model/bank-account.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-customer-accounts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css'],
})
export class CustomerAccountsComponent implements OnInit {
  customerId!: number;
  customer!: Customer;
  accounts$: Observable<Array<BankAccount>> | undefined;
  errorMessage: string = '';
  successMessage: string = '';

  showCreateCurrentAccountForm: boolean = false;
  showCreateSavingAccountForm: boolean = false;

  currentAccountForm!: FormGroup;
  savingAccountForm!: FormGroup;

  // Properties for operations
  showDebitModal: boolean = false;
  showCreditModal: boolean = false;
  showTransferModal: boolean = false;
  selectedAccountForOperation: BankAccount | null = null;
  operationAmountForm!: FormGroup; // Single form for debit/credit amount & description
  transferForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private accountsService: AccountsService,
    public authService: AuthService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.customer = navigation.extras.state as Customer;
    }
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.params['id'];
    this.customerId = Number(idParam);

    if (!this.customer && this.customerId) {
      console.warn("Customer data not available in state, consider fetching by ID.");
    }

    this.loadCustomerAccounts();

    this.currentAccountForm = this.fb.group({
      initialBalance: [0, [Validators.required, Validators.min(0)]],
      overDraft: [0, [Validators.required, Validators.min(0)]]
    });

    this.savingAccountForm = this.fb.group({
      initialBalance: [0, [Validators.required, Validators.min(0)]],
      interestRate: [0, [Validators.required, Validators.min(0)]]
    });

    // Initialize operation forms
    this.operationAmountForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required]
    });

    this.transferForm = this.fb.group({
      // accountSource will be from selectedAccountForOperation.id
      accountDestination: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      description: ['Transfer'] // Default description or make it editable
    });
  }

  loadCustomerAccounts() {
    this.accounts$ = this.accountsService.listAccounts().pipe(
      map(accounts => accounts.filter(acc => acc.customerDTO?.id === this.customerId))
    );
    this.accounts$.subscribe({
      error: err => {
        this.errorMessage = "Failed to load accounts for this customer.";
        console.error(err);
      }
    });
  }

  toggleCreateCurrentAccountForm() {
    this.showCreateCurrentAccountForm = !this.showCreateCurrentAccountForm;
    this.showCreateSavingAccountForm = false;
    this.successMessage = '';
    this.errorMessage = '';
  }

  toggleCreateSavingAccountForm() {
    this.showCreateSavingAccountForm = !this.showCreateSavingAccountForm;
    this.showCreateCurrentAccountForm = false;
    this.successMessage = '';
    this.errorMessage = '';
  }

  handleCreateCurrentAccount() {
    if (this.currentAccountForm.valid && this.customerId) {
      const accountData = {
        ...this.currentAccountForm.value,
        customerId: this.customerId
      };
      this.accountsService.saveCurrentBankAccount(accountData).subscribe({
        next: (newAccount: CurrentBankAccount) => {
          this.successMessage = `Current account ${newAccount.id} created successfully!`;
          this.loadCustomerAccounts();
          this.showCreateCurrentAccountForm = false;
          this.currentAccountForm.reset({ initialBalance: 0, overDraft: 0 });
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || err.message || "Failed to create current account.";
          console.error(err);
        }
      });
    }
  }

  handleCreateSavingAccount() {
    if (this.savingAccountForm.valid && this.customerId) {
      const accountData = {
        ...this.savingAccountForm.value,
        customerId: this.customerId
      };
      this.accountsService.saveSavingBankAccount(accountData).subscribe({
        next: (newAccount: SavingBankAccount) => {
          this.successMessage = `Saving account ${newAccount.id} created successfully!`;
          this.loadCustomerAccounts();
          this.showCreateSavingAccountForm = false;
          this.savingAccountForm.reset({ initialBalance: 0, interestRate: 0 });
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || err.message || "Failed to create saving account.";
          console.error(err);
        }
      });
    }
  }

  // --- Operation Modal Methods ---
  openDebitModal(account: BankAccount) {
    this.selectedAccountForOperation = account;
    this.operationAmountForm.reset();
    this.showDebitModal = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  closeDebitModal() {
    this.showDebitModal = false;
    this.selectedAccountForOperation = null;
  }

  handleDebit() {
    if (this.operationAmountForm.valid && this.selectedAccountForOperation) {
      const { amount, description } = this.operationAmountForm.value;
      this.accountsService.debit(this.selectedAccountForOperation.id, amount, description).subscribe({
        next: () => {
          this.successMessage = `Debit of ${amount} successful for account ${this.selectedAccountForOperation?.id}`;
          this.loadCustomerAccounts(); // Refresh accounts
          this.closeDebitModal();
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || err.error?.error || "Debit failed.";
          console.error(err);
          // Optionally, keep modal open to show error within it
        }
      });
    }
  }

  openCreditModal(account: BankAccount) {
    this.selectedAccountForOperation = account;
    this.operationAmountForm.reset();
    this.showCreditModal = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  closeCreditModal() {
    this.showCreditModal = false;
    this.selectedAccountForOperation = null;
  }

  handleCredit() {
    if (this.operationAmountForm.valid && this.selectedAccountForOperation) {
      const { amount, description } = this.operationAmountForm.value;
      this.accountsService.credit(this.selectedAccountForOperation.id, amount, description).subscribe({
        next: () => {
          this.successMessage = `Credit of ${amount} successful for account ${this.selectedAccountForOperation?.id}`;
          this.loadCustomerAccounts();
          this.closeCreditModal();
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || err.error?.error || "Credit failed.";
          console.error(err);
        }
      });
    }
  }

  openTransferModal(account: BankAccount) {
    this.selectedAccountForOperation = account;
    this.transferForm.reset({ description: 'Transfer' }); // Reset with default description
    this.showTransferModal = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  closeTransferModal() {
    this.showTransferModal = false;
    this.selectedAccountForOperation = null;
  }

  handleTransfer() {
    if (this.transferForm.valid && this.selectedAccountForOperation) {
      const { accountDestination, amount, description } = this.transferForm.value;
      this.accountsService.transfer(this.selectedAccountForOperation.id, accountDestination, amount, description).subscribe({
        next: () => {
          this.successMessage = `Transfer of ${amount} from ${this.selectedAccountForOperation?.id} to ${accountDestination} successful.`;
          this.loadCustomerAccounts();
          this.closeTransferModal();
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || err.error?.error || "Transfer failed.";
          console.error(err);
        }
      });
    }
  }

  viewAccountOperations(account: BankAccount) {
    // Placeholder: Log to console. Eventually, navigate to a detailed view or show a modal.
    console.log("View operations for account:", account);
    // Example navigation (if a route like '/admin/account-operations/:accountId' exists):
    // this.router.navigate(['/admin/account-operations', account.id]);
    this.successMessage = `Operations for account ${account.id} would be shown here.`;
    // For now, just using a success message as a placeholder action
    setTimeout(() => this.successMessage = '', 3000);
  }


}
