import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SecurityAnswerDto {
    @IsNotEmpty()
    questionId: number;

    @IsString()
    @IsNotEmpty()
    answer: string;
}

export class LoginFormDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SecurityAnswerDto) 
    securityAnswers: SecurityAnswerDto[];
}
