import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

//e2e 테스트 : 통테
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    //환경 그대로 추가
    app.useGlobalPipes(new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform: true //자동 변수 변환(x테스트에서는 동작안함)
    }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });
  it('/movie (GET)', () => {
    return request(app.getHttpServer())
      .get('/movie')
      .expect(200)
      .expect([])
  });

  // 위의 코드 좀더 상세히
  describe('/movie', () =>{ 
    it('GET', () =>{
      return request(app.getHttpServer())
      .get('/movie')
      .expect(200)
      .expect([])
    });
    it('POST 201', () =>{
      return request(app.getHttpServer())
        .post('/movie')
        .send({
          title: 'test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });
    it('POST 400', () =>{
      return request(app.getHttpServer())
        .post('/movie')
        .send({
          title: 'test',
          year: 2000,
          genres: ['test'],
          other: "thing",
        })
        .expect(400);
    });
    it('delete', () => {
      return request(app.getHttpServer())
        .delete('/movie')
        .expect(404)
    });
  });

  describe('/movie/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movie/1')
        .expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer())
        .get('/movie/999')
        .expect(404);
    });
    it('PATCH 200', () =>{
      return request(app.getHttpServer())
        .patch('/movie/1')
        .send({title:'updated title'})
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer())
        .delete('/movie/1')
        .expect(200);
    })
  })
});
