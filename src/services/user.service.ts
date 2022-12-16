import logger from "../common/logger";
import UsersModel from "../models/user.model";

class userService {
  async get() {
    const result = await UsersModel.find({});
    return result;
  }
  async create(ctx: any) {
    const user = await UsersModel.findOne({ email: ctx.email });
    if (user) return { userExists: true };
    const result = await UsersModel.create(ctx);
    return { result };
  }

  async delete(ctx: any) {
    const user = await UsersModel.findById({ _id: ctx.id });

    if (user) return { userExists: false };

    await UsersModel.deleteOne({ _id: ctx.id });
    return { result: user };
  }

  async update(ctx: any) {
    const user = await UsersModel.findById({ _id: ctx.id });
    if (user) return { userExists: true };
    const result = await UsersModel.updateOne({ _id: ctx.id }, { ...ctx.data });
    return { result };
  }
}

export default new userService();
