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
  id?: string;
  name: string;
  email: string;
  isAdmin: boolean;

  static getUserFromSnapshot(snapshot: DocumentSnapshot<IUserData>): User {
    return {
      id: snapshot.id,
      name: snapshot.data().name,
      email: snapshot.data().email,
      isAdmin: snapshot.data().isAdmin,
    };
  }

  static getUserWithId(userData: IUserDataId): User {
    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      isAdmin: userData.isAdmin,
    };
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
