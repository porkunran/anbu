import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../common.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {
  errorCheck: boolean;
  error: any;
  displayedColumns: string[] = ['PRODUCT_NAME', 'LIST', 'DISCOUNT','OTHER_CHARGE_TRANSPORT',
    'COST', 'MARGIN', 'RATE'];
  dataSource = new MatTableDataSource();
  rate = {};
  discount = {};
  list = {};
  discoutEdit = false;
  rateEdit = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private apiService: CommonService) { }

  ngOnInit() {
    this.apiService.getPriceList().subscribe((data: any) => {
      console.log(data);

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    },
      err => {
        this.errorCheck = true;
        this.error = err;

      }


    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  rateChange(ele, eve) {
    console.log(eve, ele, '999');
    if (eve === ele.rate) {

    }
  }
  listChange(ele, eve){

  }
  discountChange(ele, eve)
{}
}
