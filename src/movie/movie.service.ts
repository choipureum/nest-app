import { Injectable, NotFoundException } from '@nestjs/common';
import { identity } from 'rxjs';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
    private movies: Movie[]= [];
    
    getAll(): Movie[]{
        return this.movies;
    }
    
    getOne(id: number): Movie{
        const movie = this.movies.find(movie => movie.id === id);
        if(!movie){
            throw new NotFoundException(`Movie with ID: ${id}`);
        }
        return movie
    }

    deleteOne(id: number): boolean{
        this.movies = this.movies.filter(movie => movie.id !== id);
        return  true;
    }

    createOne(movieData: CreateMovieDto){
        this.movies.push({
            id: this.movies.length+1,
            ...movieData,
        })
    }

    update(id:number, updateData: UpdateMovieDto){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData});
    }
}
