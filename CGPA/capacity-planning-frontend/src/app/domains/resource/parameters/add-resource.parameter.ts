//#region Internal Imports
import { TeamTypeContext } from 'src/app/core/model/team/entities/_module';
import { ResourceRole } from 'src/app/core/model/resource/entities/_module';
import { TeamContext } from './common/team-context.parameter';
//#region  Internal Imports

export interface AddResourceParameter {
  sgId: string;
  name: string;
  roles: ResourceRole[];
  team: TeamContext;
  teamType: TeamTypeContext;
  active: boolean;
}
