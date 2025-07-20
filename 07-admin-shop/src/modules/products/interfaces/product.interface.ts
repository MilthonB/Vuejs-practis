import type { User } from "@/modules/auth/interface/user.interface";


export interface Product {
    // map(arg0: (product: any) => any): unknown;
    id:          string;
    title:       string;
    price:       number;
    description: string;
    slug:        string;
    stock:       number;
    sizes:       size[];
    gender:      string;
    tags:        string[];
    images:      string[];
    user:        User;
}

export enum  size{
    L = "L",
    M = "M",
    S = "S",
    XL = "XL",
    Xs = "XS",
    Xxl = "XXL",
}
