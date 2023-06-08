import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { BackendService } from '../services/backend.service';
@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.less']
})
export class SettingsPageComponent {
  constructor(private backendService:BackendService){
    
  }
  
  getUser():User|null{
    return this.backendService.user
  }
}
