import { ModuleData } from "../../definitions/module.definition";
import { ModuleEntityState } from "../definitions/store.definitions";
import cloneDeep from 'lodash.clonedeep';

export function getData(state: ModuleEntityState): ModuleData {
    const data: ModuleData = cloneDeep(state.entities[state.selectedId || '0']!.data);
    return data;
}