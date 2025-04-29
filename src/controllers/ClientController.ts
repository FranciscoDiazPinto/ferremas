import { Request, Response } from 'express';
import { ClientService } from '../services/ClientService';

export class ClientController {
  private clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const clientData = req.body;
      const newClient = await this.clientService.create(clientData);
      res.status(201).json(newClient);
    } catch (error) {
      res.status(500).json({ error: 'Error creating client' });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const clients = await this.clientService.findAll();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving clients' });
    }
  }

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const clientId = parseInt(req.params.id);
      const client = await this.clientService.findOne(clientId);
      if (client) {
        res.json(client);
      } else {
        res.status(404).json({ error: 'Client not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving client' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const clientId = parseInt(req.params.id);
      const clientData = req.body;
      const updatedClient = await this.clientService.update(clientId, clientData);
      if (updatedClient) {
        res.json(updatedClient);
      } else {
        res.status(404).json({ error: 'Client not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating client' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const clientId = parseInt(req.params.id);
      const result = await this.clientService.delete(clientId);
      if (result) {
        res.json({ message: 'Client deleted' });
      } else {
        res.status(404).json({ error: 'Client not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error deleting client' });
    }
  }
}