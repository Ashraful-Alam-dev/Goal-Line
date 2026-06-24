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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettlementController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const client_2 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
let SettlementController = class SettlementController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async settleFixture(id, body) {
        const { homeScore, awayScore } = body;
        return this.prisma.$transaction(async (tx) => {
            const fixture = await tx.fixture.findUnique({
                where: { id },
            });
            if (!fixture) {
                throw new common_1.BadRequestException('Fixture not found');
            }
            if (fixture.status === 'SETTLED') {
                throw new common_1.BadRequestException('Fixture already settled');
            }
            const trueResult = homeScore > awayScore
                ? 'HOME'
                : homeScore < awayScore
                    ? 'AWAY'
                    : 'DRAW';
            const totalGoals = homeScore + awayScore;
            const trueGoals = totalGoals > Number(fixture.goalsTarget)
                ? 'OVER'
                : 'UNDER';
            const trueBtts = homeScore > 0 && awayScore > 0
                ? 'YES'
                : 'NO';
            const pendingBets = await tx.bet.findMany({
                where: {
                    fixtureId: id,
                    status: client_2.BetStatus.PENDING,
                },
            });
            for (const bet of pendingBets) {
                let isWin = false;
                if (bet.marketType === 'RESULT' &&
                    bet.prediction === trueResult) {
                    isWin = true;
                }
                if (bet.marketType === 'GOALS' &&
                    bet.prediction === trueGoals) {
                    isWin = true;
                }
                if (bet.marketType === 'BTTS' &&
                    bet.prediction === trueBtts) {
                    isWin = true;
                }
                await tx.bet.update({
                    where: { id: bet.id },
                    data: {
                        status: isWin ? client_2.BetStatus.WON : client_2.BetStatus.LOST,
                    },
                });
                if (isWin) {
                    await tx.user.update({
                        where: {
                            id: bet.userId,
                        },
                        data: {
                            points: {
                                increment: bet.payout,
                            },
                        },
                    });
                }
            }
            return tx.fixture.update({
                where: { id },
                data: {
                    status: 'SETTLED',
                    finalHomeScore: homeScore,
                    finalAwayScore: awayScore,
                },
            });
        });
    }
};
exports.SettlementController = SettlementController;
__decorate([
    (0, common_1.Post)(':id/settle'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SettlementController.prototype, "settleFixture", null);
exports.SettlementController = SettlementController = __decorate([
    (0, common_1.Controller)('fixtures'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_guard_1.Roles)(client_1.Role.ADMIN),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SettlementController);
//# sourceMappingURL=settlement.controller.js.map