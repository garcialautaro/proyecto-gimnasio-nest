import { IsDate, IsPhoneNumber, MaxLength, IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePersonaDto {

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsPhoneNumber()
    @IsOptional()
    Telefono?: string;

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    Nombre: string;

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    Apellido: string;

    @IsString()
    FechaNac: string;

    @IsString()
    @MinLength(3)
    @MaxLength(15)
    Dni: string;

    @IsString()
    @MinLength(1)
    @MaxLength(1)
    @IsIn(['M', 'F', 'N', 'O'], {
        message: `Sexo must be one of the following values: M, F, N, O. M='Masculino', F='Femenino', N='No binario', O='Otro'`
    })
    Sexo: string;

    @IsString()
    @MaxLength(250)
    @IsOptional()
    Observacion?: string;

    @IsOptional()
    Foto?: string;


}
