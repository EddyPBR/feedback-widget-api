import express from "express";
import SubmitFeedbackUseCase from "~useCases/SubmitFeedback.useCase";
import NodemailerMailAdapter from "~adapters/nodemailer/nodemailerMail.adapter";
import PrismaFeedbacksRepository from "~repositories/prisma/PrismaFeedbacks.repository";

const routes = express.Router();

routes.post("/feedbacks", async (request, response) => {
  const { type, comment, screenshot } = request.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.handle({
    type,
    comment,
    screenshot,
  });

  return response.status(201).send();
});

export default routes;
