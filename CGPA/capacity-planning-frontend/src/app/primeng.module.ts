//#region Imports
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { AccordionModule } from 'primeng/accordion';
import { TreeTableModule } from 'primeng/treetable';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
//#endregion Imports

export const PrimeNgControls: any[] = [
  TableModule,
  InputTextModule,
  DropdownModule,
  ButtonModule,
  DialogModule,
  MultiSelectModule,
  AccordionModule,
  TreeTableModule,
  CheckboxModule,
  TooltipModule,
];

//#region Exports All Module
export * from 'primeng/table';
export * from 'primeng/inputtext';
export * from 'primeng/dropdown';
export * from 'primeng/button';
export * from 'primeng/dialog';
export * from 'primeng/multiselect';
export * from 'primeng/accordion';
export * from 'primeng/treetable';
export * from 'primeng/checkbox';
export * from 'primeng/tooltip';
//#endregion Exports All Module
