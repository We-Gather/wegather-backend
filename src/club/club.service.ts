import { Injectable } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { DatabaseService } from '@app/core/database/DatabaseService';

@Injectable()
export class ClubService {
  constructor(private prisma: DatabaseService) {}

  async create(clubDto: CreateClubDto): Promise<any> {
    return await this.prisma.club
      .create({
        data: {
          ...clubDto,
        },
      })
      .then(
        (res) => {
          return res.id;
        },
        (err) => {
          console.log(err);
          return err;
        },
      );
  }
}
