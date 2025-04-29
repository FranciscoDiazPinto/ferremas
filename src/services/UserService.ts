import { User } from '../models/User';
import { OkPacket } from 'mysql2';
import db from '../database';

export class UserService {
  async create(user: User): Promise<User> {
    const [result] = await db.execute<OkPacket>(
      'INSERT INTO Users (username, password, name, lastname, email, phone, rol) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user.username, user.password, user.name, user.lastname, user.email, user.phone, user.rol]
    );
    return { ...user, id: result.insertId };
  }

  async findAll(): Promise<User[]> {
    const [rows] = await db.execute<any[]>('SELECT * FROM Users');
    return rows as User[];
  }

  async findOne(id: number): Promise<User | null> {
    const [rows] = await db.execute<any[]>('SELECT * FROM Users WHERE id = ?', [id]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0] as User;
  }

  async update(id: number, user: User): Promise<User | null> {
    await db.execute(
      'UPDATE Users SET username = ?, password = ?, name = ?, lastname = ?, email = ?, phone = ?, rol = ? WHERE id = ?',
      [user.username, user.password, user.name, user.lastname, user.email, user.phone, user.rol, id]
    );
    return await this.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await db.execute<OkPacket>('DELETE FROM Users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}