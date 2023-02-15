import { ApiProperty } from "@nestjs/swagger";
import {    BeforeInsert, 
            BeforeUpdate, 
            Column, 
            Entity, 
            PrimaryGeneratedColumn   } from "typeorm";



@Entity()
export class Persona {

    @ApiProperty({
        example: 0,
        description: `Persona ID`,
        uniqueItems: true,
        readOnly: true,
    })
    @PrimaryGeneratedColumn()
    id : number;
    
    @ApiProperty({
        example: `2634540527`,
        description: `Phone number`,
        maxLength: 20,
        nullable: true,
    })
    @Column('varchar', {
        length: 20,
        nullable: true,
    })
    Telefono : string;

    @ApiProperty({
        example: `Lautaro`,
        description: `Persona's first name`,
        maxLength: 30,
        nullable: false,
    })
    @Column('varchar', {
        length: 30,
        nullable: false,
    })
    Nombre : string;

    @ApiProperty({
        example: `Garcia`,
        description: `Persona's last name`,
        maxLength: 30,
        nullable: false,
    })
    @Column('varchar', {
        length: 30,
        nullable: false,
    })
    Apellido : string;

    @ApiProperty({
        example: `2023-02-13T13:22:17.873Z`,
        description: `Persona's birth date`,
        nullable: false,
    })
    @Column('datetime2', {
        nullable: false,
    })
    FechaNac : Date;

    @ApiProperty({
        example: `ARG37622822`,
        description: `Persona's identification number`,
        nullable: false,
        uniqueItems: true,
        maxLength: 15,
    })
    @Column('varchar', {
        length: 15,
        nullable: false,
        unique: true,
    })
    Dni : string;

    @ApiProperty({
        example: `F`,
        description: `Persona's sexual orientation`,
        nullable: false,
        maxLength: 1,
        examples: ['F', 'M', 'N', 'O']
    })
    @Column('char', {
        length: 1,
        nullable: false,
    })
    Sexo : string;

    @ApiProperty({
        example: `Id consequat Lorem occaecat anim anim nisi Lorem anim id non mollit tempor labore. Ut est veniam culpa sunt non anim. Deserunt consectetur voluptate ipsum ullamco adipisicing pariatur incididunt.`,
        description: `Persona's observation text`,
        maxLength: 250,
        nullable: true
    })
    @Column('varchar', {
        length: 250,
        nullable: true,
    })
    Observacion : string;

    @ApiProperty({
        example: `image buffer`,
        description: `Persona's identification image`,
        nullable: true,
    })
    @Column('image', {
        nullable: true,
    })
    Foto : Buffer;

    @ApiProperty({
        example: 1,
        description: `Persona's state`,
        nullable: false,
        default: true
    })
    @Column('tinyint', {
        nullable: false,
        default: true,
    })
    Activo : boolean;

    @BeforeInsert()
    checkSexoInsert() {
        this.Sexo = this.Sexo
        .toUpperCase()
    }
    @BeforeInsert()
    checkDniInsert() {
        this.Dni = this.Dni
        .toUpperCase()
        .replaceAll(' ', '')
    }
    @BeforeInsert()
    checkTelefonoInsert() {
        if (this.Telefono) {
            this.Telefono = this.Telefono
            .toUpperCase()
            .replaceAll(' ', '')
        }
    }

    @BeforeUpdate()
    checkSexoUpdate() {
        this.Sexo = this.Sexo
        .toUpperCase()
    }
    @BeforeUpdate()
    checkDniUpdate() {
        this.Dni = this.Dni
        .toUpperCase()
        .replaceAll(' ', '')
    }
    @BeforeUpdate()
    checkTelefonoUpdate() {
        this.Telefono = this.Telefono
        .toUpperCase()
        .replaceAll(' ', '')
    }
}
