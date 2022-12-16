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
    const { user, activity } = ctx;
    const user_data = await TimeSheetModel.findOne({ user: user });

    if (!user_data) {
      const activityContext = { user, activity: [activity] };
      const result = await TimeSheetModel.create(activityContext);
      return result;
    } else {
      user_data.activity.push(activity);
      user_data.save();
      const result = await TimeSheetModel.findById(user_data._id);
      return result;
    }
  }
}

export default new TimeSheetService();
