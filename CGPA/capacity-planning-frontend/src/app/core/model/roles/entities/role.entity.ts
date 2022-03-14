import { EntityWithKeyAndActive } from 'src/app/core/common/entity';
import { OrganizationContext } from './organization-context.entity';
//#endregion Internal Imports
export interface Role extends EntityWithKeyAndActive<string> {
  name: string;
  code: string;
  organization: OrganizationContext;
  gaspard: string;
}