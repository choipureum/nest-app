import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { MovieService } from "./movie.service"

describe('MovieService', () =>{
    let service: MovieService;

    //테스트를 하기 전에 실행됨
    beforeEach(async () =>{
        const module: TestingModule = await Test.createTestingModule({
            providers: [MovieService],
        }).compile();

        service = module.get<MovieService>(MovieService);
    });

    //Individual Test
    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    describe('getAll', () =>{
        it('should return  an array', () =>{
            const result = service.getAll();
            expect(result).toBeInstanceOf(Array);
        });
    });

    describe('getOne', () =>{
        it('should return a movie', () =>{
            service.createOne({
                title: 'TestMovie',
                genres: ['test'],
                year:2000,
            });
            const movie = service.getOne(1);
            expect(movie).toBeDefined();
            expect(movie.id).toEqual(1);
        });

        it('should throw 404 error', () =>{
            try{
                service.getOne(999);
            }catch(e){
                expect(e).toBeInstanceOf(NotFoundException);
                expect(e.message).toEqual('Movie with ID: 999')
            }
        });
    });

    describe('deleteOne', () => {
        it('delete a movie', () => {
            service.createOne({
                title: 'TestMovie',
                genres: ['test'],
                year:2000,
            });
            const beforeDelete = service.getAll().length;
            service.deleteOne(1);
            const afterDelete = service.getAll().length;
            expect(afterDelete).toBeLessThan(beforeDelete);
        });
        it('should be return a 404',() =>{
            try{
                service.deleteOne(999);
            }catch(e){
                expect(e).toBeInstanceOf(NotFoundException);
            }
        });
    });

    describe('createOne', () =>{
        it('should create a movie', () =>{
            const beforeCreate = service.getAll().length;
            service.createOne({
                title: 'TestMovie',
                genres: ['test'],
                year:2000,
            });
            const afterCreate = service.getAll().length;
            expect(afterCreate).toBeGreaterThan(beforeCreate);
        });
    });

    describe('update', () =>{
        it('should update a movie', () =>{
            service.createOne({
                title: 'TestMovie',
                genres: ['test'],
                year:2000,
            });
            service.update(1, {title: "Updated Title"});
            const movie = service.getOne(1);
            expect(movie.title).toEqual('Updated Title');
        });
        it('should throw a NotFoundException', () =>{
            try{
                service.update(999, {});
            }catch(e){
                expect(e).toBeInstanceOf(NotFoundException);
            }
        })
    })
});