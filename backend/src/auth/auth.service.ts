import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async getPredefinedQuestions() {
        return this.prisma.predefinedQuestions.findMany();
    }
    
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.prisma.user.findFirst({
            where: { email },
            include: { securityAnswers: true },
        });

        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Contraseña incorrecta');
        }

        return user;
    }

    async login(user: any) {
        // Obtener las preguntas de seguridad
        const securityQuestions = await this.prisma.securityAnswers.findMany({
            where: { userId: user.id },
            include: { predefinedQuestion: true },
        });

        return {
            securityQuestions: securityQuestions.map((sq) => ({
                questionId: sq.questionId,
                question: sq.predefinedQuestion.question,
            })),
        };
    }

    async validateSecurityAnswers(email: string, securityAnswers: any[]) {
        const user = await this.prisma.user.findFirst({
            where: { email },
            include: { securityAnswers: true },
        });

        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        // Verificar que todas las respuestas estén presentes y no estén vacías
        for (const answer of securityAnswers) {
            if (!answer.answer || answer.answer.trim() === "") {
                throw new UnauthorizedException('Todas las respuestas son requeridas');
            }
        }

        // Validar todas las respuestas de seguridad
        for (const answer of securityAnswers) {
            const securityAnswer = user.securityAnswers.find(
                (sq) => sq.questionId === answer.questionId,
            );
            if (!securityAnswer || securityAnswer.answer.trim().toLowerCase() !== answer.answer.trim().toLowerCase()) {
                throw new UnauthorizedException('Respuesta de seguridad incorrecta');
            }
        }

        // Si todas las respuestas son correctas, generar el token
        const payload = { email: user.email, sub: user.id };
        const token = this.jwtService.sign(payload);
        return { token };
    }
}