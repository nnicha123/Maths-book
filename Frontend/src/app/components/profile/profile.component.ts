import { Component, OnInit } from '@angular/core';
import { Observable, pipe, take, tap } from 'rxjs';
import { User } from '../../models/User.model';
import { ModuleFacade } from '../../store/module.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user$: Observable<User>;
  ranking$: Observable<number>;
  constructor(private moduleFacade: ModuleFacade, private router: Router) {
    this.user$ = this.moduleFacade.user$;
    this.ranking$ = this.moduleFacade.ranking$
  }

  ngOnInit(): void {
  }



  logOutUser() {
    // Temporary logout
    this.moduleFacade.logoutUser();
  }

}
