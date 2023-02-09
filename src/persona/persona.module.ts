import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';

import { Persona } from './entities/persona.entity';

@Module({
  controllers: [PersonaController],
  providers: [PersonaService],
  imports: [ 
    TypeOrmModule.forFeature([ Persona ])
  ],
})
export class PersonaModule {}
