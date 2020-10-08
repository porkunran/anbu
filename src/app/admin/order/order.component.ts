import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonService } from 'src/app/common.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class OrderComponent implements OnInit {

  dataSource: any;
  columnsToDisplay = ['orderNo', 'name', 'orderDate', 'address', 'phone'];
  expandedElement: any;
  errorCheck: boolean;
  error: any;


  constructor(private apiService: CommonService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    console.log(this.apiService.loggedIn(), 'ppppp');
    this.getData();
  }
  completeOrder(ele) {
    const dialogRef = this.dialog.open(ConfirmComponent, {

      data: { data: ele, text: 'Complete' },
      panelClass: 'cnfDialog',
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result, 'The dialog was closed');
      if (result) {
        this.apiService.completeOrder(result).subscribe(data => {
          this.getData();
        },
          err => {
            this.errorCheck = true;
            this.error = err;

          }

        );
      }
    });

  }
  priority(ele) {
    console.log(ele.orderNo);
    this.apiService.priorityOrder(ele.orderNo).subscribe(data => {
      this.getData();
    },
      err => {
        this.errorCheck = true;
        this.error = err;

      }


    );
  }
  cancel(ele) {
    const dialogRef = this.dialog.open(ConfirmComponent, {

      data: { data: ele, text: 'Cancel' },
      panelClass: 'cnfDialog',
      disableClose: true

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
    this.apiService.cancelOrder(ele.orderNo).subscribe(data => {
      this.getData();
    },
      err => {
        this.errorCheck = true;
        this.error = err;

      }


    );
      }
  });

  }
  getData() {
    this.apiService.getLiveorder().subscribe(data => {
      console.log(data);
      this.dataSource = data;
    },
      err => {
        this.errorCheck = true;
        this.error = err;

      }


    );
  }
  view(ele) {
    console.log(ele, '55555');
    this.apiService.setOrder(ele.orderNo);

    this.router.navigate(['admin/detail']);
  }
  edit(ele) {
    console.log(ele, '55555');
    this.apiService.setOrder(ele.orderNo);

    this.router.navigate(['admin/edit']);
  }
}
