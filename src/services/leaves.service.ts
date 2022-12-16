import logger from "../common/logger";
import LeaveModel from "../models/leave.model";

class LeavesService {
  async list() {
    const result = await LeaveModel.find({});
    return result;
  }
  async create(ctx) {
    const result = await LeaveModel.create(ctx);
    return result;
  }
}

export default new LeavesService();
