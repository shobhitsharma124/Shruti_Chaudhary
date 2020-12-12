import { Component, OnInit,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';

export class Fitness {
  constructor(
    public paisa: string,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname:string,
    public lastname: string,
    public age:number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string,
    public inr: string
  ) { }
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html',
  styleUrls: ['./place-fitness-trainer-appointment.component.css']
})

export class PlaceFitnessTrainerAppointmentComponent implements OnInit {

  @ViewChild('fform',{static:true}) fitnessFormDirective;

  fitnessForm: FormGroup;
  trainerpreference:'No Preference';
  physiotherapist: 'Yes';
  packages: '1500';
  paisa:'00';
  someInrValue:String='1500';
      
  data:Fitness;
  feedbackcopy:Fitness;
  
  formErrors = {
    'firstname': '',
    'lastname': '',
    'age': '',
    'phonenumber': '',
    'email': '',
    'streetaddress':'',
    'city':'',
    'state':'',
    'country':'',
    'pincode':''
    
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'pattern':       'firstname must contain only alphabets.',
     
    },
    'lastname': {
      'required':      'Last Name is required.',
      'pattern':       'lastname must contain only alphabets.'
    
    },
    'age': {
      'required':      'Age  is required.',
      'min':     'Age  must be at greater than 18 .',
      'max':     'Age cannot be more than 60 .'
    },
    'phonenumber': {
      'required':      'phonenumber  is required.',
      'pattern':       'phonenumber must contain only numbers.',
      'minlength':     'phonenumber must be  10 characters long.',
      'maxlength':     'phonenumber must be  10 characters long.'
    },

    'email': {
      'required':      'Email is required.',
      'pattern':         'Email not in valid format.'
    },
    'streetaddress':{
      'required':      'streetaddress is required.',
      'pattern':       'streetaddress must be in pattern #123testaddress.',
    },
    'city': {
      'required':       'city is required.',
      'pattern':       'city must contain only alphabets .',
      'minlength':     'city must be atleast 3 characters long.'
     },
    'state': {
      'required':      'state is required.',
      'pattern':       'state must contain only alphabets.',
      'minlength':     'state must be atleast 3 characters long.'
     },
    'country': {
      'required':      'country  is required.',
      'pattern':       'country must contain only alphabets.',
      'minlength':     'country must be atleast 3 characters long.'
    },
    'pincode': {
      'pattern':      'pincode must contain only numers',
      'minlength':     'pincode must be  6 characters long.',
      'maxlength':     'pincode must be  6 characters long.'
    }

  };


  constructor(private fb: FormBuilder,private feed:UserService) { 
    this.createForm();
  }
  
  ngOnInit() {
    
  }

  createForm() {
    this.fitnessForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern] ],
      lastname: ['', [Validators.required,Validators.pattern] ],
      age: ['', [Validators.required, Validators.min(19), Validators.max(59)] ],
      phonenumber: ["", [Validators.required,Validators.pattern,Validators.minLength(10),Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")] ],
      streetaddress: ['', [Validators.required, Validators.pattern] ],
      city: ["", [Validators.required,Validators.pattern,Validators.minLength(3)]],
      state: ["", [Validators.required,Validators.pattern,Validators.minLength(3)]],
      country:["", [Validators.required,Validators.pattern,Validators.minLength(3)]],
      pincode: ['', [Validators.pattern, Validators.minLength(6), Validators.maxLength(6)] ],
      trainerpreference: 'No Preference',
      physiotherapist: 'Yes',
      packages: '1500',
      inr: this.someInrValue,
      paisa:'00'
  });

    this.fitnessForm.valueChanges
    .subscribe(d => this.onValueChanged(d));
    this.onValueChanged(); 
  }
   
  onValueChanged(d?: any) {
    if (!this.fitnessForm) { return; }
    const form = this.fitnessForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  changeINR(a){
   // console.log(a+" inr "+this.someInrValue);
   this.someInrValue=a;
    // this.
  }

  onSubmit() {
    this.data = this.fitnessForm.value;
    this.data.inr=this.data.packages;
    console.log(this.data);
    // console.log(this.data.inr);

    this.feed.postfitnessdata(this.data)
      .subscribe(data => {
        this.data = data; 
        this.feedbackcopy = data;       
      });
    this.fitnessForm.reset({
      'firstname': '',
      'lastname': '',
      'age': '',
      'phonenumber': '',
      'email': '',
      'streetaddress': '',
      'city': '',
      'state': '',
      'country': '',
      'pincode':'',
      'trainerpreference': 'No Preference',
      'physiotherapist': 'Yes',
      'packages': '1500',
      'inr':'1500',
      'paisa': '00',
    });
    this.fitnessFormDirective.resetForm();
  }
  }
    

