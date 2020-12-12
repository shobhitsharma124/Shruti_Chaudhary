import { Component, OnInit, Output, EventEmitter,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../_services/user.service';


export class Contact {
  constructor(
    public firstname: string,
    public lastname: string,
    public phonenumber: number,
    public email: string,
    public message: string
  ) { }
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {
  @Output() contactdata = new EventEmitter<Contact>();
  @ViewChild('fform',{static:true}) contactFormDirective;
  contactForm: FormGroup;
  data:Contact;
  feedbackcopy:Contact;
  
  public obj: any = {};
  constructor(private fb: FormBuilder,private feed:UserService) {}
  
  ngOnInit() {
    this.contactForm = this.fb.group({
      firstname: ["", [Validators.required, Validators.pattern("[A-Za-z]*"),Validators.minLength(3)]],
      lastname: ["", [Validators.required, Validators.pattern("[A-Za-z]*"),Validators.minLength(3)]],
      phonenumber: ["", [Validators.required, Validators.pattern("[0-9]*"),Validators.minLength(10),Validators.maxLength(10)]],
      email: ["", [Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],
      message:["",[Validators.required,Validators.minLength(3)]]
    });
  }

  onSubmit() {
    //this.obj = { ...this.contactForm.value, ...this.obj };
    //this.contactForm.value;
    /*console.log(
      "LOG: LoginComponent -> onSubmit -> this.contactForm.value",
      this.contactForm.value
    );*/
    
    this.data = this.contactForm.value;
    console.log(this.data);
    this.feed.postcontactdata(this.data)
      .subscribe(data => {
        this.data = data; 
        this.feedbackcopy = data;
       });


    if (this.contactForm.valid) {
      this.contactdata.emit(
        new Contact(
          this.contactForm.value.firstname,
          this.contactForm.value.lastname,
          this.contactForm.value.phonenumber,
          this.contactForm.value.email,
          this.contactForm.value.message
        )
      );
    }
  }
}
