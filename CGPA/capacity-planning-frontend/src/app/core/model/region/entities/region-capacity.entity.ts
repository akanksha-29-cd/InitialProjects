//#region Internal imports
import { EntityWithKey } from 'src/app/core/common/entity';
import { RegionCapacityContext } from './region-capacity-context.entity';
import { RegionContext } from './region-context.entity';
//#endregion Internal Imports

export interface RegionCapacity extends EntityWithKey<string> {
  year: number;
  region: RegionContext;
  capacities: RegionCapacityContext[];
}
