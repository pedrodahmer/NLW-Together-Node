import { getCustomRepository } from "typeorm";
import { TagsRepositories } from '../respositories/TagsRepositories'


export class CreateTagService {
    async execute(name: string) {
        const tagsRepositories = getCustomRepository(TagsRepositories)

        if(!name) {
            throw new Error("Name is incorrect!")
        }

        const tagAlreadyExists = await tagsRepositories.findOne({ name })

        if (tagAlreadyExists) {
            throw new Error(`Tag ${ name } already exists`)
        }

        const tag = tagsRepositories.create({ name })

        await tagsRepositories.save(tag)

        return tag
    }
}