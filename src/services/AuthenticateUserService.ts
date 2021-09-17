import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../respositories/UsersRepositories";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthenticateRequestInterface {
    email: string;
    password: string;
}

export class AuthenticateUserService {
    async execute({ email, password }: AuthenticateRequestInterface ){
        const usersRepositories = getCustomRepository(UsersRepositories)

        //verifica se o usuário existe através do email
        const user = await usersRepositories.findOne({ email })

        if(!user) { 
            throw new Error(`Incorrect email or password`)
        }

        //verifica se a senha bate com a senha do usuário
        const passwordsMatch = await compare(password, user.password)

        if(!passwordsMatch) {
            throw new Error(`Incorrect email or password`)
        }

        const token = sign({ 
                email: user.email 
            }, "e4ee58ebfecac50753b45ee454175ec3", { 
                subject: user.id, 
                expiresIn: "1d"
            }
        )

        return token
    }
}