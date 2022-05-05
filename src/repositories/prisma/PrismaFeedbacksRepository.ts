import prisma from "../../prisma";

import type {
  FeedbacksCreateData,
  FeedbacksRepository,
} from "../FeedbacksRepository";

class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create(data: FeedbacksCreateData) {
    const { type, comment, screenshot } = data;

    await prisma.feedback.create({
      data: { type, comment, screenshot },
    });
  }
}

export default PrismaFeedbacksRepository;
