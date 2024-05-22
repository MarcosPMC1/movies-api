import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString, MaxLength } from "class-validator";

export class CreateMovieDto {
    @ApiProperty()
    @IsString()
    @MaxLength(255)
    title: string

    @ApiProperty()
    @IsNumberString()
    year: string

    @ApiProperty()
    @IsString()
    @MaxLength(50)
    gender: string
}
