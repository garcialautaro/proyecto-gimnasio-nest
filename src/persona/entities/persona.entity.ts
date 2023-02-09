import {    BeforeInsert, 
            BeforeUpdate, 
            Column, 
            Entity, 
            PrimaryGeneratedColumn   } from "typeorm";



@Entity()
export class Persona {

    @PrimaryGeneratedColumn()
    id : number;

    @Column('varchar', {
        length: 20,
        nullable: true,
    })
    Telefono : string;

    @Column('varchar', {
        length: 30,
        nullable: false,
    })
    Nombre : string;

    @Column('varchar', {
        length: 30,
        nullable: false,
    })
    Apellido : string;

    @Column('datetime2', {
        nullable: false,
    })
    FechaNac : Date;

    @Column('varchar', {
        length: 15,
        nullable: false,
        unique: true,
    })
    Dni : string;

    @Column('char', {
        length: 1,
        nullable: false,
    })
    Sexo : string;

    @Column('varchar', {
        length: 250,
        nullable: true,
    })
    Observacion : string;

    @Column('image', {
        nullable: true,
    })
    Foto : string;

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
