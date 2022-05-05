/* eslint-disable @typescript-eslint/no-empty-function */
import SubmitFeedbackUseCase from "./SubmitFeedback.useCase";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe("Submit feedback", () => {
  const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
  );

  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.handle({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64,test.jpg",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.handle({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64,test.jpg",
      })
    ).rejects.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback without comment", async () => {
    await expect(
      submitFeedback.handle({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,test.jpg",
      })
    ).rejects.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.handle({
        type: "BUG",
        comment: "ta tudo bugado!",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });
});
