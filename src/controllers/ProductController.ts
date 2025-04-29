import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const product = await this.productService.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productService.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error finding products', error });
    }
  }

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const product = await this.productService.findOne(id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error finding product', error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const product = await this.productService.update(id, req.body);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.productService.delete(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error });
    }
  }
}