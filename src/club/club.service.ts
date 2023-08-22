import { Injectable } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { DatabaseService } from '@app/core/database/DatabaseService';
import { ClubEntity } from './entities/club.entity';
import { validateOrReject } from 'class-validator';
import { UpdateClubDto } from './dto/update-club.dto';

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

  async update(clubId: number, updateClubDto: UpdateClubDto): Promise<number> {
    return await this.prisma.club
      .update({
        where: { id: clubId },
        data: {
          ...updateClubDto,
        },
      })
      .then((res) => {
        return res.id;
      })
      .catch((err) => {
        // 존재하지 않는 Record를 Update 시도한 경우
        return -1;
      });
  }
}
