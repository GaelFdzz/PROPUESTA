import { Type } from "class-transformer"
import { IsNumber, IsString, ValidateNested } from "class-validator"

class SecurityAnswer {
    @IsNumber()
    questionId: number

    @IsString()
    answer: string
}

export class RegisterUserDto{
    @IsString()
    name: string

    @IsString()
    email: string

    @IsString()
    password: string

    @ValidateNested({ each: true })
    @Type(() => SecurityAnswer)
    securityAnswer: SecurityAnswer[];
}