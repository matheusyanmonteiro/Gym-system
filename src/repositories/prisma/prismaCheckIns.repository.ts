import { CheckIn, Prisma } from '@prisma/client';
import { CheckInsRepositoryContract } from '../checkIns.repository';
import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';

export class PrismaCheckInsRepository implements CheckInsRepositoryContract {
    async findById(id: string) {
        const checkIn = await prisma.checkIn.findUnique({
            where: {
                id,
            }
        });

        return checkIn;
    }

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({
            data,
        });

        return checkIn;
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date');
        const endOfTheDay = dayjs(date).endOf('date');

        const checkIns = await prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate(),
                },
            },
        });

        return checkIns;
    }

    async countByUserId(userId: string) {
        const count = await prisma.checkIn.count({
            where: {
                user_id: userId,
            },
        });

        return count;
    }

    async findManyByUserId(userId: string, page: number){
        const checkIns = await prisma.checkIn.findMany({
            where: {
                user_id: userId,
            },
            take: 20,
            skip: (page - 1) * 20,
        });

        return checkIns;
    }

    async save(checkIn: CheckIn) {
        const saveCheckIn = await prisma.checkIn.update({
            where: {
                id: checkIn.id
            },
            data: checkIn,
        });

        return saveCheckIn;
    }
}