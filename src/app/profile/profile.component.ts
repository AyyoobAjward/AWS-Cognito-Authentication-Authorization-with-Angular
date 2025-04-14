import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-profile',
  imports: [
    NzCardModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com'
  };
}
