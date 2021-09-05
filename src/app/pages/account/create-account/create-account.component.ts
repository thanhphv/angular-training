import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { Account } from 'src/app/core/model/account.model';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  createNewAccountForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createNewAccountForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      account_number: ['', [Validators.required]],
      balance: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]],
      employer: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  }

  get f() {
    return this.createNewAccountForm.controls;
  }

  createNewAccount() {
    const newAccount: Account = { ...this.createNewAccountForm.value };
    this.accountService.addAccount(newAccount).subscribe((data) => {
      console.log(data);
      alert('Update success');
      this.router.navigate(['']);
    });
  }
}
