import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RunService } from './run.service';
import { CreateRunDto } from './dto/create-run.dto';
import { UpdateRunDto } from './dto/update-run.dto';

@Controller('run')
export class RunController {
  constructor(private readonly runService: RunService) {}
  @Post()
  create(@Body() createRunDto: CreateRunDto) {
    return this.runService.create(createRunDto);
  }

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
    @Query('name') name: string,
  ) {
    return this.runService.findAll({
      ...(page ? { page: +page } : {}),
      ...(pageSize ? { pageSize: +pageSize } : {}),
      ...(name ? { name: name } : {}),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.runService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRunDto: UpdateRunDto) {
    return this.runService.update(+id, updateRunDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.runService.remove(+id);
  }
}
