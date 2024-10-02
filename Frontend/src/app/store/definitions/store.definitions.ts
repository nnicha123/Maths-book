import { ModuleData, ModuleStatus } from "../../definitions/module.definition";
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'

export interface ModuleEntity {
    data: ModuleData;
    status: ModuleStatus;
    isLoggedIn: boolean;
}

export interface ModuleEntityState extends EntityState<ModuleEntity> {
    selectedId: string | null;
}

const selectUserId = (entity: ModuleEntity): string => {
    return entity.data.id;
}

export const moduleEntityAdapter: EntityAdapter<ModuleEntity> = createEntityAdapter<ModuleEntity>({
    selectId: selectUserId
})