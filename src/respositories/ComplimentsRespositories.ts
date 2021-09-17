import { Repository, EntityRepository } from "typeorm";
import { Compliment } from "../entities/Compliment";

@EntityRepository(Compliment)
export class ComplimentsRepositories extends Repository<Compliment> {}
