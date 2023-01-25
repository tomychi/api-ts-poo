import { Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { UserService } from '../services/user.service';
import { UpdateResult, DeleteResult } from 'typeorm';

export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getUsers(req: Request, res: Response) {
    try {
      const data = await this.userService.findAllUser();

      if (data.length === 0) {
        return this.httpResponse.NotFound(res, 'No existen datos');
      }

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.userService.findUserById(id);

      if (!data) {
        return this.httpResponse.NotFound(res, 'No existen datos');
      }

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async getUserWithRelationById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.userService.findUserWithRelation(id);

      if (!data) {
        return this.httpResponse.NotFound(res, 'No existen datos');
      }

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const data = await this.userService.createUser(req.body);

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateResult = await this.userService.updateUser(
        id,
        req.body
      );

      if (!data.affected) {
        return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
      }

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: DeleteResult = await this.userService.deleteUser(id);

      if (!data.affected) {
        return this.httpResponse.NotFound(res, 'Hay un error en eliminar');
      }

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }
}
