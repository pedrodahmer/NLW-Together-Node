import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

export class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { tag_id, user_sender, user_receiver, message } = request.body;

    const createComplimentsService = new CreateComplimentService();

    const compliment = await createComplimentsService.execute({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    return response.json(compliment);
  }
}
