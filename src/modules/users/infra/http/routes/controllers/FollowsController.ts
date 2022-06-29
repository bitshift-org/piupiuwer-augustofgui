import { Request, Response } from "express";
import { container } from "tsyringe";

import FollowUserService from "@modules/users/services/FollowUserService";

class FollowsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const followUser = container.resolve(FollowUserService);

      // const user = await followUser.execute({
      //   email,
      //   password,
      // });

      return response.json("ok");
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default FollowsController;
