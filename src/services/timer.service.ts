import logger from "../common/logger";
import TimeSheetModel from "../models/timeSheet.model";

class TimeSheetService {
  async getAllTimeRecords() {
    const result = await TimeSheetModel.find({});
    return result;
  }

  async getTimeRecordsByUserId(ctx: any) {
    logger.info(ctx);
    const result = await TimeSheetModel.findOne({ user: ctx });
    return result;
  }

  async createTimeSheetEntry(ctx: any) {
    const { user, status } = ctx;
    const user_data = await TimeSheetModel.findOne({
      user: user,
      status: status,
    });
    var result;
    switch (user_data.status) {
      case "LOGGED_IN":
        throw Error("User already logged in");
      case "BREAK_IN":
        user_data.status = "BREAK_OUT";
        result = await user_data.save();
        return result;
      case "BREAK_OUT":
        user_data.status = "BREAK_IN";
        result = await user_data.save();
        return result;
      case "LOGGED_OUT":
        user_data.status = "BREAK_IN";
        result = await user_data.save();
        return result;
      default:
        result = await TimeSheetModel.create({ user, status });
        return result;
    }
  }
}

export default new TimeSheetService();
