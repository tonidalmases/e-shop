export interface IShipping {
  name: string;
  address: {
    line1: string;
    line2?: string;
  };
  city: string;
  zipCode: string;
  country: string;
}
