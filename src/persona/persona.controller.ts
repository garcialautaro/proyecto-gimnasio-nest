import { Controller, Get, Post, Body, 
         Patch, Param, Delete, ParseIntPipe,
         Query, UploadedFile, UseInterceptors,
         ParseFilePipe, FileTypeValidator, Header, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { FileInterceptor } from '@nestjs/platform-express';

import { Persona } from './entities/persona.entity';

import { PersonaService } from './persona.service';

import { CreatePersonaDto, UpdatePersonaDto, 
         FilterPersonaDto } from './dto/';


         
@ApiTags('Persona')
@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post()
  @ApiResponse( {status: 201, description: `Persona was successfully created`, type: Persona})
  @ApiResponse( {status: 400, description: `Bad request`})
  @ApiResponse( {status: 500, description: `Internal server error`})
  create(@Body() createPersonaDto: CreatePersonaDto) {
    return this.personaService.create(createPersonaDto);
  }

  @Get()
  @ApiResponse( {status: 200, description: `Personas were successfully found`, type: Persona})
  @ApiResponse( {status: 400, description: `Bad request`})
  @ApiResponse( {status: 401, description: `Personas not found`})
  @ApiResponse( {status: 500, description: `Internal server error`})
  findAll(@Query() filterPersonaDto: FilterPersonaDto) {
    return this.personaService.findAll( filterPersonaDto );
  }

  @Get(':id')
  @ApiResponse( {status: 200, description: `Persona was successfully found`, type: Persona})
  @ApiResponse( {status: 400, description: `Bad request`})
  @ApiResponse( {status: 401, description: `Persona not found`})
  @ApiResponse( {status: 500, description: `Internal server error`})
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.personaService.findOne(+id);
  }

  @Get('/foto/:id')
  @ApiResponse( {status: 200, description: `Foto was successfully found`, type: Buffer})
  @ApiResponse( {status: 400, description: `Bad request`})
  @ApiResponse( {status: 401, description: `Persona not found`})
  @ApiResponse( {status: 500, description: `Internal server error`})
  @Header('content-type', 'image/jpeg')
  findFoto(@Param('id', ParseIntPipe) id: string, @Res() res: Response) {
    return this.personaService.findFoto(+id, res);
  }

  @Patch(':id')
  @ApiResponse( {status: 200, description: `Persona was successfully updated`, type: Persona})
  @ApiResponse( {status: 400, description: `Bad request`})
  @ApiResponse( {status: 401, description: `Persona not found`})
  @ApiResponse( {status: 500, description: `Internal server error`})
  update(@Param('id', ParseIntPipe) id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return this.personaService.update(+id, updatePersonaDto);
  }

  @Patch('/foto/:id')
  @ApiResponse( {status: 200, description: `Persona was successfully updated`})
  @ApiResponse( {status: 400, description: `Bad request`})
  @ApiResponse( {status: 401, description: `Persona not found`})
  @ApiResponse( {status: 500, description: `Internal server error`})
  @UseInterceptors(FileInterceptor('file'))
  updateFoto(
    @Param('id', ParseIntPipe) id: string, 
    @UploadedFile( new ParseFilePipe({ validators: [ new FileTypeValidator(
      { fileType: 'image/' })] })) file: Express.Multer.File) {
    return this.personaService.updateFoto(+id, file);
  }

  @Delete(':id')
  @ApiResponse( {status: 200, description: `Persona was successfully removed`})
  @ApiResponse( {status: 400, description: `Bad request`})
  @ApiResponse( {status: 401, description: `Persona not found`})
  @ApiResponse( {status: 500, description: `Internal server error`})
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.personaService.remove(+id);
  }
}
