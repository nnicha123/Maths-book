import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../../models/User.model';
import { ModuleFacade } from '../../store/module.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user$: Observable<User>;

  constructor(private moduleFacade: ModuleFacade) {
     this.user$ = this.moduleFacade.user$;
  }

}
