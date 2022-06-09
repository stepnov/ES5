import { EntityRepository, Repository } from 'typeorm';

import { Cars } from '../entity/Cars';
import { applyFilters, EntityQuery } from './carsUtils';

@EntityRepository(Cars)
export class CarsRepository extends Repository<Cars> {

    filter(query: any | undefined, page: number, size: number, field: string | undefined, sort: "ASC" | "DESC" | undefined = "ASC" ): Promise<[Cars[], number]> {
        const qb = this.createQueryBuilder('e');
        applyFilters(qb, query);
        if(field) {
            return qb
                .skip(page * size)
                .take(size)
                .orderBy(`e.${field}`, sort)

                .getManyAndCount();
        } else {
            return qb
                .skip(page * size)
                .take(size)

                .getManyAndCount();
        }
    }
}
