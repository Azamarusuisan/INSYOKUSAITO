export type ShopType = "restaurant" | "salon";

export type MenuItem = {
  id: string;
  name: string;
  subName?: string;
  price: number;
  description?: string;
  imageUrl?: string;
  badge?: string;
  isPublished: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  subName?: string;
  isPublished: boolean;
  items: MenuItem[];
};

export type StoreInfo = {
  name: string;
  nameJa: string;
  tagline: string;
};

export type ShopData = {
  type: ShopType;
  info: StoreInfo;
  categories: MenuCategory[];
};

export type AppState = {
  restaurant: ShopData;
  salon: ShopData;
};
