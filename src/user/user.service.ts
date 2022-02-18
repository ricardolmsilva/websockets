import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userAlreadyExists = await this.usersRepository.find({
      where: [
        {
          username: createUserDto.username,
        },
      ],
    });

    if (userAlreadyExists.length > 0) {
      return new HttpException(
        'Already exists a user with these details',
        HttpStatus.CONFLICT,
      );
    }

    const userCreator = this.usersRepository.create(createUserDto);
    const user = await this.usersRepository.save(userCreator);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.usersRepository.findOne(id);
    if (!existingUser) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const userAlreadyExists = await this.usersRepository.find({
      where: [
        {
          username: updateUserDto.username,
          id: Not(id),
        },
      ],
    });
    if (userAlreadyExists.length > 0) {
      return new HttpException(
        'Already exists a user with these details',
        HttpStatus.CONFLICT,
      );
    }

    const userCreator = this.usersRepository.create({
      ...existingUser,
      ...updateUserDto,
    });
    const user = await this.usersRepository.save(userCreator);
    return user;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
