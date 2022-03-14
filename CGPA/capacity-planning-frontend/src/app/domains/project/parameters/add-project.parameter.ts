//#region Internal Imports
import { BusinessUnit } from 'src/app/core/model/business-unit/entities/_module';
import { ProjectTypeContext } from 'src/app/core/model/project/entities/_module';
//#region  Internal Imports

export interface AddProjectParameter {
  businessUnit: BusinessUnit;
  name: string;
  otp: string;
  type: ProjectTypeContext;
}
