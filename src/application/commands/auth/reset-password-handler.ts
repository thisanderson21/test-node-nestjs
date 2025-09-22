import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserDao } from "src/domain/user/dao/dao-user";
import { RepositoryUser } from "src/domain/user/repository/repository-user";
import {
  compare, hash
} from 'bcrypt';

@Injectable()
export class ResetPasswordHandler  {
  constructor(
    private _userRepository: RepositoryUser,
    private jwtService: JwtService,
  ) {}

  async execute(token: string, newPassword: string): Promise<{
    message: string;
  }> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.RESET_SECRET,
      });
      const hashed = await hash(newPassword, 10);
      await this._userRepository.updatePassword(payload.sub, hashed);
      
      return { message: 'Contraseña actualizada correctamente!' };

    } catch (e) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
