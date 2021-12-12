import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {

  constructor(private store: Store) {}

  currentUser$ = this.store.pipe(select(UsersSelectors.getUser))  // calling a selector
  isAuthenticated$ = this.store.pipe(select(UsersSelectors.getUserIsAuth)) 

  
  buildUserSession() {
    this.store.dispatch(UsersActions.buildUserSession())   // calling an action
  }
}
