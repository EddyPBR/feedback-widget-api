import { MailAdapter } from "~adapters/Mail.adapter";
import { FeedbacksRepository } from "~repositories/Feedbacks.repository";
import AppException from "~exceptions/App.exception";
interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async handle(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new AppException(400, "Type is required");
    }

    if (!comment) {
      throw new AppException(400, "Comment is required");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new AppException(400, "Invalid screenshot format");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot
          ? `<img src="${screenshot}" alt="screenshot sended by user" />`
          : null,
        `</div>`,
      ].join("\n"),
    });
  }
}

export default SubmitFeedbackUseCase;
