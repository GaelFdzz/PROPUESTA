import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    //Obtener todos los usuarios
    @Get('/getAllUsers')
    async getAllUsers() {
        const usersFounded = await this.userService.getAllUsers();
        if (!usersFounded) {
            throw new NotFoundException(`No users found`);
        }
        return usersFounded;
    }

    //Obtener un usuario por su ID

    @Get('/:id')
    async getUserById(@Param('id') id: String) { //@Param('id') sirve para
        const userFound = await this.userService.getUserById(Number(id));
        if (!userFound) {
            throw new NotFoundException(`User not found`);
        }
        return userFound;
    }

    //Crear un usuario
    @Post('/createUser')
    async createUser(@Body() data: RegisterUserDto) {
        const userCreated = await this.userService.createUser(data);

        if(!userCreated){
            throw new BadRequestException("User cant create")
        }

        return userCreated
    }

    //Eliminar un usuario
    @Delete('/delete/:id')
    async deleteUser(@Param('id') id: String) {
        const userFound = await this.userService.deleteUser(Number(id))

        if (!userFound) {
            throw new NotFoundException("User not found")
        }

        console.log("User deleted succeful")
        return userFound
    }

    @Patch('/update/:id')
    async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
        try {
            return await this.userService.updateUser(Number(id), data);
        } catch (error) {
            throw new NotFoundException("User not found")
        }
    }
}
