import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './Orders';

@Entity()
export class Products {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  price: string;

  @Column({ nullable: false })
  quantity: string;

  @Column({ nullable: false, type: 'datetime', name: 'create_at' })
  createAt: Date;

  @Column({ nullable: false, type: 'datetime', name: 'update_at' })
  updateAt: Date;

  @Column({ nullable: false })
  types: string;

  @Column({ nullable: false })
  categories: string;

  @Column({ nullable: false, type: 'longtext' })
  description: string;

  @Column({ nullable: false, name: 'img_url' })
  imgUrl: string;

  @ManyToMany(() => Orders, (orders) => orders.products)
  orders: Orders[];
}
