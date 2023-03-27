import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().request;

    const Authorization = request.get("Authorization");
    if (!Authorization) return false;

    const jwt: JWT = this.jwtService.decode(Authorization.split(" ")[1]) as JWT;
    try {
      return Boolean(jwt);
    } catch (error) {
      return false;
    }
  }
}
