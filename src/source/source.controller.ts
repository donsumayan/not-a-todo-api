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
import { SourceService } from './source.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';

@Controller('source')
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @Post()
  create(@Body() createSourceDto: CreateSourceDto) {
    return this.sourceService.create(createSourceDto);
  }

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
    @Query('name') name: string,
  ) {
    return this.sourceService.findAll({
      ...(page ? { page: +page } : {}),
      ...(pageSize ? { pageSize: +pageSize } : {}),
      ...(name ? { name: name } : {}),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sourceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSourceDto: UpdateSourceDto) {
    return this.sourceService.update(+id, updateSourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sourceService.remove(+id);
  }
}
