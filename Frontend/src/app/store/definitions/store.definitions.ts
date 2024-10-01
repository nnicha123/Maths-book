import { ModuleData, ModuleStatus } from "../../definitions/module.definition";
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'

export const featureKey = 'user';

export interface ModuleEntity {
    data: ModuleData;
    status: ModuleStatus;
    isLoggedIn: boolean;
}

export interface ModuleEntityState extends EntityState<ModuleEntity> {
    selectedId: string | null;
}

const selectedId = (entity: ModuleEntity): string => {
    return entity.data.id;
}

export const moduleEntityAdapter: EntityAdapter<ModuleEntity> = createEntityAdapter<ModuleEntity>({
    selectId: selectedId
})