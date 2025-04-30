



// server.ts
import express from 'express';
import mysql from 'mysql2/promise';
import userRoutes from './routes/userRoutes';
import clientRoutes from './routes/clientRoutes';
import productRoutes from './routes/productRoutes';

const app = express();
const port = 3000;

app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_mysql_password',
  database: 'your_database_name',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export { pool };

app.use('/users', userRoutes);
app.use('/clients', clientRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// models/User.ts
export interface User {
  id?: number;
  username: string;
  password?: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  rol: 'client' | 'seller' | 'accountant' | 'admin';
}

// models/Client.ts
export interface Client {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  rfc: string;
}

// models/Product.ts
export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

// services/userService.ts
import { User } from '../models/User';
import { pool } from '../server';

export const createUser = async (user: User): Promise<User> => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute<any>(
      'INSERT INTO users (username, password, name, lastname, email, phone, rol) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user.username, user.password, user.name, user.lastname, user.email, user.phone, user.rol]
    );
    return { ...user, id: result.insertId };
  } finally {
    connection.release();
  }
};

export const getUsers = async (): Promise<User[]> => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute<any>('SELECT * FROM users');
      return rows;
    } finally {
      connection.release();
    }
};

// services/clientService.ts
import { Client } from '../models/Client';
import { pool } from '../server';

export const createClient = async (client: Client): Promise<Client> => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute<any>(
      'INSERT INTO clients (name, lastname, email, phone, address, rfc) VALUES (?, ?, ?, ?, ?, ?)',
      [client.name, client.lastname, client.email, client.phone, client.address, client.rfc]
    );
    return { ...client, id: result.insertId };
  } finally {
    connection.release();
  }
};

export const getClients = async (): Promise<Client[]> => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute<any>('SELECT * FROM clients');
      return rows;
    } finally {
      connection.release();
    }
};

// services/productService.ts
import { Product } from '../models/Product';
import { pool } from '../server';

export const createProduct = async (product: Product): Promise<Product> => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute<any>(
      'INSERT INTO products (name, description, price, stock, category) VALUES (?, ?, ?, ?, ?)',
      [product.name, product.description, product.price, product.stock, product.category]
    );
    return { ...product, id: result.insertId };
  } finally {
    connection.release();
  }
};

export const getProducts = async (): Promise<Product[]> => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute<any>('SELECT * FROM products');
      return rows;
    } finally {
      connection.release();
    }
};

// controllers/userController.ts
import { Request, Response } from 'express';
import { createUser, getUsers } from '../services/userService';
import { User } from '../models/User';

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const newUser = await createUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not create user' });
  }
};

export const getUsersHandler = async (req: Request, res: Response) => {
    try {
      const users = await getUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Could not get users' });
    }
};

// controllers/clientController.ts
import { Request, Response } from 'express';
import { createClient, getClients } from '../services/clientService';
import { Client } from '../models/Client';

export const createClientHandler = async (req: Request, res: Response) => {
  try {
    const client: Client = req.body;
    const newClient = await createClient(client);
    res.status(201).json(newClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not create client' });
  }
};

export const getClientsHandler = async (req: Request, res: Response) => {
    try {
      const clients = await getClients();
      res.status(200).json(clients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Could not get clients' });
    }
};

// controllers/productController.ts
import { Request, Response } from 'express';
import { createProduct, getProducts } from '../services/productService';
import { Product } from '../models/Product';

export const createProductHandler = async (req: Request, res: Response) => {
  try {
    const product: Product = req.body;
    const newProduct = await createProduct(product);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not create product' });
  }
};

export const getProductsHandler = async (req: Request, res: Response) => {
    try {
      const products = await getProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Could not get products' });
    }
};

// routes/userRoutes.ts
import express from 'express';
import { createUserHandler, getUsersHandler } from '../controllers/userController';

const router = express.Router();

router.post('/', createUserHandler);
router.get('/', getUsersHandler);

export default router;

// routes/clientRoutes.ts
import express from 'express';
import { createClientHandler, getClientsHandler } from '../controllers/clientController';

const router = express.Router();

router.post('/', createClientHandler);
router.get('/', getClientsHandler);

export default router;

// routes/productRoutes.ts
import express from 'express';
import { createProductHandler, getProductsHandler } from '../controllers/productController';

const router = express.Router();

router.post('/', createProductHandler);
router.get('/', getProductsHandler);

export default router;