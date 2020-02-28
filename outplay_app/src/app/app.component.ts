import { Component }            from '@angular/core'
import { Router }               from '@angular/router'
import { ComponentRoutes }      from './constants'

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.css']
})

export class AppComponent {
  
  title : string = 'Outplay'
  isLanding : boolean = this.router.url === '/'

  constructor(private router : Router) {

  }

  goBack() {
    this.router.navigateByUrl(ComponentRoutes.Landing)
  }

  activate(event) {
    this.isLanding = this.router.url === '/'
  }
}
