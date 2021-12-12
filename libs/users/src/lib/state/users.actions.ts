import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const buildUserSession = createAction('[User] Build User Session');

// Effective Actions based on Validation Tokens
export const buildUserSessionSuccess = createAction(
  '[User] Build User Session Success',
  props<{ users: User }>()
);

export const buildUserSessionFailure = createAction('[User] Build User Session Failure');
