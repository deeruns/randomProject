"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const StatusService_1 = require("../../model/service/StatusService");
//remove duplication with calls to functions
const handler = async (request) => {
    const statusService = new StatusService_1.StatusService();
    await statusService.postStatus(request.token, request.newStatus);
    return {
        success: true,
        message: null,
    };
};
exports.handler = handler;
