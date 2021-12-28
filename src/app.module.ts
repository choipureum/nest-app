import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [MovieModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
