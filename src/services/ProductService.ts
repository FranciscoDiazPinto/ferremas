import { OkPacket, RowDataPacket } from 'mysql2';
import { Product } from '../models/Product';
import pool from '../database';

class ProductService {
  async create(product: Product): Promise<Product> {
    const [result] = await pool.execute<OkPacket>(
      'INSERT INTO products (name, description, price, stock, category) VALUES (?, ?, ?, ?, ?)',
      [product.name, product.description, product.price, product.stock, product.category]
    );
    return { ...product, id: result.insertId };
  }

  async findAll(): Promise<Product[]> {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM products');
    return rows as Product[];
  }

  async findOne(id: number): Promise<Product | null> {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0] as Product;
  }

  async update(id: number, product: Product): Promise<Product | null> {
    await pool.execute<OkPacket>(
      'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ? WHERE id = ?',
      [product.name, product.description, product.price, product.stock, product.category, id]
    );
    return await this.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute<OkPacket>('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

export default new ProductService();