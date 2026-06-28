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
exports.FixturesController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const fixtures_service_1 = require("./fixtures.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
let FixturesController = class FixturesController {
    constructor(fixturesService) {
        this.fixturesService = fixturesService;
    }
    create(body) {
        return this.fixturesService.create(body);
    }
    findAllOpen() {
        return this.fixturesService.findAllOpen();
    }
    getHistory() {
        return this.fixturesService.findSettled();
    }
    getLeaderboard(req) {
        return this.fixturesService.getLeaderboard(req.user.id);
    }
};
exports.FixturesController = FixturesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_guard_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FixturesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FixturesController.prototype, "findAllOpen", null);
__decorate([
    (0, common_1.Get)('history'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FixturesController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Get)('leaderboard'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FixturesController.prototype, "getLeaderboard", null);
exports.FixturesController = FixturesController = __decorate([
    (0, common_1.Controller)('fixtures'),
    __metadata("design:paramtypes", [fixtures_service_1.FixturesService])
], FixturesController);
//# sourceMappingURL=fixtures.controller.js.map