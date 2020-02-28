import { BrowserModule }              from '@angular/platform-browser'
import { NgModule }                   from '@angular/core'
import { AppRoutingModule }           from './app-routing.module'
import { AppComponent }               from './app.component'
import { MatCardModule }              from '@angular/material'
import { ContentModule }              from './content/content.module'
import { AddSlotComponent }           from './content/add-slot/add-slot.component'
import { BrowserAnimationsModule }    from '@angular/platform-browser/animations'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    ContentModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddSlotComponent]
})
export class AppModule { }
