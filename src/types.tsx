export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
}

export interface Category {
    id: string;
    name: string;
    billBoard: Billboard
}

export interface Product {
    id: string
    category: Category;
    name: string
    price: string;
    size: Size;
    color: Color;
    storeID: string
    images: Image[];
    isFeatured: boolean
    isArchived: boolean
    createdAt: Date
    updatedAt?: Date
}
export interface ProductIDs {
    id: string
    storeID: string
    name: string
    price: string;
    sizeID: string;
    colorID: string;
    categoryID: string;
    isFeatured: boolean
    isArchived: boolean
    createdAt: Date
    updatedAt: Date
}


export interface Image {
    id: string
    url: string
}

export interface Size {
    id: string
    name: string
    value: string
}

export interface Color {
    id: string
    name: string
    value: string
}