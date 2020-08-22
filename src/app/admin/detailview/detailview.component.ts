import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Subscription } from 'rxjs';

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

  constructor(private apiService: CommonService) { }

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
}
