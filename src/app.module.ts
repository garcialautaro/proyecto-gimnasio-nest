import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaModule } from './persona/persona.module';

@Module({
  imports: [ 
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.MSSQL_HOST,
      port:+process.env.MSSQL_PORT,
      database: process.env.MSSQL_DATABASE_NAME,
      username: process.env.MSSQL_USER_NAME,
      password: process.env.MSSQL_USER_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      options: {
        encrypt: false,
      }
    }),
    
    PersonaModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
