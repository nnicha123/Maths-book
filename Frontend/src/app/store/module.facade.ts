import { Store } from "@ngrx/store";
import { ModuleEntityState } from "./definitions/store.definitions";
import { Login } from "../models/Login.model";
import * as fromLoginActions from './login-user/login-user.action';
import { Injectable } from "@angular/core";

@Injectable()
export class ModuleFacade {
    constructor(private store: Store<ModuleEntityState>) { }

    loginUser(login: Login): void {
        this.store.dispatch(fromLoginActions.loginUser({ login }));
    }
}