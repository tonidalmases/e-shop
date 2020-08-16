import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IUser } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  public loginWithGoogle(): void {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

    this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCredential) => {
        this.userService.save(userCredential.user);
        this.router.navigate([returnUrl]);
      });
  }

  public logout(): void {
    this.afAuth.signOut().then(() => this.router.navigate(['']));
  }

  public get appUser$(): Observable<IUser> {
    return this.afAuth.user.pipe(
      switchMap((fb) => this.userService.getUser(fb?.uid))
    );
  }
}
