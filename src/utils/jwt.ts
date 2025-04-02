import CONFIG from "@/config";
import { JWT_PAYLOAD } from "@/global";
import sessionService, {
  SessionService,
  SessionServiceMethodParams,
} from "@/services/session";
import jwt, { SignOptions } from "jsonwebtoken";

class JWT {
  private secret: string;
  private expiresIn: string;
  constructor(private sessionService: SessionService) {
    this.secret = CONFIG.secret_key;
    this.expiresIn = CONFIG.jwt_expires_in;
  }
  public async generate(payload: JWT_PAYLOAD) {
    const token = jwt.sign(payload, this.secret as jwt.Secret, {
      expiresIn: this.expiresIn,
    } as SignOptions);
    await this.sessionService.addToken({
      token,
      userId: payload._id.toString(),
    });
    return token;
  }
  public async verify(
    token: string
  ): Promise<
    | { success: true; payload: JWT_PAYLOAD }
    | { success: false; message: string; expired: boolean }
  > {
    try {
      const result = jwt.verify(token, this.secret) as JWT_PAYLOAD;

      const isCorrect = await this.sessionService.verifyToken({
        token,
        userId: result._id,
      });

      if (!isCorrect) {
        return {
          success: false,
          message: "Token Is Blacklisted",
          expired: false,
        };
      }
      return {
        success: true,
        payload: {
          _id: result._id,
          email: result.email,
          full_name: result.full_name,
          role: result.role,
        },
      };
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return { success: false, message: "Token is expired", expired: true };
      }
      return { success: false, message: "Invalid Token", expired: false };
    }
  }
  public async blacklist(params: SessionServiceMethodParams) {
    await this.sessionService.blacklistToken(params);
  }
}

const jwtInstance = new JWT(sessionService);

export default jwtInstance;
