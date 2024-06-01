import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { AuthService } from './auth.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    authService = moduleFixture.get<AuthService>(AuthService);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /register', () => {
    it('should register a new user and return a JWT token', async () => {
      const registerDto = {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password',
      };

      jest.spyOn(authService, 'create').mockResolvedValue({
        statusCode: HttpStatus.OK,
        body: {
          access_token: 'mock-jwt-token',
        }
      });

      const response = await request(app.getHttpServer())
        .post('/register')
        .send(JSON.stringify(registerDto))
        .expect(HttpStatus.OK);

      expect(response.body).toEqual({
        statusCode: HttpStatus.OK,
        body: {
          access_token: 'mock-jwt-token',
        }
      });
    });
  });
});