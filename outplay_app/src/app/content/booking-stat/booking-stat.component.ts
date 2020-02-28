import { Component, 
         OnInit 
       }                       from '@angular/core'
import { Router }              from '@angular/router'
import { ComponentRoutes, 
         STATUS 
       }                       from 'src/app/constants'

@Component({
  selector    : 'app-booking-stat',
  templateUrl : './booking-stat.component.html',
  styleUrls   : ['./booking-stat.component.css']
})
export class BookingStatComponent implements OnInit {

  STATUS : typeof STATUS = STATUS
  currStatus : STATUS = STATUS.SUCCESS
  
  constructor(private router : Router) { }

  ngOnInit() {
  }

  goHome() {
    this.router.navigateByUrl(ComponentRoutes.Landing)
  }
}
