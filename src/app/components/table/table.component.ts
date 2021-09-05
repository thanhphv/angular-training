import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/core/model/account.model';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() columns: any[] = [];
  @Input() isLoading: boolean = false;
  @Input() rows: Account[] = [];
  @Input() totalRows: any;
  @Input() paginator: any;
  @Output() deleteItem = new EventEmitter<any>();
  @Output() onPageChange = new EventEmitter<any>();
  // @Output() setTotalItem = new EventEmitter<any>();
  total: number = 0;
  startIndex: number = 0;
  endIndex: number = 25;

  constructor(private router: Router) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.totalRows);
    // this.getArrayLength(this.totalRows);
  }
  ngAfterContentChecked() {
    this.getArrayLength(this.rows.length);
  }

  ngAfterViewChecked() {
    //this.getArrayLength(this.rows.length);
  }

  getArrayLength(length: any) {
    return new Array(Math.ceil(length / 25));
  }

  openEditForm(id: any): void {
    this.router.navigate(['account/edit', id]);
  }

  onDelete(id: any): void {
    this.deleteItem.emit(id);
  }

  // paging

  changePage(pageIndex: any): void {
    this.onPageChange.emit(pageIndex);
  }

  get start(): any {
    console.log(this.paginator.page);
    if (this.paginator.page - 2 < 0) return 0;
    return this.paginator.page - 2;
  }

  get end(): any {
    return this.paginator.page + 2 >= this.start + 5
      ? this.paginator.page + 2
      : this.start + 5;
  }

  shouldShowItem(i: any): boolean {
    if (this.paginator.page + 3 > i && this.paginator.page - 3 < i) {
      return true;
    }
    return false;
  }
}
