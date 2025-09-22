import { CreateDateColumn } from 'typeorm';
import {
  Column, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @CreateDateColumn({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP'
  })
    created_date: Date;

  @UpdateDateColumn({
    nullable: false,
  })
    updated_date: Date;

  @Column({default: true})
    status: boolean;
}
