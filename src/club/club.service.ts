import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { DatabaseService } from '@app/core/database/DatabaseService';
import { ClubEntity } from './entities/club.entity';
import { UpdateClubDto } from './dto/update-club.dto';

@Injectable()
export class ClubService {
  constructor(private prisma: DatabaseService) {}

  async create(clubDto: CreateClubDto): Promise<number> {
    const club = await this.prisma.club
      .create({
        data: {
          ...clubDto,
        },
      })
      .then((res) => {
        return res.id;
      });
    if (!club)
      throw new BadRequestException('creation of club has been failed');
    return club;
  }

  async findAll(): Promise<Array<ClubEntity>> {
    return await this.prisma.club
      .findMany({ orderBy: [{ id: 'desc' }], take: 20 })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException('bad request');
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
        throw new NotFoundException('no such user');
      });
  }
}
