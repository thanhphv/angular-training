import { Component, OnInit, VERSION } from '@angular/core';
import { AccountService } from './core/services/account.service';
import { Observable, Subject } from 'rxjs';
import {
  Account,
  createAccount,
  createParamSearch,
} from './core/model/account.model';
import { takeUntil } from 'rxjs/operators';
import { Accounts } from './core/data/account';
import * as faker from 'faker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  account: Account[] = [];
  unSubscribeAll: Subject<any>;
  isOpenAddAccount = false;
  isOpenEditAccount = false;
  selectedAccount: Account | undefined;
  searchStr = '';

  constructor(private accountService: AccountService) {
    // read data from file to localstorage
    this.unSubscribeAll = new Subject<any>();
  }

  ngOnInit(): void {}
}
