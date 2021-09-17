import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../respositories/ComplimentsRespositories";
import { UsersRepositories } from "../respositories/UsersRepositories";

interface CreateComplimenteRequestInterface {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

export class CreateComplimentService {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: CreateComplimenteRequestInterface) {
    const complimentsReposiries = getCustomRepository(ComplimentsRepositories);
    const usersRepositories = getCustomRepository(UsersRepositories);

    if (user_sender === user_receiver) {
      throw new Error(`User cant compliment himself!`);
    }

    const userReceiverExists = await usersRepositories.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new Error(`User receiver does not exist!`);
    }

    const compliment = complimentsReposiries.create({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    await complimentsReposiries.save(compliment);

    return compliment;
  }
}
