import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private authService: AuthService) {
      const clientID = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      const callbackURL = process.env.GOOGLE_CALLBACK_URL;
  
      if (!clientID || !clientSecret || !callbackURL) {
        throw new Error('GitHub OAuth environment variables are not set');
      }
      
    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    // const { id, displayName, emails, photos } = profile;
    // const user = {
    //   oauthId: id,
    //   name: displayName,
    //   email: emails && emails[0]?.value,
    //   avatar: photos && photos[0]?.value,
    //   provider: 'google',
    // };
    const tokens = await this.authService.validateOAuthLogin(profile, 'google');
    done(null, tokens);
  }
}
