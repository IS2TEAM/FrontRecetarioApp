import { Component } from '@angular/core';
import {AppService} from "../service-app.service";
import {LogingComponent} from "../loging/loging.component";
import {DataService} from "../shared/data.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  inputValue: string = '';
  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.inputValue = this.dataService.getInputValue();
  }

}
