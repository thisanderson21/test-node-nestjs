import { BaseEntity } from 'src/infraestructure/config/entity/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('file_manager')
export class FileManagerEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  originalName: string;

  @Column({ type: 'varchar', length: 255 })
  fileName: string;

  @Column({ type: 'varchar', length: 255 })
  key: string;

  @Column({ type: 'varchar', length: 100 })
  mimeType: string;

  @Column({ type: 'bigint' })
  size: number;

  @Column({ 
    type: 'enum', 
    enum: ['s3', 'local', 'cloudinary'],
    default: 's3'
  })
  storageProvider: 's3' | 'local' | 'cloudinary';

  @Column({ type: 'varchar', length: 255, nullable: true })
  bucketName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  uploadedBy: string;
}
