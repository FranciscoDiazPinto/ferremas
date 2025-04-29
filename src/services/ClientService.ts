import { OkPacket, RowDataPacket } from 'mysql2';
import { Client } from '../models/Client';
import { pool } from '../database';

interface ClientService {
  create(client: Client): Promise<Client>;
  findAll(): Promise<Client[]>;
  findOne(id: number): Promise<Client | null>;
  update(id: number, client: Client): Promise<Client | null>;
  delete(id: number): Promise<boolean>;
}

class ClientServiceImpl implements ClientService {
  async create(client: Client): Promise<Client> {
    const [result] = await pool.execute<OkPacket>(
      'INSERT INTO clients (name, lastname, email, phone, address, rfc) VALUES (?, ?, ?, ?, ?, ?)',
      [client.name, client.lastname, client.email, client.phone, client.address, client.rfc]
    );
    return { id: result.insertId, ...client };
  }

  async findAll(): Promise<Client[]> {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM clients');
    return rows as Client[];
  }

  async findOne(id: number): Promise<Client | null> {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM clients WHERE id = ?', [id]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0] as Client;
  }

  async update(id: number, client: Client): Promise<Client | null> {
    const [result] = await pool.execute<OkPacket>(
      'UPDATE clients SET name = ?, lastname = ?, email = ?, phone = ?, address = ?, rfc = ? WHERE id = ?',
      [client.name, client.lastname, client.email, client.phone, client.address, client.rfc, id]
    );
    if (result.affectedRows === 0) {
      return null;
    }
    return { id, ...client };
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute<OkPacket>('DELETE FROM clients WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

export const clientService: ClientService = new ClientServiceImpl();