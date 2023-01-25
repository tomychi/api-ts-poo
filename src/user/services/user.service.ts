import { DeleteResult, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseService } from '../../config/base.service';
import { UserDTO } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';

export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async findAllUser(): Promise<UserEntity[]> {
    return (await this.execRepository).find();
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async findUserWithRelation(id: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.customer', 'customer') // me trae el objeto que se relaciona con user
      .where({ id })
      .getOne();
  }

  // obtener usuario por email
  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ email })
      .getOne();
  }

  // obtener usuario por username
  async findUserByUsername(username: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ username })
      .getOne();
  }

  async createUser(body: UserDTO): Promise<UserEntity> {
    // create se guarda en memoria
    const newUser = (await this.execRepository).create(body);

    const hash = await bcrypt.hash(newUser.password, 10);

    newUser.password = hash;

    return (await this.execRepository).save(newUser);
  }
  async deleteUser(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }
  async updateUser(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }
}
