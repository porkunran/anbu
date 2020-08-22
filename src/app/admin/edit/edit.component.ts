import { Component, OnInit, OnChanges, SimpleChanges, ɵConsole, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { style, state, animate, transition, trigger } from '@angular/animations';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate('200ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class EditComponent implements OnInit {
  form: FormGroup;
  matChangesteel = 'amman';

  steelAmmaan: any;
  steelTata: any;
  steelDurga: any;
  cement: any;
  steelAmmaanCheck: boolean;
  steelDurgaCheck: boolean;
  steelTataCheck: boolean;
  cementCheck: boolean;
  finalValue = [];
  personalDetails: any = {};
  errorCheck = false;
  error: any;
  orderId: any;
  other: string | number;
  dataSource: any;

  constructor(private formBuilder: FormBuilder, private apiService: CommonService, private router: Router) { }

  ngOnInit() {

    this.orderId = this.apiService.subject;
    console.log(this.orderId, 'odrid');
    this.apiService.editOrder(this.orderId).subscribe(data => {
     console.log(data, 'edit');
     this.dataSource = data;
     this.formBuild();
   },
     err => {
       this.errorCheck = true;
       this.error = err;

     }

   );
  }
  formBuild() {
    console.log(this.dataSource, '8888');
    this.form = this.formBuilder.group({
      name: [this.dataSource.personal.name, Validators.required],
      phoneNumber: [this.dataSource.personal.phone, Validators.required],
      address: [this.dataSource.personal.address, Validators.required],
      other: [this.dataSource.product.other ? this.dataSource.product.other.OTHER : ''],
      steelType: [this.matChangesteel, Validators.required],
      amman: this.formBuilder.group({
        mm8: [this.dataSource.product.amman ? this.dataSource.product.amman['8MM'] ? this.dataSource.product.amman['8MM'] : '' : ''],
        mm10: [this.dataSource.product.amman ? this.dataSource.product.amman['10MM'] ? this.dataSource.product.amman['10MM'] : '' : ''],
        mm12: [this.dataSource.product.amman ? this.dataSource.product.amman['12MM'] ? this.dataSource.product.amman['12MM'] : '' : ''],
        mm16: [this.dataSource.product.amman ? this.dataSource.product.amman['16MM'] ? this.dataSource.product.amman['16MM'] : '' : ''],
        mm20: [this.dataSource.product.amman ? this.dataSource.product.amman['20MM'] ? this.dataSource.product.amman['20MM'] : '' : '']
      }),
      tata: this.formBuilder.group({
        mm8: [this.dataSource.product.tata ? this.dataSource.product.tata['8MM'] ? this.dataSource.product.tata['8MM'] : '' : ''],
        mm10: [this.dataSource.product.tata ? this.dataSource.product.tata['10MM'] ? this.dataSource.product.tata['10MM'] : '' : ''],
        mm12: [this.dataSource.product.tata ? this.dataSource.product.tata['12MM'] ? this.dataSource.product.tata['12MM'] : '' : ''],
        mm16: [this.dataSource.product.tata ? this.dataSource.product.tata['16MM'] ? this.dataSource.product.tata['16MM'] : '' : ''],
        mm20: [this.dataSource.product.tata ? this.dataSource.product.tata['20MM'] ? this.dataSource.product.tata['20MM'] : '' : '']
      }),
      durga: this.formBuilder.group({
        mm8: [this.dataSource.product.durga ? this.dataSource.product.durga['8MM'] ? this.dataSource.product.durga['8MM'] : '' : ''],
        mm10: [this.dataSource.product.durga ? this.dataSource.product.durga['10MM'] ? this.dataSource.product.durga['10MM'] : '' : ''],
        mm12: [this.dataSource.product.durga ? this.dataSource.product.durga['12MM'] ? this.dataSource.product.durga['12MM'] : '' : ''],
        mm16: [this.dataSource.product.durga ? this.dataSource.product.durga['16MM'] ? this.dataSource.product.durga['16MM'] : '' : ''],
        mm20: [this.dataSource.product.durga ? this.dataSource.product.durga['20MM'] ? this.dataSource.product.durga['20MM'] : '' : '']
      }),
      cement: this.formBuilder.group({
        // tslint:disable-next-line:max-line-length
        ultraTech: [this.dataSource.product.cement ? this.dataSource.product.cement.ULTRATECH ? this.dataSource.product.cement.ULTRATECH : '' : ''],
        tnpl: [this.dataSource.product.cement ? this.dataSource.product.cement.TNPL ? this.dataSource.product.cement.TNPL : '' : ''],
        // tslint:disable-next-line:max-line-length
        chettinadu: [this.dataSource.product.cement ? this.dataSource.product.cement.CHETTINADU ? this.dataSource.product.cement.CHETTINADU : '' : ''],
        ramco: [this.dataSource.product.cement ? this.dataSource.product.cement.RAMCO ? this.dataSource.product.cement.RAMCO : '' : ''],
        // tslint:disable-next-line:max-line-length
        ramcosuper: [this.dataSource.product.cement ? this.dataSource.product.cement.RAMCOSUPER ? this.dataSource.product.cement.RAMCOSUPER : '' : '']
      }),
    });
  }
  onSubmit() {
    this.steelAmmaan = this.validJson(this.form.value.amman, 'amman', 'steel');
    this.steelTata = this.validJson(this.form.value.tata, 'tata', 'steel');
    this.steelDurga = this.validJson(this.form.value.durga, 'durga', 'steel');
    this.cement = this.validJson(this.form.value.cement, 'cement', 'cement');
    // tslint:disable-next-line:max-line-length
    this.other = (this.form.value.other === '' || this.form.value.other === null) ? '' : this.finalValue.push({ key: 'OTHER', type: 'other', brand: 'other', value: this.form.value.other });
    this.personalDetails.userName = this.form.value.name;
    this.personalDetails.phoneNumber = this.form.value.phoneNumber;
    this.personalDetails.address = this.form.value.address;
    console.log(this.finalValue, '55555', '45544r', '');

    const dataSend: any = {};
    dataSend.order = this.finalValue;
    dataSend.personalDetails = this.personalDetails;
    dataSend.orderId = this.orderId ;
    this.apiService.editSubmitted(dataSend).subscribe(data => {
      this.router.navigate(['admin/order']);

    },
    err => {
      this.errorCheck = true;
      this.error = err;

      }


    );
  }

  steelChange(eve) {
    this.matChangesteel = eve.value;
    console.log(this.matChangesteel);
  }
  checkValid() {
    // tslint:disable-next-line:max-line-length
    if (this.form.valid && (this.form.value.amman.mm8 || this.form.value.amman.mm10 || this.form.value.amman.mm12 || this.form.value.amman.mm16 || this.form.value.amman.mm20 || this.form.value.tata.mm8 || this.form.value.tata.mm10 || this.form.value.tata.mm12 || this.form.value.tata.mm16 || this.form.value.tata.mm20 || this.form.value.durga.mm8 || this.form.value.durga.mm10 || this.form.value.durga.mm12 || this.form.value.durga.mm16 || this.form.value.durga.mm20 || this.form.value.cement.ultraTech || this.form.value.cement.tnpl || this.form.value.cement.chettinadu || this.form.value.cement.ramco || this.form.value.cement.ramcosuper)) {
      return false;
    } else {
      return true;
    }
  }


  validJson(obj, company, types) {

    for (const propName in obj) {
      if (obj[propName] === '' || obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      } else {
        console.log('else');
        if (propName === 'mm8') {
          // tslint:disable-next-line:max-line-length
          this.finalValue.push({ key: '8MM', type: types, brand: company, value: obj[propName] });

        } else if (propName === 'mm10') {
          this.finalValue.push({ key: '10MM', type: types, brand: company, value: obj[propName] });

        } else if (propName === 'mm12') {
          this.finalValue.push({ key: '12MM', type: types, brand: company, value: obj[propName] });
        } else if (propName === 'mm16') {
          this.finalValue.push({ key: '16MM', type: types, brand: company, value: obj[propName] });
        } else if (propName === 'mm20') {
          this.finalValue.push({ key: '20MM', type: types, brand: company, value: obj[propName] });
        } else {
          this.finalValue.push({ key: propName.toUpperCase(), type: types, brand: company, value: obj[propName] });
        }


      }
    }

  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


}
