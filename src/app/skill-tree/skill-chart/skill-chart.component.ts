import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { View, Spec } from 'vega';

declare var vega: any;

@Component({
  selector: 'app-skill-chart',
  templateUrl: './skill-chart.component.html',
  styleUrls: ['./skill-chart.component.css']
})
export class SkillChartComponent implements OnInit, OnChanges {

  @Input() spec: Spec;
  @Input() data;
  @Input() type;

  @Input() unLock;

  @Output() skillSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() skillUnlocked: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('chartDiv') chartDiv: ElementRef;

  view: View;
  vegaData;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.spec != null && this.spec != null) {
      this.initGraph();
      this.setData({ name: 'table', values: this.parseData() });
    } else  if (changes.data != null) {
      this.setData({ name: 'table', values: this.parseData() });
    }
  }

  initGraph() {
    this.view = new vega.View(vega.parse(this.spec))
      .renderer('canvas')
      .initialize(this.chartDiv.nativeElement)
      .width(800)
      .height(600)
      .hover()
      .run();
    this.view.addEventListener('click', (event, item) => {
      const datum = item.datum;
      const node = this.data[datum.x].find(n => n.name === datum.name);
      if (this.type !== 'detail') {
        this.skillSelected.emit(node);
      } else {
        {
          if (item['image'] != null) {
            if (node.canBeUnlocked() && node.isLocked) {
              node.isLocked = false;
              this.skillUnlocked.emit(node);
            }
          } else {
            this.skillSelected.emit(node);
          }
        }
      }
    });
  }


  setData(data: { name: string; values: any }) {
    if (this.view == null) {
      return;
    }

    this.view
      .remove(data.name, function () {
        return true;
      })
      .run()
      .insert(data.name, data.values)
      .run();
  }


  parseData() {
    const chartData = [];
    this.data.forEach(level => {
      level.forEach(node => {
        chartData.push({
          name: node.name, x: node.level, y: node.y, isLocked: node.isLocked,
          canBeUnlocked: node.canBeUnlocked(), dependencies: node.dependencies
        });
      });
    });
    return chartData;
  }

}
