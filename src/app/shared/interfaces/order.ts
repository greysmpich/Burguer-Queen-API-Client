import { Time } from "@angular/common"
import { productInter } from "./product"

export interface Order {
    client: string,
    products: orderedProducts[],
    status: string,
    dataEntry: Date,
    id: number,
    total: number,
    //elapsedTime?: number; 
  }

export interface orderedProducts {
    qty: number,
    product: productInter | undefined
  }