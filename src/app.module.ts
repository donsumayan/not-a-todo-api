import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetupModule } from './setup/setup.module';
import { RunModule } from './run/run.module';
import { SourceModule } from './source/source.module';
import { ReportModule } from './report/report.module';
import { ReportTypeModule } from './report-type/report-type.module';
import { FundModule } from './fund/fund.module';

const host = process.env.POSTGRES_HOST || 'localhost';
const username = process.env.POSTGRES_USER || 'username1';
const password = process.env.POSTGRES_PASSWORD || 'password1';
const database = process.env.POSTGRES_DB || 'notatodo';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: host,
      username: username,
      password: password,
      database: database,
      autoLoadEntities: true,
      synchronize: true,
    }),
    SetupModule,
    RunModule,
    SourceModule,
    ReportModule,
    ReportTypeModule,
    FundModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
