import { Request, Response } from "express";
import crypto from "crypto";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import mercadoPagoConfig from "../../config/mercadoPagoConfig";
import createBookService from "../../services/book/createBook";
import getBooks from "../../services/book/getBooks";
import getBook from "../../services/book/getBook";
import updateBook from "../../services/book/updateBook";
import destroyBook from "../../services/book/destroyBook";
import bookRepository from "../../model/book/bookRepository";

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;

    if (!createBookService.validPayload(body)) {
      res.status(400).json({ message: "Você precisa enviar título e autor" });
      return;
    }

    const reference = crypto.randomUUID();

    const bookCreated = await createBookService.create({
      ...body,
      reference,
      status: "pending",
    });

    if (!bookCreated) {
      res.status(500).json({ message: "Não foi possível criar o livro" });
      return;
    }

    const client = mercadoPagoConfig();
    if (!client) {
      res.status(500).json({ message: "Erro interno" });
      return;
    }

    const preference = new Preference(client as MercadoPagoConfig);
    const result = await preference.create({
      body: {
        items: [
          {
            id: reference,
            title: body.title,
            quantity: 1,
            unit_price: body.price || 50,
          },
        ],
        external_reference: reference, 
        back_urls: {
          success: "http://localhost:3000/success",
          failure: "http://localhost:3000/failure",
          pending: "http://localhost:3000/pending",
        },
      },
    });

    res.json({
      message: "Livro criado com checkout simulado",
      reference,
      linkCheckout: result.init_point,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno" });
  }
};

// Notificação (webhook do Mercado Pago)
const notify = async (req: Request, res: Response): Promise<void> => {
  const externalReference = req.body?.data?.external_reference;
  const status = req.body?.data?.status;

  if (!externalReference || !status) {
    res.status(400).json({ message: "Payload inválido" });
    return;
  }

  const book = await bookRepository.findByReference(externalReference);

  if (!book) {
    res.status(400).json({ message: "Livro não existe" });
    return;
  }

  const updated = await bookRepository.update({ status }, book.id);

  if (!updated) {
    res.status(500).json({ message: "Não foi possível atualizar o status" });
    return;
  }

  res.json({ message: "Status atualizado com sucesso", reference: externalReference, status });
};

// Listar todos os livros
const list = async (_req: Request, res: Response): Promise<void> => {
  try {
    const books = await getBooks();
    res.json({ total: books.length, books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno" });
  }
};

const get = async (req: Request, res: Response): Promise<void> => {
  try {
    const reference = req.params.reference;

    const client = mercadoPagoConfig();
    if (!client) {
      res.status(500).json({ message: "Erro interno" });
      return;
    }

    const payment = new Payment(client as MercadoPagoConfig);
    const bookMercadoPago = await payment.search({
      options: { external_reference: reference },
    });

    const book = await getBook(reference);

    res.json({ book, bookMercadoPago });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno" });
  }
};

// Atualizar livro
const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const ok = await updateBook(Number(id), req.body);

    if (!ok) {
      res.status(404).json({ message: "Livro não encontrado" });
      return;
    }

    res.json({ message: "Livro atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno" });
  }
};

// Remover livro
const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const ok = await destroyBook(Number(id));

    if (!ok) {
      res.status(404).json({ message: "Livro não encontrado" });
      return;
    }

    res.json({ message: "Livro removido com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno" });
  }
};

export default { create, notify, list, get, update, destroy };