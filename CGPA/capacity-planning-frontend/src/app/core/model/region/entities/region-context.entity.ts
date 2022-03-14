//#region Internal Imports
import { EntityWithKey } from 'src/app/core/common/entity';
//#endregion Internal Imports

export interface RegionContext extends EntityWithKey<string> {
  name: string;
}
