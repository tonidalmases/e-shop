import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IUserData, User } from '../models/user';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly usersPath = '/users/';

  user$: Observable<User>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) =>
        user
          ? this.firebaseService
              .get<IUserData>(this.usersPath, user.uid)
              .pipe(map((snapshot) => User.getUserFromSnapshot(snapshot)))
          : of(null)
      )
    );
  }

  public async loginWithGoogle(): Promise<void> {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

    const provider = new firebase.auth.GoogleAuthProvider();
    const userCredential = await this.afAuth.signInWithPopup(provider);
    this.updateUserData(userCredential.user);

    this.router.navigate([returnUrl]);
  }
  private updateUserData(user: firebase.User): void {
    const userData: IUserData = {
      name: user.displayName,
      email: user.email,
      isAdmin: false,
    };
    this.firebaseService.update(this.usersPath, user.uid, userData);
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
