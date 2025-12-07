import { Request, Response } from "express";
import createPublisherService from "../services/publishers/createPublisherService";
import getAllPublishersService from "../services/publishers/getAllPublishersService";
import updatePublisherService from "../services/publishers/updatePublisherService";
import publisherRepository from "../model/publishers/publisherRepository";

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!createPublisherService.validPayload(req.body)) {
      res.status(400).json({ message: "Payload inválido" });
      return;
    }

    const newPublisher = await createPublisherService.create(req.body);
    res.json({
      message: "Publisher criado com sucesso",
      publisher: newPublisher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno" });
  }
};

const getAllPublishers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const publishers = await getAllPublishersService.getPublishers();
    res.json(publishers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno" });
  }
};

const getPublisher = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reference } = req.params;
    const publisher = await publisherRepository.findByReference(reference);

    if (!publisher) {
      res.status(404).json({ message: "Publisher não encontrado" });
      return;
    }

    res.json(publisher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno" });
  }
};


const updatePublisher = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await updatePublisherService.update(req.body, Number(id));

    if (!updated) {
      res.status(404).json({ message: "Publisher não encontrado" });
      return;
    }

    res.json({ message: "Publisher atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno" });
  }
};

const notify = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Notificação recebida:", req.body);
    res.json({ message: "Notificação processada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno" });
  }
};

export default {
  create,
  getAllPublishers,
  getPublisher,
  updatePublisher,
  notify,
};