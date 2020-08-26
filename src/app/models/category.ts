import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface ICategoryData {
  name: string;
}

export class Category {
  constructor(public name: string, public id?: string) {}

  static getCategoryFromSnapshot(
    snapshot: QueryDocumentSnapshot<ICategoryData>
  ): Category {
    return new Category(snapshot.data().name, snapshot.id);
  }

  static getCategory(categoryData: ICategoryData): Category {
    return new Category(categoryData.name);
  }

  static getCategoryData(category: Category): ICategoryData {
    return {
      name: category.name,
    };
  }
}
