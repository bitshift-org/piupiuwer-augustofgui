import { Request, Response } from "express";
import { container } from "tsyringe";

import FollowUserService from "@modules/users/services/FollowUserService";

class FollowsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.user; 
      const { followId } = request.params;
      
      const followUser = container.resolve(FollowUserService);

      const { status, subscription } = await followUser.execute({
        ownerId: id,
        followedId: followId
      });

      return response.json({ status, subscription });
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default FollowsController;
