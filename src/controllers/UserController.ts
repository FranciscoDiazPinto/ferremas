import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { User } from '../models/User';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const user: User = req.body;
      const newUser = await this.userService.create(user);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error finding users' });
    }
  }

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userService.findOne(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error finding user' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const user: User = req.body;
      const updatedUser = await this.userService.update(id, user);
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.userService.delete(id);
      if (success) {
        res.json({ message: 'User deleted' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error deleting user' });
    }
  }
}