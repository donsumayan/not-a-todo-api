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
import { SetupService } from './setup.service';
import { CreateSetupDto } from './dto/create-setup.dto';
import { UpdateSetupDto } from './dto/update-setup.dto';

@Controller('setup')
export class SetupController {
  constructor(private readonly setupService: SetupService) {}

  @Post()
  create(@Body() createSetupDto: CreateSetupDto) {
    return this.setupService.create(createSetupDto);
  }

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
    @Query('name') name: string,
  ) {
    return this.setupService.findAll({
      ...(page ? { page: +page } : {}),
      ...(pageSize ? { pageSize: +pageSize } : {}),
      ...(name ? { name: name } : {}),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetupDto: UpdateSetupDto) {
    return this.setupService.update(+id, updateSetupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.setupService.remove(+id);
  }
}
