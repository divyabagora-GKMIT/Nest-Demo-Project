import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class IdValidationPipe implements PipeTransform{
    transform(value: any) {
        const id = Number(value)

        if ( !Number.isInteger(id)){
            throw new BadRequestException('id must be a integer');
        }
        else if (id <= 0){
            throw new BadRequestException('id must be a positive integer');
        }

        return id;
    }
}