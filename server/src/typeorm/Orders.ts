import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from './Products';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  fullName: string;

  @Column()
  city: string;

  @Column()
  place: string;

  @Column()
  state: string;

  @Column({ nullable: true })
  street: string;

  @Column()
  telephone: string;

  @Column()
  zip: string;

  @Column({ type: 'datetime', name: 'create_at' })
  createAt: Date;

  @Column()
  status: boolean;

  @ManyToMany(() => Products, (products) => products.orders)
  @JoinTable()
  products: Products[];
}
