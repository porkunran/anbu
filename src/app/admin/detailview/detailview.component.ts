import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Subscription } from 'rxjs';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.scss']
})
export class DetailviewComponent implements OnInit {
  orderId: Subscription;
  dataSource: any;
  errorCheck: boolean;
  error: any;

  constructor(private apiService: CommonService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
   this.orderId = this.apiService.subject;
   console.log(this.orderId, 'odrid');
   this.apiService.viewOrder(this.orderId).subscribe(data => {
    console.log(data, 'view');
    this.dataSource = data;
  },
    err => {
      this.errorCheck = true;
      this.error = err;

    }


  );
  }
print() {
  window.print();
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
        this.router.navigate(['admin/order']);
      },
        err => {
          this.errorCheck = true;
          this.error = err;

        }

      );
    }
  });

}
}
