import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../model/customer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css',
})
export class NewCustomerComponent implements OnInit {
  newCustomerFormGroup!: FormGroup;
  customerId: number | null = null;
  pageTitle: string = 'Add New Customer';

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name: this.fb.control(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.customerId = +id;
        this.pageTitle = 'Edit Customer';
        this.loadCustomerData(this.customerId);
      }
    });
  }

  loadCustomerData(id: number): void {
    this.customerService.getCustomerById(id).subscribe({
      next: (customer) => {
        this.newCustomerFormGroup.patchValue({
          name: customer.name,
          email: customer.email,
        });
      },
      error: (err) => {
        console.error('Error loading customer data:', err);
        alert('Could not load customer data for editing.');
        this.router.navigateByUrl('/admin/customers');
      }
    });
  }

  handleSaveCustomer() {
    if (this.newCustomerFormGroup.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }
    let customer: Customer = this.newCustomerFormGroup.value;

    if (this.customerId) {
      this.customerService.updateCustomer(this.customerId, customer).subscribe({
        next: (data) => {
          alert('Customer has been successfully updated!');
          this.router.navigateByUrl('/admin/customers');
        },
        error: (err) => {
          console.error('Error updating customer:', err);
          alert('Error updating customer. Please try again.');
        },
      });
    } else {
      this.customerService.saveCustomer(customer).subscribe({
        next: (data) => {
          alert('Customer has been successfully saved!');
          this.router.navigateByUrl('/admin/customers');
        },
        error: (err) => {
          console.error('Error saving customer:', err);
          alert('Error saving customer. Please try again.');
        },
      });
    }
  }
}
