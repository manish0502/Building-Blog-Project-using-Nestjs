import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class UserEntity {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

 
  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
  @AfterInsert()
  logInsert() {
    console.log(`User has been inserted with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('User has been updated with id : ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
