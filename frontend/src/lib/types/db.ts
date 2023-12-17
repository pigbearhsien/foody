export type SpecialInstruction = {
    name: string;
    required: boolean;
    options: string[];
};

export type SpecialInstructionsProps = {
    specialInstructions?: SpecialInstruction[];
};

export type AddButtonProps = {
    url: string;
};

export type CardProps = {
    id: number;
    uri: string;
    name: string;
    starNumber: number;
    likes?: boolean;
};

export type CardPriceProps = {
    uri: string;
    name: string;
    price: number;
    specialInstructions?: SpecialInstruction[];
}; 
export type CategoryProps = {
    id: number;
    categoryName: string;
    categoryImage: string;
};

export type RestaurantCardProps = {
    id: number;
    name: string;
    imageSrc: string;
    starNumber: number;
    phoneNumber: number;
    area: string;
};

export type Item = {
    name: string;
    price: number;
    quantity: number;
    note?: string;
    specialInstructions?: string[];
};

export type CartCardProps = {
    storeId: number;
    payment: number;
    pickupTime: string;
    items: Item[];
};

export interface LocationContextType {
    location: string | null;
    setLocation: (location: string) => void;
}

export type RestaurantCard = {
    area: string;
    category: number; 
    emailAddress: string; 
    favoriteCount: number;
    id: number;
    liked: boolean;
    name: string;
    phoneNumber: number;
    userId: number;
}