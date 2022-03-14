//#region Internal Imports
import { EntityWithKey } from 'src/app/core/common/entity';
import { BusinessUnit } from '../../business-unit/entities/_module';
import { ProjectTypeContext } from './project-type-context.entity';
//#endregion Internal Imports

export interface Project extends EntityWithKey<string> {
  name: string;
  otp: string;
  type: ProjectTypeContext;
  businessUnit: BusinessUnit;
}
