import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  QueryFn,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  public list<T>(
    path: string,
    queryFn?: QueryFn
  ): Observable<QueryDocumentSnapshot<T>[]> {
    return this.firestore
      .collection<T>(path, queryFn)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.filter((a) => a.payload.doc.exists).map((a) => a.payload.doc)
        )
      );
  }

  public add<T>(path: string, data: T): Promise<DocumentReference> {
    return this.firestore.collection(path).add(data);
  }

  public update<T>(path: string, id: string, data: T): Promise<void> {
    return this.firestore.collection(path).doc<T>(id).set(data);
  }

  public delete<T>(path: string, id: string): Promise<void> {
    return this.firestore.collection(path).doc<T>(id).delete();
  }

  public get<T>(path: string, id: string): Observable<DocumentSnapshot<T>> {
    return this.firestore
      .collection<T>(path)
      .doc<T>(id)
      .snapshotChanges()
      .pipe(
        filter((a) => a.payload.exists),
        map((a) => a.payload)
      );
  }

  public getDocumentReference(
    path: string,
    id: string
  ): firebase.firestore.DocumentReference<firebase.firestore.DocumentData> {
    return this.firestore.firestore.collection(path).doc(id);
  }

  public runTransaction(
    updateTransaction: (
      transaction: firebase.firestore.Transaction
    ) => Promise<unknown>
  ): Promise<unknown> {
    return this.firestore.firestore.runTransaction(updateTransaction);
  }

  public async emptyCollection(path: string): Promise<unknown> {
    const collection = await this.firestore.firestore.collection(path).get();

    const updateTransaction = async (
      transaction: firebase.firestore.Transaction
    ) => {
      collection.forEach((document) => transaction.delete(document.ref));
    };

    return this.runTransaction(updateTransaction);
  }
}
