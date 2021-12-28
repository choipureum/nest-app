import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { CreateMovieDto } from "./create-movie.dto";

export class UpdateMovieDto extends PartialType(CreateMovieDto){
    /*
    partialdto는 dto. 생성을 도와줌
    @IsString()
    readonly title?: string;
    @IsNumber()
    readonly year?: number;
    @IsString({each:true})
    readonly genres?: string[];
    */
}