import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../respositories/UsersRepositories'
import { hash } from 'bcryptjs'

interface UserRequestInterface {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

export class CreateUserService {
    async execute({name, email, admin, password}: UserRequestInterface) {
        const usersRepository = getCustomRepository(UsersRepositories);

        if(!email) { throw new Error(`Incorrect Email`) }

        const userAlreadyExists = await usersRepository.findOne({email})
    
        if(userAlreadyExists) { throw new Error(`User ${name} already exists`) } 

        const hashedPassword = await hash(password, 8)

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: hashedPassword
        })

        await usersRepository.save(user)

        return user
    }
}