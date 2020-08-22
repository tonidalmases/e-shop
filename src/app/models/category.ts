import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface ICategoryData {
  name: string;
}

export class Category {
  id?: string;
  name: string;

  static getCategoryFromSnapshot(
    snapshot: QueryDocumentSnapshot<ICategoryData>
  ): Category {
    return {
      id: snapshot.id,
      name: snapshot.data().name,
    };
  }

  static getCategory(categoryData: ICategoryData): Category {
    return {
      name: categoryData.name,
    };
  }

  static getCategoryData(category: Category): ICategoryData {
    return {
      name: category.name,
    };
  }
}
