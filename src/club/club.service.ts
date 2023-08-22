import { Injectable } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { DatabaseService } from '@app/core/database/DatabaseService';
import { ClubEntity } from './entities/club.entity';
import { validateOrReject } from 'class-validator';

@Injectable()
export class ClubService {
  constructor(private prisma: DatabaseService) {}

  async create(clubDto: CreateClubDto): Promise<number> {
    return await this.prisma.club
      .create({
        data: {
          ...clubDto,
        },
      })
      .then((res) => {
        return res.id;
      })
      .catch((err) => {
        return -1;
      });
  }

  async findAll(): Promise<Array<ClubEntity>> {
    return await this.prisma.club
      .findMany({ orderBy: [{ id: 'desc' }], take: 20 })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return [];
      });
  }
}
