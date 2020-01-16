import { IIntegrationEventRepository } from '../../../src/application/port/integration.event.repository.interface'
import { IntegrationEvent } from '../../../src/application/integration-event/event/integration.event'
import { IQuery } from '../../../src/application/port/query.interface'
import { RepositoryException } from '../../../src/application/domain/exception/repository.exception'

export class IntegrationEventRepositoryMock implements IIntegrationEventRepository {
    public count(query: IQuery): Promise<number> {
        return Promise.resolve(1)
    }

    public create(item: any): Promise<IntegrationEvent<any>> {
        if (item.email) {
            if (item.email.id !== '507f1f77bcf86cd799439012') {
                return Promise.resolve(item)
            }
        } else if (item.pilot_study) {
            if (item.pilot_study.id !== '507f1f77bcf86cd799439012') {
                return Promise.resolve(item)
            }
        } else if (item.user) {
            if (item.user.id !== '507f1f77bcf86cd799439012') {
                return Promise.resolve(item)
            }
        }
        return Promise.reject(new RepositoryException('Mock RepositoryException', 'Description of mock RepositoryException'))
    }

    public delete(id: string): Promise<boolean> {
        return Promise.resolve(true)
    }

    public find(query: IQuery): Promise<Array<IntegrationEvent<any>>> {
        return Promise.resolve(new Array<any>())
    }

    public findOne(query: IQuery): Promise<IntegrationEvent<any>> {
        const item: any = {}
        return Promise.resolve(item)
    }

    public update(item: IntegrationEvent<any>): Promise<IntegrationEvent<any>> {
        return Promise.resolve(item)
    }

}
