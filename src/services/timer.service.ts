import logger from "../common/logger";
import TimeSheetModel from "../models/timeSheet.model";
import moment from "moment";
import "moment-duration-format";

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
    const { user, status, note } = ctx;

    const start_date = moment(new Date()).startOf("date");
    const end_date = moment(new Date()).endOf("date");

    const timeEntryDetails = await TimeSheetModel.findOne({
      user: user,
      start_date,
      end_date,
    });

    if (Boolean(timeEntryDetails)) {
      const currentTime = moment(new Date());

      if (status === "BREAK_IN") {
        const startTime = moment(timeEntryDetails.login_time);
        const startDifferenceWithCurrentTime = currentTime.diff(
          startTime,
          "second"
        );

        const workTime = moment
          .duration(startDifferenceWithCurrentTime, "seconds")
          .format("hh:mm:ss", { trim: false });
      }

      const startTime = moment(timeEntryDetails.login_time);
      const endTime = moment(timeEntryDetails.break_hours);
      const startDifferenceWithCurrentTime = currentTime.diff(
        startTime,
        "second"
      );
      const endDifferenceWithCurrentTime = currentTime.diff(endTime, "second");
      const breakTime = moment
        .duration(endDifferenceWithCurrentTime, "seconds")
        .format("hh:mm:ss", { trim: false });
      const workTime = moment
        .duration(startDifferenceWithCurrentTime, "seconds")
        .format("hh:mm:ss", { trim: false });

      const result = await TimeSheetModel.findOneAndUpdate(
        { start_date, end_date, user },
        {
          $set: {
            status: status,
            work_note: note,
          },
        }
      );
    } else {
      const timeEntry = new TimeSheetModel({
        user: user,
        start_date: start_date,
        end_date: end_date,
        login_time: new Date(),
        status: "LOGIN",
      });
      const result = timeEntry.save();
      return result;
    }

    // const user_data = await TimeSheetModel.findOne({
    //   user: user,
    // });
    // if (user_data) {
    //   if (status === "LOGIN") {
    //     throw Error("User already logged in");
    //   }

    //   if (status === "BREAK") {

    //     if (user_data.status === "BREAK_IN") {
    //       user_data.status = "BREAK_OUT";
    //       const result = user_data.save();
    //       return result;
    //     } else {
    //       user_data.status = "BREAK_IN";
    //       user_data.work_hours = calculateHours(
    //         moment(user_data.login_time),
    //         moment()
    //       );
    //       const result = user_data.save();
    //       return result;
    //     }
    //   }

    //   if (status === "LOGOUT") {
    //     user_data.status = "LOGOUT";
    //     user_data.logout_time = new Date();
    //     const result = user_data.save();

    //     return result;
    //   }
    // }

    // const result = await TimeSheetModel.create({
    //   user: user,
    //   status: status,
    //   login_time: new Date(),
    // });
    // return result;
  }
}

export default new TimeSheetService();
