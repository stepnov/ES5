import { EntityRepository, Repository } from 'typeorm';

import { Customer } from '../entity/Customer';
import { applyFilters, EntityQuery } from './customerUtils';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {

    filter(query: any | undefined, page: number, size: number, field: string | undefined, sort: "ASC" | "DESC" | undefined = "ASC" ): Promise<[Customer[], number]> {
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
