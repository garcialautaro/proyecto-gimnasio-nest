import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, MaxLength, IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class FilterPersonaDto {

    @ApiProperty({
        example: `2634540527`,
        description: `Phone number`,
        maxLength: 20,
        nullable: true,
    })
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsPhoneNumber()
    @IsOptional()
    Telefono?: string;

    @ApiProperty({
        example: `Lautaro`,
        description: `Persona's first name`,
        maxLength: 30,
        nullable: false,
    })
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @IsOptional()
    Nombre?: string;

    @ApiProperty({
        example: `Garcia`,
        description: `Persona's last name`,
        maxLength: 30,
        nullable: false,
    })
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @IsOptional()
    Apellido?: string;

    @ApiProperty({
        example: `2023-02-13T13:22:17.873Z`,
        description: `Persona's birth date`,
        nullable: false,
    })
    @IsString()
    @IsOptional()
    FechaNac?: string;

    @ApiProperty({
        example: `ARG37622822`,
        description: `Persona's identification number`,
        nullable: false,
        uniqueItems: true,
        maxLength: 15,
    })
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    @IsOptional()
    Dni?: string;

    @ApiProperty({
        example: `F`,
        description: `Persona's sexual orientation`,
        nullable: false,
        maxLength: 1,
        examples: ['F', 'M', 'N', 'O']
    })
    @IsString()
    @MinLength(1)
    @MaxLength(1)
    @IsOptional()
    @IsIn(['M', 'F', 'N', 'O'], {
        message: `Sexo must be one of the following values: M, F, N, O. M='Masculino', F='Femenino', N='No binario', O='Otro'`
    })
    Sexo?: string;

    @ApiProperty({
        example: `Id consequat Lorem occaecat anim anim nisi Lorem anim id non mollit tempor labore. Ut est veniam culpa sunt non anim. Deserunt consectetur voluptate ipsum ullamco adipisicing pariatur incididunt.`,
        description: `Persona's observation text`,
        maxLength: 250,
        nullable: true
    })
    @IsString()
    @MaxLength(250)
    @IsOptional()
    Observacion?: string;

    @IsIn(['0','1'])
    @IsOptional()
    Activo?: string;
}
