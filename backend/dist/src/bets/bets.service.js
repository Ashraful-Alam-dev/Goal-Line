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
exports.BetsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let BetsService = class BetsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async placeBet(userId, dto) {
        return this.prisma.$transaction(async (tx) => {
            const stake = Number(dto.stake);
            if (!stake || stake <= 0) {
                throw new common_1.BadRequestException('Stake must be greater than 0');
            }
            const user = await tx.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.BadRequestException('User not found');
            }
            if (user.role === 'ADMIN') {
                throw new common_1.BadRequestException('Admins cannot place bets');
            }
            if (user.points < stake) {
                throw new common_1.BadRequestException('Insufficient points');
            }
            const fixture = await tx.fixture.findUnique({
                where: {
                    id: dto.fixtureId,
                },
            });
            if (!fixture) {
                throw new common_1.BadRequestException('Fixture not found');
            }
            if (fixture.status === client_1.FixtureStatus.IN_PROGRESS) {
                throw new common_1.BadRequestException('Match is already in progress. Betting is closed.');
            }
            if (fixture.status === client_1.FixtureStatus.SETTLED) {
                throw new common_1.BadRequestException('Match has already been settled.');
            }
            let targetOdds = 0;
            if (dto.marketType === client_1.MarketType.RESULT) {
                if (dto.prediction === client_1.Prediction.HOME) {
                    targetOdds = fixture.oddsHome;
                }
                if (dto.prediction === client_1.Prediction.AWAY) {
                    targetOdds = fixture.oddsAway;
                }
                if (dto.prediction === client_1.Prediction.DRAW) {
                    targetOdds = fixture.oddsDraw;
                }
            }
            if (dto.marketType === client_1.MarketType.GOALS) {
                if (dto.prediction !== client_1.Prediction.OVER &&
                    dto.prediction !== client_1.Prediction.UNDER) {
                    throw new common_1.BadRequestException('Invalid prediction for GOALS market');
                }
                targetOdds =
                    dto.prediction === client_1.Prediction.OVER
                        ? fixture.oddsOver
                        : fixture.oddsUnder;
            }
            if (dto.marketType === client_1.MarketType.BTTS) {
                if (dto.prediction !== client_1.Prediction.YES &&
                    dto.prediction !== client_1.Prediction.NO) {
                    throw new common_1.BadRequestException('Invalid prediction for BTTS market');
                }
                targetOdds =
                    dto.prediction === client_1.Prediction.YES
                        ? fixture.oddsBttsYes
                        : fixture.oddsBttsNo;
            }
            if (!targetOdds) {
                throw new common_1.BadRequestException('Invalid market or prediction');
            }
            const payout = stake * targetOdds;
            await tx.user.update({
                where: {
                    id: userId,
                },
                data: {
                    points: {
                        decrement: stake,
                    },
                },
            });
            return tx.bet.create({
                data: {
                    userId,
                    fixtureId: dto.fixtureId,
                    marketType: dto.marketType,
                    prediction: dto.prediction,
                    stake,
                    payout,
                    status: client_1.BetStatus.PENDING,
                },
            });
        });
    }
    async myBets(userId) {
        return this.prisma.bet.findMany({
            where: {
                userId,
            },
            include: {
                fixture: {
                    select: {
                        id: true,
                        homeTeam: true,
                        awayTeam: true,
                        status: true,
                        finalHomeScore: true,
                        finalAwayScore: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async getAllBets() {
        return this.prisma.bet.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        points: true,
                    },
                },
                fixture: {
                    select: {
                        id: true,
                        homeTeam: true,
                        awayTeam: true,
                        status: true,
                        finalHomeScore: true,
                        finalAwayScore: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
};
exports.BetsService = BetsService;
exports.BetsService = BetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BetsService);
//# sourceMappingURL=bets.service.js.map