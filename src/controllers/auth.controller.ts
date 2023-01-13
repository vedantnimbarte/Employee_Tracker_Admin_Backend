import { Request, Response } from "express";
import authService from "../services/auth.service";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const ctx = req.body;
      const result = await authService.login(ctx);
      res.json({
        success: true,
        data: result,
        message: "Data fetched successfully",
      });
    } catch (error) {
      res.json({ success: false, data: [], message: error.message });
    }
  }
}

export default new AuthController();
