import { OrganizationContext } from "src/app/core/model/roles/entities/organization-context.entity";

export interface UpdateRoleParameter {
    id: string;    
    name: string;
    code: string;
    organization: OrganizationContext;
    gaspard: string;
    active: boolean;
  }