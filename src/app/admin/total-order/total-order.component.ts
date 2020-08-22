import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonService } from 'src/app/common.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-total-order',
  templateUrl: './total-order.component.html',
  styleUrls: ['./total-order.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [DatePipe]
})
export class TotalOrderComponent implements OnInit {

  dataSource: any;
  columnsToDisplay = ['orderNo', 'name', 'orderDate', 'address', 'phone', 'status'];
  expandedElement: any;
  errorCheck: boolean;
  error: any;
  form: FormGroup;
  typeValue: any;
  dataSource1: any;

  // tslint:disable-next-line:max-line-length
  constructor(private apiService: CommonService, public dialog: MatDialog, private router: Router, private formBuilder: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
    this.getData();
  }
  completeOrder(ele) {
    const dialogRef = this.dialog.open(ConfirmComponent, {

      data: { ele },
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

    // console.log(ele.orderNo);
    // this.apiService.completeOrder(ele.orderNo).subscribe(data => {
    //   this.getData();
    // },
    //   err => {
    //     this.errorCheck = true;
    //     this.error = err;

    //   }


    // );
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
  getData() {
    this.apiService.reportOrder().subscribe(data => {
      console.log(data);
      this.dataSource = data;
      this.dataSource1 = [...this.dataSource];
      console.log(this.dataSource1, '555555');
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
  onSubmit() {
    if (this.form.valid) {


      // this.form.value.fromDate = this.datePipe.transform(this.form.value.fromDate, 'yyyy-MM-dd');
      // this.form.value.toDate = this.datePipe.transform(this.form.value.toDate, 'yyyy-MM-dd');

      this.apiService.filterData(this.form.value).subscribe(data => {
        console.log(data);
        this.dataSource = data;
        this.dataSource1 = [...this.dataSource];
        console.log(this.dataSource1, '555555');
      },
        err => {
          this.errorCheck = true;
          this.error = err;
        }

      );

    }
  }
  typeChange(eve) {
    console.log(eve);
    if (eve.value === 'All') {
       this.dataSource1 = this.dataSource;
       console.log(this.dataSource, '444', this.dataSource1);
    } else {
    this.dataSource1 = this.dataSource.filter(item => item.status === eve.value);
    console.log(this.dataSource1, '4444');
  }
  }
}
