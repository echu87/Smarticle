import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  @Output() emitUserSignIn: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitUserSignOut: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  signIn(){
    this.emitUserSignIn.emit(); 
  }

  signOut() {
    this.emitUserSignOut.emit(); 
  }

}