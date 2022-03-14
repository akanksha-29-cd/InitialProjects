//#region Internal Imports
import { EntityWithKeyAndActive } from 'src/app/core/common/entity';
import { ResourceRole } from './resource-role.entity';
import { Team, TeamTypeContext } from '../../team/entities/_module';
//#endregion Internal Imports
export interface Resource extends EntityWithKeyAndActive<string> {
  name: string;
  sgId: string;
  roles: ResourceRole[];
  team: Team;
  teamType: TeamTypeContext;
}
