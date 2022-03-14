//#region Internal imports
import { EntityWithKey } from 'src/app/core/common/entity';
import { RegionCapacityContext } from './region-capacity-context.entity';
//#endregion Internal Imports

export interface RegionCapacity extends EntityWithKey<string> {
  year: number;
  capacities: RegionCapacityContext[];
}
