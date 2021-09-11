import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../respositories/UsersRepositories'

interface UserRequestInterface {
    name: string;
    email: string;
    admin?: boolean;
}

export class CreateUserService {
    async execute({name, email, admin}: UserRequestInterface) {
        const usersRepository = getCustomRepository(UsersRepositories);

        if(!email) { throw new Error(`Incorrect Email`) }

        const userAlreadyExists = await usersRepository.findOne({email})
    
        if(userAlreadyExists) { throw new Error(`User ${name} already exists`) } 

        const user = usersRepository.create({
            name,
            email,
            admin
        })

        await usersRepository.save(user)

        return user
    }
}