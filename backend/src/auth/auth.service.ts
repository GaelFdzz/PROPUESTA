import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { PrismaService } from 'src/prisma/prisma.service';
import { ComparePasswordUser } from './dto/comparePasswordUser.dto';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) { }

    async comparePasswordUser(id: number, data: ComparePasswordUser){

        const user = await this.prisma.user.findUnique({
            where: {
                id
            },
        })

        if(!user){
            throw new NotFoundException("User not found")
        }
        // console.log(data.password) //Contraseña no encriptada
        // console.log(user.password) //Contraseña encriptada

        //Compara las contraseñas
        let match = await bcrypt.compare(data.password, user.password)

        return match //Regresa true or false, true si son iguales, false si no.
    }
}