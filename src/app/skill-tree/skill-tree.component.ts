import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { SkillGraph, mage, warrior, SkillNode, mageY, warriorY } from './NodeDef';

@Component({
  selector: 'app-skill-tree',
  templateUrl: './skill-tree.component.html',
  styleUrls: ['./skill-tree.component.css']
})
export class SkillTreeComponent implements OnInit {

  @Input() chartConfig;

  @ViewChild('stepper') stepper;

  mageGraph: SkillGraph;
  warriorGraph: SkillGraph;

  graphs = [{value: 'mageGraph', name: 'Mage Graph'}, {value: 'warriorGraph', name: 'Warrior Graph'}];

  selectedGraph = 'mageGraph';
  detailsData = [];
  overviewData = [];

  graphConfig: any;
  unLockNode: any;

  selectedNode;

  constructor() {
    this.mageGraph = new SkillGraph(mage, mageY);
    this.warriorGraph = new SkillGraph(warrior, warriorY);
   }

   graphChanged() {
    this.graphConfig = this[this.selectedGraph];
    this.detailsData = [...this.detailsData];
    this.overviewData = [...this.graphConfig.nodesByLevel];
    this.skillSelected(this.graphConfig.nodesByLevel[0][0]);
   }

  ngOnInit() {
   this.graphChanged();
  }

  skillSelected(node) {
    this.selectedNode = node;
    this.detailsData = [];
    const childLevel = node.level + 1;
    const graphData = this.graphConfig.nodesByLevel;

    this.detailsData[node.level] = [];
    this.detailsData[node.level].push(node);
    if (node.dependencies != null && node.dependencies.length > 0) {
      this.detailsData[node.level - 1] = [];
        node.dependencies.forEach(d => this.detailsData[node.level - 1].push(d));
    }

    if (childLevel >= 0 && childLevel < graphData.length && graphData[childLevel] != null) {
      this.detailsData[childLevel] = [];
       graphData[childLevel].forEach(chNode => {
         if (chNode.dependencies.findIndex(n => n.name === node.name) >= 0) {
           this.detailsData[childLevel].push(chNode);
         }
       });
    }
    this.stepper.selectedIndex = 1;
  }

  skillUnlocked(node) {
    this.detailsData = [...this.detailsData];
    this.overviewData = [...this.graphConfig.nodesByLevel];
  }

 getNodeDesc(unlock) {
  return  unlock ? 'can be unlocked' : 'can not be unlocked';
  }
}
