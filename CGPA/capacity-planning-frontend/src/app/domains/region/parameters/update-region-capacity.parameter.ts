//#region Internal Imports
import { RegionCapacityContext, RegionContext } from "src/app/core/model/region/entities/_module";
//#region  Internal Imports


export interface UpdateRegionCapacityParameter {
  id: string;
  year: number;
  region: RegionContext;
  capacities: RegionCapacityContext[];
}
