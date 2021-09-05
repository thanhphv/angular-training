import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { Account } from 'src/app/core/model/account.model';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
})
export class EditAccountComponent implements OnInit {
  editAccountForm: FormGroup = new FormGroup({});
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editAccountForm = this.formBuilder.group({
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

    this.id = this.route.snapshot.paramMap.get('_id');
    if (this.id) {
      this.loadData(this.id);
    }
  }

  get f() {
    return this.editAccountForm.controls;
  }

  loadData(id: string) {
    this.accountService.getAccountById(id).subscribe((data) => {
      console.log(data);
      for (const controlName in this.editAccountForm.controls) {
        if (controlName) {
          this.editAccountForm.controls[controlName].setValue(
            data[controlName]
          );
        }
      }
    });
  }

  handleEditAccount() {
    this.accountService
      .editAccount(this.createNewAccount())
      .subscribe((data) => {
        console.log(data);
        alert('Update success');
        this.router.navigate(['']);
      });
  }

  createNewAccount() {
    const newAccount: any = {};
    newAccount._id = this.id;
    for (const controlName in this.editAccountForm.controls) {
      if (controlName) {
        newAccount[controlName] =
          this.editAccountForm.controls[controlName].value;
      }
    }
    return newAccount as Account;
  }

  resetForm() {
    this.editAccountForm.reset();
  }

  onGoBack() {
    this.router.navigate(['']);
  }
}
