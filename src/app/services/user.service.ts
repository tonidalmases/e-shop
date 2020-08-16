import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { IUser } from '../models/user';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly usersPath = '/users/';

  constructor(private firebaseService: FirebaseService) {}

  public save(firebaseUser: firebase.User): void {
    const user: IUser = {
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      isAdmin: false,
    };

    this.firebaseService.updateWithKey<IUser>(
      this.usersPath,
      firebaseUser.uid,
      user
    );
  }

  public getUser(uid: string): Observable<IUser> {
    return uid
      ? this.firebaseService.get<IUser>(this.usersPath, uid)
      : of(null);
  }
}
