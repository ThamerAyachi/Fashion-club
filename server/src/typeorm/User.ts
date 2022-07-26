import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, name: 'img_url' })
  imgUrl: string;

  @Column({ nullable: false, type: 'datetime', name: 'create_at' })
  createAt: Date;

  @Column({ nullable: false, type: 'datetime', name: 'update_at' })
  updateAt: Date;

  @Column({ nullable: false })
  role: string;
}
