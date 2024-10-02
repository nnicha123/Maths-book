import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../../models/User.model';
import { ModuleFacade } from '../../store/module.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user$: Observable<User>;

  constructor(private moduleFacade: ModuleFacade, private router:Router) {
    this.user$ = this.moduleFacade.user$;
  }

  logOutUser() {
    // Temporary logout
    this.moduleFacade.logoutUser();
  }

}
