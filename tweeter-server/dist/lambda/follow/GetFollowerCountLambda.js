"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const FollowService_1 = require("../../model/service/FollowService");
const handler = async (request) => {
    const followService = new FollowService_1.FollowService();
    const followerCount = await followService.getFollowerCount(request.token, request.user);
    return {
        success: true,
        message: null,
        followCount: followerCount
    };
};
exports.handler = handler;
