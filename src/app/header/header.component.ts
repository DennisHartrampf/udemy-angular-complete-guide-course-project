import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output('routeSelected') routeEmitter = new EventEmitter<string>()
  
  collapsed = true;
  
  constructor() { }

  ngOnInit(): void {
  }

  onRecipesClicked() {
    this.routeEmitter.emit('recipes');
  }

  onShoppingListClicked() {
    this.routeEmitter.emit('shopping-list');
  }
}
