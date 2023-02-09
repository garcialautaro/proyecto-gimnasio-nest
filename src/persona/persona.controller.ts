import { Controller, Get, Post, 
         Body, Patch, Param, Delete, 
         ParseIntPipe, Query } from '@nestjs/common';

import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';

import { FilterPersonaDto } from './dto/filter-persona.dto';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post()
  create(@Body() createPersonaDto: CreatePersonaDto) {
    return this.personaService.create(createPersonaDto);
  }

  @Get()
  findAll(@Query() filterPersonaDto: FilterPersonaDto) {
    return this.personaService.findAll( filterPersonaDto );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.personaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return this.personaService.update(+id, updatePersonaDto);
  }

  @Patch('/foto/:id')
  updateFoto(@Param('id', ParseIntPipe) id: string, @Query() updatePersonaFotoDto) {
    return this.personaService.updateFoto(+id, updatePersonaFotoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.personaService.remove(+id);
  }
}
