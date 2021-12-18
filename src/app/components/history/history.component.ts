import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { SerachService } from 'src/app/services/serach.service';
export interface Country {
  name?: string;
  code?: string;
}

export interface Representative {
  name?: string;
  image?: string;
}


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  users: any;

  selectedCustomers: any;

  representatives: Representative[];

  statuses: any[];

  loading: boolean = true;
  @ViewChild("dt", { static: false }) public table: Table;
  constructor(private primengConfig: PrimeNGConfig,
    private serachSer: SerachService,
    public router: Router,
    private http: HttpClient) {
    this.users = [];
    this.selectedCustomers = [];
    this.representatives = [];
    this.statuses = [];

  }

  ngOnInit() {
    this.loadData();
    this.primengConfig.ripple = true;
    this.loading = false;
  }
  navigateWithState(name: any) {
    debugger
    this.router.navigateByUrl('/search-users', { state: name });
  }
  loadData() {
    this.serachSer.list().subscribe(res => {
      this.users = res;
      console.log(this.users);
    })
  }
  onActivityChange(event: any) {
    const value = event.target.value;
    if (value && value.trim().length) {
      const activity = parseInt(value);

      if (!isNaN(activity)) {
        this.table.filter(activity, 'activity', 'gte');
      }
    }
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.table.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }
  onDateSelect(value: any) {
    this.table.filter(this.formatDate(value), 'date', 'equals')
  }
  deleteHistory(id: any) {
    this.serachSer.delete(id).subscribe({
      complete: () => {
        this.loadData();
      },
      error: () => {

      },
    });

  }
  formatDate(date: any) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }

  onRepresentativeChange(event: any) {
    this.table.filter(event.value, 'representative', 'in')
  }
}
