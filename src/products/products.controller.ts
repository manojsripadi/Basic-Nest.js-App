import {
  Controller,
  Post,
  Body,
  Header,
  Get,
  Param,
  Patch,
  Head,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private productsService: ProductService) {}

  @Post()
  @Header('Content-type', 'application/json')
  async insertPosts(
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const product = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { message: 'product added successfully', product };
  }

  @Get()
  async getProducts() {
    const products = await this.productsService.getProductsInfo();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') prodID: string) {
    const product = this.productsService.getProduct(prodID);
    return product;
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodID: string,
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const product = await this.productsService
      .updateProduct(prodID, prodTitle, prodDesc, prodPrice)
      .catch((err) => {
        throw new NotFoundException();
      });
    if (product) {
      return { message: 'updated successfully', content: product };
    }
    // throw new NotFoundException();
  }

  @Delete(':id')
  async deleteProduct(@Param('id') productID: string) {
    const product = this.productsService.deleteProduct(productID);
    return product;
  }
}
