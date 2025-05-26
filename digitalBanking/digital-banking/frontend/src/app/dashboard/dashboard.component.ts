import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { DashboardService } from '../services/dashboard.service';
import { DashboardStats } from '../model/dashboard-stats.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  errorMessage: string | null = null;

  // Bar chart for Account Types
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Account Count' }
    ]
  };

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.updateBarChartData(data.accountTypeCounts);
      },
      error: (err) => {
        this.errorMessage = "Failed to load dashboard statistics.";
        console.error(err);
      }
    });
  }

  updateBarChartData(accountTypeCounts: { [key: string]: number }): void {
    this.barChartData.labels = Object.keys(accountTypeCounts);
    this.barChartData.datasets[0].data = Object.values(accountTypeCounts);
    // To refresh the chart if data is updated dynamically later
    // this.chart?.update(); 
    // (Requires ViewChild for chart instance, not strictly needed for initial load)
  }

  // Optional: Chart click event
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  // Optional: Chart hover event
  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

} 