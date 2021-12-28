import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {

    constructor(private readonly movieService: MovieService){}

    @Get()
    getAll(): Movie[]{
        return this.movieService.getAll();
    }

    @Get("/:id")
    getOne(@Param("id") movieId: number): Movie{
        return this.movieService.getOne(movieId);
    }
        
    @Post()
    create(@Body() movieData: CreateMovieDto){
        return this.movieService.createOne(movieData);
    }

    @Delete()
    deleteOne(@Param('id') movieId: number){
        this.getOne(movieId);
        return this.movieService.deleteOne(movieId);
    }

    @Patch("/:id")
    patch(@Param("id") movieId: number, @Body() updateData: UpdateMovieDto){
        this.getOne(movieId);
        return this.movieService.update(movieId, updateData);
    }

    @Get("/search")
    search(@Query("year") searchingYear: string){
        return `we are searching ${searchingYear}`;
    }
}
