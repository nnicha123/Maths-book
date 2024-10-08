import { Component, Input, OnInit } from '@angular/core';
import { Observable, pipe, take, tap } from 'rxjs';
import { User } from '../../models/User.model';
import { ModuleFacade } from '../../store/module.facade';
import { Router } from '@angular/router';
import { MAX_STARS } from '../../store/utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  @Input() disabled: boolean = false;
  maxStars = MAX_STARS;
  user$: Observable<User>;

  constructor(private moduleFacade: ModuleFacade, private router: Router) {
    this.user$ = this.moduleFacade.user$;
  }

  ngOnInit(): void {
  }

  turnAllPagesForward(){
    this.moduleFacade.turnAllPagesForward();
  }

  logOutUser() {
    // Temporary logout
    this.moduleFacade.logoutUser();
  }

}
