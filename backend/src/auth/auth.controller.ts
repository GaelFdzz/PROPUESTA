import { Body, Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ComparePasswordUser } from './dto/comparePasswordUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Get('/:id')
    comparePassword(@Param('id') id: string, @Body() data: ComparePasswordUser) {
        return this.authService.comparePasswordUser(Number(id), data);
    }
}
