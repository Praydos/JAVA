import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent implements OnInit {
  customers!: Observable<Array<Customer>>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;
  constructor(
    public authService: AuthService,
    private customerService: CustomerService,
    private fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(''),
    });
    this.handleSearchCustomers();
  }
  handleSearchCustomers() {
    let kw = this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        alert("Error searching customers: " + (err.error?.message || err.message));
        return throwError(() => new Error(err.message));
      })
    );
  }

  handleEditCustomer(customer: Customer) {
    this.router.navigateByUrl(`/admin/edit-customer/${customer.id}`);
  }

  handleDeleteCustomer(c: Customer) {
    let conf = confirm(`Are you sure you want to delete customer "${c.name}"?`);
    if (!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next: (resp) => {
        alert('Customer has been successfully deleted!');
        this.handleSearchCustomers();
      },
      error: (err) => {
        console.log(err);
        alert("Error deleting customer: " + (err.error?.message || err.message));
      },
    });
  }

  handleCustomerAccounts(customer: Customer) {
    this.router.navigateByUrl('/admin/customer-accounts/' + customer.id, {
      state: customer,
    });
  }
}
