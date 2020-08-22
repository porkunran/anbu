import { Component, OnInit, OnChanges, SimpleChanges, ɵConsole, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { style, state, animate, transition, trigger } from '@angular/animations';
import { CommonService } from '../common.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
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
export class ShopComponent implements OnInit {
  form: FormGroup;
  matChangesteel = 'amman';
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;
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

  constructor(private formBuilder: FormBuilder, private apiService: CommonService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      other: [''],
      steelType: [this.matChangesteel, Validators.required],
      amman: this.formBuilder.group({
        mm8: [''],
        mm10: [''],
        mm12: [''],
        mm16: [''],
        mm20: ['']
      }),
      tata: this.formBuilder.group({
        mm8: [''],
        mm10: [''],
        mm12: [''],
        mm16: [''],
        mm20: ['']
      }),
      durga: this.formBuilder.group({
        mm8: [''],
        mm10: [''],
        mm12: [''],
        mm16: [''],
        mm20: ['']
      }),
      cement: this.formBuilder.group({
        ultraTech: [''],
        tnpl: [''],
        chettinadu: [''],
        ramco: [''],
        ramcosuper: ['']
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
    console.log(this.finalValue, '55555', '', '');
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
  goBackward(stepper: MatStepper) {
    this.finalValue = [];

    stepper.previous();
  }
  goForward(stepper: MatStepper) {
    const dataSend: any = {};
    dataSend.order = this.finalValue;
    dataSend.personalDetails = this.personalDetails;
    this.apiService.formSubmitted(dataSend).subscribe(data => {
      this.orderId = data;
      stepper.next();
    },
    err => {
      this.errorCheck = true;
      this.error = err;

      }


    );
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
  continueShopping(stepper: MatStepper) {
    this.errorCheck = false;
    this.finalValue = [];
    this.form.markAsUntouched();
    stepper.reset();
  }
}
