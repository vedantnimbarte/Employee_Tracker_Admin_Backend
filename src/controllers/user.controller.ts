import { Request, Response } from "express";
import userService from "../services/user.service";

class userController {
  async get(_req: Request, res: Response) {
    try {
      const result = await userService.get();
      res.json({
        success: true,
        data: result,
        message: "Data fetched successfully",
      });
    } catch (error) {
      res.json({ success: false, data: [], message: error.message });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const ctx = req.body;
      const { userExists, result } = await userService.create(ctx);
      if (userExists) {
        res.status(200).json({
          success: false,
          data: [],
          message: `User already exists with ${ctx.email}`,
        });
      } else {
        res.status(200).json({
          success: true,
          data: result,
          message: "User created successfully",
        });
      }
    } catch (error) {
      res.json({ success: false, data: [], message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const ctx = req.params;
      const { userExists, result } = await userService.delete(ctx);
      if (!userExists) {
        res.json({
          success: false,
          data: [],
          message: "User does not exists",
        });
      } else {
        res.json({
          success: true,
          data: [{ name: result }],
          message: "User deleted successfully",
        });
      }
    } catch (error) {
      res.json({ success: false, data: [], message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const ctx = { id: req.params.id, data: req.body };

      const { userExists, result } = await userService.update(ctx);
      if (!userExists) {
        res.json({
          success: false,
          data: [{ name: result }],
          message: "User does not exists",
        });
      } else {
        res.json({
          success: true,
          data: [{ name: result }],
          message: "User updated successfully",
        });
      }
    } catch (error) {
      res.json({ success: false, data: [], message: error.message });
    }
  }
}

export default new userController();
