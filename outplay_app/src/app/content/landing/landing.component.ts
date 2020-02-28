import { Component}                        from '@angular/core'
import { Router }                          from '@angular/router'
import { ComponentRoutes }                 from 'src/app/constants'
import { USER_ACTION }                     from 'src/app/constants/app-types'

@Component({
  selector    : 'app-landing',
  templateUrl : './landing.component.html',
  styleUrls   : ['./landing.component.css']
})

export class LandingComponent {

  USER_ACTION : typeof USER_ACTION = USER_ACTION

  constructor(private router : Router) { 

  }

  navigate(action : USER_ACTION) {

    switch (action) {
      case USER_ACTION.VIEWSLOTS:
        this.router.navigateByUrl(ComponentRoutes.ViewSlots);
        break
      case USER_ACTION.BOOKSLOTS:
        this.router.navigateByUrl(ComponentRoutes.BookSlots);
        break
      case USER_ACTION.MANAGESLOTS:
        this.router.navigateByUrl(ComponentRoutes.ManageSlots)
        break
    }
    
  }
}
