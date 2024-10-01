import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleFacade } from '../../store/module.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private moduleFacade:ModuleFacade) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
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
    this.moduleFacade.loginUser({username:this.form.value.username, password:this.form.value.password})
  }

}
