
import { Injectable } from '@nestjs/common';
import { PrismaService, } from 'nestjs-prisma'
import { User } from 'src/shared/types/user.type';

// This should be a real class/interface representing a user entity


@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService){}

  async findOne(username: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ 
            where: {
                username: username
            }
        })
  }

  async findById(id: number) {
  return this.prismaService.user.findUnique({ where: { id } });
} 

    public async createUser(      
        username: string,
        pass: string,
    ): Promise<User>{

        const newUser = await this.prismaService.user.create({
            data: {
                username: username,
                password: pass,
            }
        })

        return newUser;
    }

    public async updateUser(userId: number, data: Partial<{refreshToken: string | null}>){
      return this.prismaService.user.update({
        where: {id: userId},
        data
      })
    }
}
