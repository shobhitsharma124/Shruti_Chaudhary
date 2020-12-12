import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { UserService } from '../_services/user.service';

export class Views {
  constructor(
    public inr: number,
    public paisa: number,
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
    public packages: string
  ) { }
}
@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})

export class ViewAppointmentComponent implements OnInit {
  
  viewss:Views[];
  id:number;
  searchTrainer:string='Show All';
  confirmDelete = false;
  constructor(private userService: UserService,private router: Router,private route: ActivatedRoute) { }
  ngOnInit() {
    this.userService.getfitnessdata().subscribe(viewss=> this.viewss =viewss);
  }
  
  getfitness() {

  }
  searchFor(pref:string){
    this.searchTrainer=pref;
  }
  editEmployee(){
    this.router.navigate(['/place-fitness-trainer-appointment']);
  }
  deleteEmployee(id:number) {
    this.id=id;
    this.userService.deleteUser(id).subscribe(
      () => console.log(`User with Id = ${this.id} deleted`),
    );
    
  }
}
