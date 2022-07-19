import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages as MessagesEntity } from 'src/typeorm/Messages';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/CreateMessage.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesEntity)
    private readonly messagesRepository: Repository<MessagesEntity>,
  ) {}

  async fetchAllMessages() {
    return this.messagesRepository.find();
  }

  async sendMessage(createMessageDto: CreateMessageDto) {
    const message = await this.messagesRepository.create({
      ...createMessageDto,
      createAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    });

    return await this.messagesRepository.save(message);
  }

  async findOne(condition: any) {
    const message = await this.messagesRepository.findOneBy(condition);

    return message;
  }

  async removeOne(condition: any) {
    return await this.messagesRepository.delete(condition);
  }
}
