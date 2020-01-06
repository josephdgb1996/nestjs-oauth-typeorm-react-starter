import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  @IsNotEmpty()
  @Exclude()
  provider: string;

  @Column('text')
  @IsNotEmpty()
  @Exclude()
  providerId: string;

  @Column('text')
  @IsNotEmpty()
  username: string;

  @Column('text')
  @CreateDateColumn()
  dateCreated: Date;

  @Column('text')
  @UpdateDateColumn()
  dateModified: Date;
}