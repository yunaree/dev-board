
import { Injectable } from '@nestjs/common';
import { PrismaService, } from 'nestjs-prisma'

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService){}

  async findOne(username: string): Promise<User | undefined> {
    return this.prismaService.user.findUnique({ 
            where: {
                username: username
            }
        })
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
}
