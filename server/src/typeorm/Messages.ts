import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'message_id',
  })
  messageId: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  subject: string;

  @Column({ nullable: false, type: 'longtext' })
  message: string;

  @Column({
    nullable: false,
    type: 'datetime',
    name: 'create_at',
    // default: new Date().toISOString().slice(0, 19).replace('T', ' '),
  })
  createAt: Date;

  @Column({
    nullable: false,
    name: 'device_type',
  })
  deviceType: string;
}
