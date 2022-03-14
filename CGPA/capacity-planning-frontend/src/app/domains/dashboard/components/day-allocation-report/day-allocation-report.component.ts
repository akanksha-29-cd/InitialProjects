//#region Imports
import { Component } from '@angular/core';
//#endregion Imports

//#region Internal Imports
import { DashboardComponent } from '../../common/dashboard.component';
import { NodeService } from '../../services/node.service';
import { TreeNode } from 'primeng/api';
import { Dashboard } from 'src/app/core/model/dashboard/entities/_module';
import { DashboardFilter } from '../../parameters/filters/dashboard.filter';
import { DayAllocationReportMapper } from './helpers/day-allocation-report.mapper';
import { DashboardService } from '../../services/dashboard.service';
import { Observable } from 'rxjs';
import { RegionCapacity, RegionCapacityContext } from 'src/app/core/model/capacity-planning/entities/_module';
import { RegionCapacityService } from '../../services/region-capacity.service';
//#endregion Internal Imports

@Component({
  selector: 'das-day-allocation-report',
  templateUrl: './day-allocation-report.component.html',
  styleUrls: ['./day-allocation-report.component.scss'],
})
export class DayAllocationReportComponent extends DashboardComponent {
  //#region Variable Declarations
  resourceData: TreeNode[];
  cols: any[];
  requiredData: TreeNode;
  teamTypes: Array<string> = [];
  resourceObject: TreeNode;
  childCapacity: number[];
  rawData: Dashboard[] = [];
  regionCapacity: any;
  //#endregion Variable Declarations

  //#region Constructor
  constructor(
    private service: NodeService,
    private helper: DayAllocationReportMapper,
    private dashboardService: DashboardService,
    private regionService: RegionCapacityService,
  ) {
    super();
  }
  //#endregion Constructor

  //#region Initialization Method
  viewInit() {
    this.initialize();
  }

  onFilter(data: DashboardFilter) {
    this.service.getDashboardCapacity(data).subscribe((dashboardCapacity) => {
      this.rawData = dashboardCapacity;
      this.initializeCapcityValues();
    });
  }

  initializeCapcityValues() {
    if (this.rawData.length === 0) {
      this.rawData = [...this.rawData, this.helper.initializeDefaultCapacity()];
    }
    this.calculateData();
  }

  initialize() {
    this.onFilter({ year: '2021' });
    this.regionService.getRegionCapacity({
      year: 2021,
    }).subscribe((res) => { 
      this.regionCapacity = res;
    });
    
  }

  calculateData() {
    this.resourceData = [];

    this.teamTypes = [...new Set(this.rawData.map((item) => item.teamType))];

    let a = 0;
    for (let i = 0; i < this.teamTypes.length; i++) {
      let x = this.rawData.filter((item) => item.teamType == this.teamTypes[i]);
      let resourceRole = [...new Set(x.map((item) => item.roleName))];
      a++;
      this.resourceObject = {};
      this.resourceObject.data = {};
      this.resourceObject.data.Month = {};
      this.resourceObject['data']['_id'] = 'Root ' + a;
      this.resourceObject['data']['Name'] = this.teamTypes[i];
      this.resourceObject['data']['Month']['Jan'] = 0;
      this.resourceObject['data']['Month']['Feb'] = 0;
      this.resourceObject['data']['Month']['Mar'] = 0;
      this.resourceObject['data']['Month']['Apr'] = 0;
      this.resourceObject['data']['Month']['May'] = 0;
      this.resourceObject['data']['Month']['Jun'] = 0;
      this.resourceObject['data']['Month']['Jul'] = 0;
      this.resourceObject['data']['Month']['Aug'] = 0;
      this.resourceObject['data']['Month']['Sep'] = 0;
      this.resourceObject['data']['Month']['Oct'] = 0;
      this.resourceObject['data']['Month']['Nov'] = 0;
      this.resourceObject['data']['Month']['Dec'] = 0;
      this.resourceObject['data']['Month']['Total'] = 0;
      // this.resourceObject["data"]["expanded"] = "true"
      let b = 0;
      this.resourceObject.children = [];
      for (let j = 0; j < resourceRole.length; j++) {
        b++;
        this.resourceObject.children[j] = {};
        this.resourceObject.children[j].data = {};
        this.resourceObject.children[j].data.Month = {};
        this.resourceObject.children[j]['data']['_id'] = 'ChildRoot ' + b;
        this.resourceObject.children[j]['data']['Name'] = resourceRole[j];
        this.resourceObject.children[j]['data']['Month']['Jan'] = 0;
        this.resourceObject.children[j]['data']['Month']['Feb'] = 0;
        this.resourceObject.children[j]['data']['Month']['Mar'] = 0;
        this.resourceObject.children[j]['data']['Month']['Apr'] = 0;
        this.resourceObject.children[j]['data']['Month']['May'] = 0;
        this.resourceObject.children[j]['data']['Month']['Jun'] = 0;
        this.resourceObject.children[j]['data']['Month']['Jul'] = 0;
        this.resourceObject.children[j]['data']['Month']['Aug'] = 0;
        this.resourceObject.children[j]['data']['Month']['Sep'] = 0;
        this.resourceObject.children[j]['data']['Month']['Oct'] = 0;
        this.resourceObject.children[j]['data']['Month']['Nov'] = 0;
        this.resourceObject.children[j]['data']['Month']['Dec'] = 0;
        this.resourceObject.children[j]['data']['Month']['Total'] = 0;
        let c = 0;
        this.resourceObject.children[j].children = [];
        for (let k = 0; k < this.rawData.length; k++) {
          if (
            this.rawData[k]['teamType'] == this.teamTypes[i] &&
            this.rawData[k]['roleName'] == resourceRole[j]
          ) {
            c++;
            this.requiredData = {};
            this.requiredData.data = {};
            this.requiredData.data.Month = {};
            this.requiredData['data']['_id'] = 'Child ' + c;
            this.requiredData['data']['Name'] = this.rawData[k].resourceName;
            this.requiredData['data']['Sgid'] = this.rawData[k].sgId;
            this.requiredData['data']['TeamType'] = this.rawData[k].teamType;
            this.requiredData['data']['Month']['Jan'] = this.rawData[
              k
            ].capacities[0].capacity;
            this.requiredData['data']['Month']['Feb'] = this.rawData[
              k
            ].capacities[1].capacity;
            this.requiredData['data']['Month']['Mar'] = this.rawData[
              k
            ].capacities[2].capacity;
            this.requiredData['data']['Month']['Apr'] = this.rawData[
              k
            ].capacities[3].capacity;
            this.requiredData['data']['Month']['May'] = this.rawData[
              k
            ].capacities[4].capacity;
            this.requiredData['data']['Month']['Jun'] = this.rawData[
              k
            ].capacities[5].capacity;
            this.requiredData['data']['Month']['Jul'] = this.rawData[
              k
            ].capacities[6].capacity;
            this.requiredData['data']['Month']['Aug'] = this.rawData[
              k
            ].capacities[7].capacity;
            this.requiredData['data']['Month']['Sep'] = this.rawData[
              k
            ].capacities[8].capacity;
            this.requiredData['data']['Month']['Oct'] = this.rawData[
              k
            ].capacities[9].capacity;
            this.requiredData['data']['Month']['Nov'] = this.rawData[
              k
            ].capacities[10].capacity;
            this.requiredData['data']['Month']['Dec'] = this.rawData[
              k
            ].capacities[11].capacity;

            this.resourceObject.children[j]['data']['Month']['Jan'] =
              this.resourceObject.children[j]['data']['Month']['Jan'] +
              parseFloat(this.rawData[k].capacities[0].capacity);
            this.resourceObject.children[j]['data']['Month']['Feb'] =
              this.resourceObject.children[j]['data']['Month']['Feb'] +
              parseFloat(this.rawData[k].capacities[1].capacity);
            this.resourceObject.children[j]['data']['Month']['Mar'] =
              this.resourceObject.children[j]['data']['Month']['Mar'] +
              parseFloat(this.rawData[k].capacities[2].capacity);
            this.resourceObject.children[j]['data']['Month']['Apr'] =
              this.resourceObject.children[j]['data']['Month']['Apr'] +
              parseFloat(this.rawData[k].capacities[3].capacity);
            this.resourceObject.children[j]['data']['Month']['May'] =
              this.resourceObject.children[j]['data']['Month']['May'] +
              parseFloat(this.rawData[k].capacities[4].capacity);
            this.resourceObject.children[j]['data']['Month']['Jun'] =
              this.resourceObject.children[j]['data']['Month']['Jun'] +
              parseFloat(this.rawData[k].capacities[5].capacity);
            this.resourceObject.children[j]['data']['Month']['Jul'] =
              this.resourceObject.children[j]['data']['Month']['Jul'] +
              parseFloat(this.rawData[k].capacities[6].capacity);
            this.resourceObject.children[j]['data']['Month']['Aug'] =
              this.resourceObject.children[j]['data']['Month']['Aug'] +
              parseFloat(this.rawData[k].capacities[7].capacity);
            this.resourceObject.children[j]['data']['Month']['Sep'] =
              this.resourceObject.children[j]['data']['Month']['Sep'] +
              parseFloat(this.rawData[k].capacities[8].capacity);
            this.resourceObject.children[j]['data']['Month']['Oct'] =
              this.resourceObject.children[j]['data']['Month']['Oct'] +
              parseFloat(this.rawData[k].capacities[9].capacity);
            this.resourceObject.children[j]['data']['Month']['Nov'] =
              this.resourceObject.children[j]['data']['Month']['Nov'] +
              parseFloat(this.rawData[k].capacities[10].capacity);
            this.resourceObject.children[j]['data']['Month']['Dec'] =
              this.resourceObject.children[j]['data']['Month']['Dec'] +
              parseFloat(this.rawData[k].capacities[11].capacity);

            var sum: number = 0;
            for (let x = 0; x < 12; x++) {
              sum = sum + parseFloat(this.rawData[k].capacities[x].capacity);
            }
            this.requiredData['data']['Month']['Total'] = sum;
            this.resourceObject.children[j]['data']['Month']['Total'] =
              this.resourceObject.children[j]['data']['Month']['Total'] +
              parseFloat(this.requiredData['data']['Month']['Total']);
            this.resourceObject.children[j].children.push(this.requiredData);
          }
        }
        this.resourceObject['data']['Month']['Jan'] =
          this.resourceObject['data']['Month']['Jan'] +
          parseFloat(this.resourceObject.children[j]['data']['Month']['Jan']);
        this.resourceObject['data']['Month']['Feb'] =
          this.resourceObject['data']['Month']['Feb'] +
          parseFloat(this.resourceObject.children[j]['data']['Month']['Feb']);
        this.resourceObject['data']['Month']['Mar'] =
          this.resourceObject['data']['Month']['Mar'] +
          parseFloat(this.resourceObject.children[j]['data']['Month']['Mar']);
        this.resourceObject['data']['Month']['Apr'] =
          this.resourceObject['data']['Month']['Apr'] +
          parseFloat(this.resourceObject.children[j]['data']['Month']['Apr']);
        this.resourceObject['data']['Month']['May'] =
          this.resourceObject['data']['Month']['May'] +
          parseFloat(this.resourceObject.children[j]['data']['Month']['May']);
        this.resourceObject['data']['Month']['Jun'] =
          this.resourceObject['data']['Month']['Jun'] +
          parseFloat(this.resourceObject.children[j]['data']['Month']['Jun']);
        this.resourceObject['data']['Month']['Jul'] =
          this.resourceObject['data']['Month']['Jul'] +
          parseFloat(this.resourceObject.children[j]['data']['Month']['Jul']);
        this.resourceObject['data']['Month']['Aug'] =
          this.resourceObject['data']['Month']['Aug'] +
          parseFloat(this.resourceObject.children[j]['data']['Month']['Aug']);
        this.resourceObject['data']['Month']['Sep'] =
          this.resourceObject['data']['Month']['Sep'] +
          parseFloat(this.resourceObject.children[j]['data']['Month']['Sep']);
        this.resourceObject['data']['Month']['Oct'] =
          this.resourceObject['data']['Month']['Oct'] +
          parseFloat(this.resourceObject.children[j]['data']['Month']['Oct']);
        this.resourceObject['data']['Month']['Nov'] =
          this.resourceObject['data']['Month']['Nov'] +
          parseFloat(this.resourceObject.children[j]['data']['Month']['Nov']);
        this.resourceObject['data']['Month']['Dec'] =
          this.resourceObject['data']['Month']['Dec'] +
          parseFloat(this.resourceObject.children[j]['data']['Month']['Dec']);
        this.resourceObject['data']['Month']['Total'] =
          this.resourceObject['data']['Month']['Total'] +
          parseFloat(this.resourceObject.children[j]['data']['Month']['Total']);
      }

      this.resourceData.push(this.resourceObject);
    }
  }

  validateCapacity(sgid:string, teamType:string, month:number)
  {

    let overAllCapacityTeamTypeWiseData:RegionCapacityContext[];

    if(sgid)
    {
      if(teamType == 'INDEC' || teamType == 'Indec')
      {
            overAllCapacityTeamTypeWiseData = this.regionCapacity[0].capacities.filter((item) => item.region == 'IN');  
      } 
      else
      {
        overAllCapacityTeamTypeWiseData = this.regionCapacity[0].capacities.filter((item) => item.region == 'FR'); 
      }
    let totalResourceData = this.rawData.filter((item) => item.sgId == sgid);

    var totalResourceCapacity = 0;
    
    for(let i = 0; i<totalResourceData.length;i++)
    {
      totalResourceCapacity = totalResourceCapacity + parseFloat(totalResourceData[i].capacities[month]?.capacity)
    }  
  
    if(totalResourceCapacity > parseFloat(overAllCapacityTeamTypeWiseData[month]?.capacity))
    {
        return 'redColor';
    }
    else{
      return '';
    }
    }
  } 
}
