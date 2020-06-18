import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedRoute: string = 'recipes';
  
  onRouteSelected(route: string) {
    this.selectedRoute = route;
  }
}
