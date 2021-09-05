import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Accounts } from 'src/app/core/data/account';
import { Account, createParamSearch } from 'src/app/core/model/account.model';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  paginator: any = {
    page: 0,
    pageSize: 25,
    totalRecords: 1000,
  };
  unSubscribeAll: Subject<any>;
  data: Account[] = [];
  listColumns: any[] = [];
  isLoading: boolean = false;
  total: number = 100;
  isOpenAddAccount = false;
  isOpenEditAccount = false;
  selectedAccount: Account | undefined;
  searchStr = '';
  id: any;

  selectedOption: string = '';

  options = [
    { name: 'first_name', value: 1 },
    { name: 'last_name', value: 2 },
    { name: 'gender', value: 3 },
    { name: 'email', value: 4 },
    { name: 'address', value: 5 },
  ];

  constructor(private accountService: AccountService) {
    // read data from file to localstorage
    this.unSubscribeAll = new Subject<any>();
    this.loadDataToLocal();
  }

  ngOnInit() {
    this.getAllAccount();
    this.createListColumns();
  }

  loadDataToLocal(): void {
    let data = localStorage.getItem('accountList');
    if (data === null || data === '') {
      localStorage.setItem('accountList', JSON.stringify(Accounts));
      this.total = this.data.length;
    }
  }

  createListColumns(): void {
    let columns = [
      {
        field: 'stt',
        label: 'STT',
      },
      {
        field: 'name',
        label: 'Name',
      },
      {
        field: 'account_number',
        label: 'Account number',
      },
      {
        field: 'balance',
        label: 'Balance',
      },
      {
        field: 'age',
        label: 'Age',
      },
      {
        field: 'gender',
        label: 'Gender',
      },
      {
        field: 'address',
        label: 'Address',
      },
      {
        field: 'employer',
        label: 'Employer',
      },
      {
        field: 'email',
        label: 'Email',
      },
      {
        field: 'city',
        label: 'City',
      },
      {
        field: 'state',
        label: 'State',
      },
      {
        field: 'action',
        label: 'Action',
      },
    ];
    this.listColumns = columns;
  }

  getAllAccount(): void {
    this.accountService
      .getAccounts(
        createParamSearch({
          start: this.paginator.page * 25,
          limit: this.paginator.pageSize,
        })
      )
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe(
        (resp: Account[]) => {
          this.data = resp;

          this.total = this.data.length;
        },
        (err: Error) => {
          this.data = [];
        }
      );
  }

  deleteAccount(event: string) {
    this.accountService.deleteAccount(event).subscribe((rs) => {
      if (rs) {
        console.log(rs);
      } else {
        console.log('delete fail');
      }
      window.location.reload();
    });
  }

  setTotal(event: any) {
    this.total = Number(event);
    this.getAllAccount();
  }

  // search

  search() {
    const params: any = {
      start: this.paginator.page * 25,
      limit: this.paginator.pageSize,
    };
    if (this.selectedOption) {
      params[this.selectedOption] = this.searchStr;
      this.accountService
        .getAccounts(createParamSearch(params))
        .pipe(takeUntil(this.unSubscribeAll))
        .subscribe(
          (resp: Account[]) => {
            this.data = resp;
            console.log(this.data);
          },
          (err: Error) => {
            this.data = [];
          }
        );
    }
  }

  onPageChange($event: any): void {
    this.paginator.page = $event;
    if (this.searchStr === '') {
      this.getAllAccount();
    } else {
      this.search();
    }
  }
}
