import { DocumentSnapshot } from '@angular/fire/firestore';

export interface IUserData {
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface IUserDataId {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export class User {
  constructor(
    public name: string,
    public email: string,
    public isAdmin: boolean,
    public id?: string
  ) {}

  static getUserFromSnapshot(snapshot: DocumentSnapshot<IUserData>): User {
    return new User(
      snapshot.data().name,
      snapshot.data().email,
      snapshot.data().isAdmin,
      snapshot.id
    );
  }

  static getUserWithId(userData: IUserDataId): User {
    return new User(
      userData.name,
      userData.email,
      userData.isAdmin,
      userData.id
    );
  }

  static getUserDataWithId(user: User): IUserDataId {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
  }
}
