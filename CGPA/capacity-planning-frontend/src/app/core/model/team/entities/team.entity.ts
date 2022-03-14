//#region Internal Imports
import { EntityWithKeyAndActive } from 'src/app/core/common/entity';
//#endregion Internal Imports

export interface Team extends EntityWithKeyAndActive<string> {
  name: string;
}
