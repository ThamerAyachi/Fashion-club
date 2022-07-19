import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/CreateMessage.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async getAllMessages() {
    const messages = await this.messagesService.fetchAllMessages();

    return messages;
  }

  @Post('send')
  @UsePipes(ValidationPipe)
  async sendMessage(@Body() createMessageDto: CreateMessageDto) {
    return await this.messagesService.sendMessage(createMessageDto);
  }

  @Get(':id')
  async fetchMessageById(@Param('id') messageId: string) {
    const message = await this.messagesService.findOne({ messageId });

    if (message) return message;
    else
      throw new BadRequestException(
        `Message with id: ${messageId} is not found`,
      );
  }

  @Delete(':id')
  async deleteById(@Param('id') messageId: string) {
    const message = await this.messagesService.findOne({ messageId });

    if (!message) {
      throw new BadRequestException(
        `Message with id: ${messageId} is not found`,
      );
    }

    await this.messagesService.removeOne(messageId);

    return { message: 'Delete success', status: HttpStatus.OK };
  }
}
