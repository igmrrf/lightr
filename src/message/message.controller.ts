import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateAudioMessageDto,
  CreateImageMessageDto,
  CreateTextMessageDto,
  CreateVideoMessageDto,
} from './dto/create-message.dto';
import {
  GetInitiatedMessagesDto,
  GetMessagesDto,
} from './dto/get-initiated.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('-text')
  create(@Body() createMessageDto: CreateTextMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Post('-audio')
  createAudio(@Body() createMessageDto: CreateAudioMessageDto) {
    return this.messageService.createAudio(createMessageDto);
  }

  @Post('-image')
  createImage(@Body() createMessageDto: CreateImageMessageDto) {
    return this.messageService.createImage(createMessageDto);
  }

  @Post('-video')
  createVideo(@Body() createMessageDto: CreateVideoMessageDto) {
    return this.messageService.createVideo(createMessageDto);
  }

  @Get()
  getMessages(@Param() getMessagesDto: GetMessagesDto) {
    return this.messageService.findAll(getMessagesDto);
  }

  @Get('-initiated')
  getInitiatedMessages(@Param() getInitiatedDto: GetInitiatedMessagesDto) {
    return this.messageService.getInitiatedMessages(getInitiatedDto);
  }

  @Patch(':id')
  update(@Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}
