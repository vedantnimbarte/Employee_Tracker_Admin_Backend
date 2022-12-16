import { Request, Response } from "express";
import leavesService from "../services/leaves.service";

class LeavesController {
  list(req: Request, res: Response) {
    const result = leavesService.list();
    res.status(200).json({ success: true, result });
  }

  async create(req: Request, res: Response) {
    try {
      const result = await leavesService.create(req.body);
      res.json({
        success: true,
        message: "Data fetched successfully",
        data: result,
      });
    } catch (error) {
      res.json({ success: false, message: error.message, data: [] });
    }
  }
}

export default new LeavesController();
