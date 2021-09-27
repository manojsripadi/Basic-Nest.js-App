import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({ title, desc, price });
    // this.products.push(newProduct);
    const product = await newProduct.save();
    console.log(product);
    return product;
  }

  async getProductsInfo() {
    // return [...this.products];
    const products = await this.productModel.find({});
    return products;
  }

  async getProduct(prodID: string) {
    const product = await this.productModel.findById(prodID).catch((err) => {
      throw new NotFoundException();
    });
    return product;
  }

  async updateProduct(ID: string, title: string, desc: string, price: number) {
    // const productIndex = this.products.findIndex((prod) => prod.id === ID);
    // if (productIndex < 0) {
    //   return null;
    // } else {
    //   const product = this.products[productIndex];
    //   const updatedProduct = { ...product };
    //   if (title) {
    //     updatedProduct.title = title;
    //   }
    //   if (desc) {
    //     updatedProduct.desc = desc;
    //   }
    //   if (price) {
    //     updatedProduct.price = price;
    //   }
    //   this.products[productIndex] = updatedProduct;
    //   return this.products[productIndex];
    // }
    // try {
    const product = await this.productModel.findByIdAndUpdate(ID, {
      title,
      desc,
      price,
    });
    return product;
  }

  async deleteProduct(ID: string) {
    const product = await this.productModel.deleteOne({ _id: ID });
    return product;
  }
}
