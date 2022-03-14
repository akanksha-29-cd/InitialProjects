//#region Internal Imports
import { RegionCapacityContext, RegionContext } from "src/app/core/model/region/entities/_module";
//#region  Internal Imports


export interface AddRegionCapacityParameter {
  year: number;
  region: RegionContext;
  capacities: RegionCapacityContext[];
}
