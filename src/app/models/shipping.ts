export interface IShippingData {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

export class Shipping {
  id?: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;

  static getShippingData(shipping: Shipping): IShippingData {
    return {
      name: shipping.name,
      address: shipping.address,
      city: shipping.city,
      zipCode: shipping.zipCode,
      country: shipping.country,
    };
  }

  static getShipping(shippingData: IShippingData): Shipping {
    return {
      name: shippingData.name,
      address: shippingData.address,
      city: shippingData.city,
      zipCode: shippingData.zipCode,
      country: shippingData.country,
    };
  }
}
