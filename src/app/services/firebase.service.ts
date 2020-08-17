import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
  QueryFn,
} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase) {}

  public list<T>(path: string, queryFn?: QueryFn): Observable<T[]> {
    return this.db
      .list<T>(path, queryFn)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => ({ key: a.payload.key, ...a.payload.val() } as T))
        )
      );
  }

  public add<T>(path: string, data: T): firebase.database.ThenableReference {
    return this.db.list<T>(path).push(data);
  }

  public update<T>(path: string, data: T): void {
    if (data.hasOwnProperty('key')) {
      // tslint:disable-next-line: no-string-literal
      const key = data['key'];
      // tslint:disable-next-line: no-string-literal
      delete data['key'];

      this.db.object(path + key).update(data);
    }
  }

  public updateWithKey<T>(path: string, key: string, data: T): void {
    this.db.object(path + key).update(data);
  }

  public delete<T>(path: string, key: string): void {
    this.db.object<T>(path + key).remove();
  }

  public get<T>(path: string, key: string): Observable<T> {
    return this.db
      .object<T>(path + key)
      .snapshotChanges()
      .pipe(map((a) => ({ key: a.payload.key, ...a.payload.val() } as T)));
  }

  public getObject<T>(path: string, key: string): AngularFireObject<T> {
    return this.db.object<T>(path + key);
  }

  public transaction<T>(
    path: string,
    transactionUpdate: (data: T) => any
  ): void {
    this.db.database.ref(path).transaction(transactionUpdate);
  }
}
