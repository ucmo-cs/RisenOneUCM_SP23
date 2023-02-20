import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem} from './data-table-datasource';
import { DataTableService } from './data-table.service';
import { StatusReport } from './statusReport';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  providers: [DataTableService],
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;
  dataSource: DataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  heroes: StatusReport[] = [];

  constructor(private dataTableService: DataTableService) {
    this.dataSource = new DataTableDataSource();
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.getHeroes();
  }

  getHeroes(): void {
    this.dataTableService.getHeroes()
    .subscribe(heroes => (this.heroes = heroes));
    console.log(this.heroes);
    //this.heroes = JSON.parse(this.heroString);
  }
}
