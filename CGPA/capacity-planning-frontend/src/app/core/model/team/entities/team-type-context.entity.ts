//#region Internal Imports
import { EntityWithKey } from 'src/app/core/common/entity';
//#endregion Internal Imports

export interface TeamTypeContext extends EntityWithKey<string> {
  name: string;
}
