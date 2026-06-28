"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixturesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const client_2 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
let FixturesService = class FixturesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.fixture.create({
            data: {
                homeTeam: data.homeTeam,
                awayTeam: data.awayTeam,
                oddsHome: Number(data.oddsHome),
                oddsAway: Number(data.oddsAway),
                oddsDraw: Number(data.oddsDraw),
                goalsTarget: new client_2.Prisma.Decimal(data.goalsTarget ?? 2.5),
                oddsOver: Number(data.oddsOver),
                oddsUnder: Number(data.oddsUnder),
                oddsBttsYes: Number(data.oddsBttsYes),
                oddsBttsNo: Number(data.oddsBttsNo),
                status: client_1.FixtureStatus.OPEN,
            },
        });
    }
    async findAllOpen() {
        return this.prisma.fixture.findMany({
            where: {
                status: client_1.FixtureStatus.OPEN,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findSettled(limit = 50) {
        return this.prisma.fixture.findMany({
            where: {
                status: client_1.FixtureStatus.SETTLED,
            },
            orderBy: {
                updatedAt: 'desc',
            },
            take: limit,
        });
    }
    async getLeaderboard(userId) {
        const users = await this.prisma.user.findMany({
            where: {
                role: 'USER',
            },
            select: {
                id: true,
                username: true,
                points: true,
            },
            orderBy: {
                points: 'desc',
            },
        });
        const leaderboard = users
            .slice(0, 10)
            .map((user, index) => ({
            rank: index + 1,
            username: user.username,
            points: user.points,
        }));
        let currentUser = null;
        if (userId) {
            const userIndex = users.findIndex((user) => user.id === userId);
            if (userIndex !== -1) {
                currentUser = {
                    rank: userIndex + 1,
                    username: users[userIndex].username,
                    points: users[userIndex].points,
                };
            }
        }
        return {
            leaderboard,
            currentUser,
        };
    }
};
exports.FixturesService = FixturesService;
exports.FixturesService = FixturesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FixturesService);
//# sourceMappingURL=fixtures.service.js.map