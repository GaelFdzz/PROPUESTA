import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginFormDto } from './dto/loginForm.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('predefined-questions')
    async getPredefinedQuestions() {
        return this.authService.getPredefinedQuestions();
    }

    @Post('login')
    async login(@Body() loginFormDto: LoginFormDto) {
        const { email, password } = loginFormDto;
        const user = await this.authService.validateUser(email, password); // Validar usuario y contraseña
        const { securityQuestions } = await this.authService.login(user); // Obtener preguntas de seguridad

        return { securityQuestions }; // Retornar solo las preguntas de seguridad
    }

    @Post('validate-security')
    async validateSecurityAnswers(@Body() body: any) {
        const { email, securityAnswers } = body;
        const result = await this.authService.validateSecurityAnswers(email, securityAnswers);
        return result; // Retornar el token si las respuestas son correctas
    }
}