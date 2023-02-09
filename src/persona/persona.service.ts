import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, 
         InternalServerErrorException, 
         BadRequestException, 
         NotFoundException } from '@nestjs/common';    

import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { FilterPersonaDto } from './dto/filter-persona.dto';

import { Persona } from './entities/persona.entity';

@Injectable()
export class PersonaService {

  constructor(

    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ){}

  async create(createPersonaDto: CreatePersonaDto) {
    let { FechaNac, ...params } = createPersonaDto
    const persona = this.personaRepository.create(params);

    const fechaValor = Date.parse( FechaNac );
    persona.FechaNac = new Date(fechaValor);

    try {
      await this.personaRepository.save(persona);

      return {
        statusCode: 201,
        message: `Successfully created (Persona)`,
        persona,
      }

    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  async findAll(filterPersonaDto: FilterPersonaDto) {
    const {Apellido, Dni, FechaNac, Nombre, Observacion, Sexo, Telefono, Activo } = filterPersonaDto;
    let fechaValor = null;
    let personas;

    if (FechaNac) {
      fechaValor = new Date(Date.parse( FechaNac ));
    }

    try {

      let activoTrue = true;
      
      if(Activo) {
        if(+Activo === 0) {
          activoTrue = false;
        }
      }

      Apellido ? personas = await this.personaRepository.find({where:{ Apellido }}) :
      Dni ? personas = await this.personaRepository.find({where:{ Dni }}) :
      FechaNac ? personas = await this.personaRepository.find({where:{FechaNac : fechaValor}}) :
      Nombre ? personas = await this.personaRepository.find({where:{ Nombre }}) :
      Observacion ? personas = await this.personaRepository.find({where:{ Observacion }}) :
      Sexo ? personas = await this.personaRepository.find({where:{ Sexo }}) :
      Telefono ? personas = await this.personaRepository.find({where:{ Telefono }}) :
      Activo ? personas = await this.personaRepository.find({where:{ Activo : activoTrue }}) :
      personas = await this.personaRepository.find();
      
      if (personas.length > 0) {
        return {
          statusCode: 200,
          message: 'Successfully found personas',
          personas};
      } 

    } catch (error) {
      this.handleDBExceptions(error);
    }

    throw new NotFoundException ({
      statusCode: 401,
      message: 'Personas not found', });
  }

  async findOne(id: number) {
    
    try {
      const persona = await this.personaRepository.findOneBy ({ id })

      if (persona) {
        return {
          statusCode: 200,
          message: 'Successfully found persona',
          persona};
      }

    } catch (error) {
      this.handleDBExceptions(error);
    }

    throw new NotFoundException ({
      statusCode: 401,
      message: `Persona with id ${id} not found`, });
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    try {
    const persona = await this.personaRepository.update(id, updatePersonaDto)
    if (persona.affected === 1) {
      return {
        statusCode: 200,
        message: `Persona with id ${id} successfully updated`,
        update: updatePersonaDto
      }
    }

    } catch (error) {
      this.handleDBExceptions(error);
    }
    throw new NotFoundException({
      statusCode: 401,
      message: `Persona with id ${id} not found`,
    });
  }

  async updateFoto(id: number, updatePersonaDto) {
    console.log(updatePersonaDto);
    return
    // try {
    // const persona = await this.personaRepository.update(id, updatePersonaDto)
    // if (persona.affected === 1) {
    //   return {
    //     statusCode: 200,
    //     message: `Persona with id ${id} successfully updated`,
    //     update: updatePersonaDto
    //   }
    // }

    // } catch (error) {
    //   this.handleDBExceptions(error);
    // }
    // throw new NotFoundException({
    //   statusCode: 401,
    //   message: `Persona with id ${id} not found`,
    // });
  }

  async remove(id: number) {
    
    try {
      const persona = await this.personaRepository.update(id, {Activo : false})
      if (persona.affected === 1) {
        return {
          statusCode: 200,
          message: `Persona with id ${id} successfully removed`
        }
      }
    } catch (error) {
      this.handleDBExceptions(error);
    }

    throw new NotFoundException({
      statusCode: 401,
      message: `Persona with id ${id} not found`,
    });

  }

  private handleDBExceptions( error: any ) {
    console.log(error);
    if(error.driverError.number === 2627) {
      throw new BadRequestException(error.message)
    }
    if(error.driverError.number === 8023) {
      throw new BadRequestException(`FechaNac must be a valid date (YYYY-MM-DD)`)
    }
    throw new InternalServerErrorException ('Error interno del servidor')
  }
}
