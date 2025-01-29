import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllUsers(): Promise<User[]> {
        const usersFound = await this.prisma.user.findMany()
        if (!usersFound) {
            throw new NotFoundException("No users found")
        }

        return usersFound
    }

    async getUserById(id: number): Promise<User | null> { //Devolvera un tipo user o null si no existe
        const userFound = await this.prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!userFound) {
            throw new NotFoundException("User not found, try another user")
        }

        return userFound
    }

    async createUser(data: RegisterUserDto) {
        // Check if the user already exists
        const userExisting = await this.prisma.user.findFirst({
            where: {
                email: data.email,
            },
        });

        if (userExisting) {
            throw new NotAcceptableException("Email already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Log the security answers for debugging
        console.log("Security Answers Data:", data.securityAnswer);

        // Create the user with security answers
        const userCreated = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                securityAnswers: {
                    create: data.securityAnswer.map((answer) => ({
                        questionId: answer.questionId,
                        answer: answer.answer,
                    })),
                },
            },
            include: {
                securityAnswers: true, // Include the security answers in the response
            },
        });

        // Log the created user and their security answers
        console.log("User Created:", userCreated);
        console.log("Security Answers Created:", userCreated.securityAnswers);

        return userCreated;
    }

    async updateUser(id: number, data: UpdateUserDto): Promise<User> {
        return await this.prisma.user.update({
            where: {
                id
            },
            data
        })
    }

    async deleteUser(id: number): Promise<User> {
        return await this.prisma.user.delete({
            where: {
                id
            }
        })
    }

}