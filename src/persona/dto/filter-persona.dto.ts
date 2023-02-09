import { IsPhoneNumber, MaxLength, IsIn, IsOptional, IsString, MinLength, IsBoolean } from "class-validator";

export class FilterPersonaDto {

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsPhoneNumber()
    @IsOptional()
    Telefono?: string;

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @IsOptional()
    Nombre?: string;

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @IsOptional()
    Apellido?: string;

    @IsString()
    @IsOptional()
    FechaNac?: string;

    @IsString()
    @MinLength(3)
    @MaxLength(15)
    @IsOptional()
    Dni?: string;

    @IsString()
    @MinLength(1)
    @MaxLength(1)
    @IsOptional()
    @IsIn(['M', 'F', 'N', 'O'], {
        message: `Sexo must be one of the following values: M, F, N, O. M='Masculino', F='Femenino', N='No binario', O='Otro'`
    })
    Sexo?: string;

    @IsString()
    @MaxLength(250)
    @IsOptional()
    Observacion?: string;

    @IsIn(['0','1'])
    @IsOptional()
    Activo?: string;
}
