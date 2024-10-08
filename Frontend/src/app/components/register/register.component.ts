import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModuleFacade } from '../../store/module.facade';
import { NewUser } from '../../models/User.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private moduleFacade: ModuleFacade,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      image: ['default.jpg', [Validators.required]]
    })
  }

  get username() {
    return this.form.controls['username'];
  }

  get password() {
    return this.form.controls['password'];
  }

  submitForm() {
    console.log(this.form.value)
    // const newUser:NewUser = {
    //   username:this.form.
    // }
    const newUser: NewUser = { ...this.form.value };
    this.moduleFacade.registerUser(newUser);
    // this.moduleFacade.registerUser({ username: this.form.value.username, password: this.form.value.password })
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
