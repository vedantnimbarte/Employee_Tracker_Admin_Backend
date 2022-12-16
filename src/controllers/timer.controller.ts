import { Request, Response } from "express";
import timerService from "../services/timer.service";

class TimeSheetController {
  async getAllRecords(req: Request, res: Response) {
    try {
      const result = await timerService.getAllTimeRecords();
      res.json({
        success: true,
        data: [...result],
        result: "Data fetched successfully",
      });
    } catch (error) {
      res.json({ success: false, data: [], message: error.message });
    }
  }

  async getAllRecordsByUserId(req: Request, res: Response) {
    try {
      const result = await timerService.getTimeRecordsByUserId(req.params.id);
      res.json({
        success: true,
        data: result,
        result: "Data fetched successfully",
      });
    } catch (error) {
      res.json({ success: false, data: [], message: error.message });
    }
  }

  async createTimeSheetEntry(req: Request, res: Response) {
    try {
      const result = await timerService.createTimeSheetEntry(req.body);
      res.json({
        success: true,
        data: result,
        message: "Entry created successfully",
      });
    } catch (error) {
      res.json({ success: false, data: [], message: error.message });
    }
  }
}

export default new TimeSheetController();
