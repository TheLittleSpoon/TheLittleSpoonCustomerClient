import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {CategoryService} from '../../services/categories.service';
import {RecipeService} from '../../services/recipe.service';

@Component({
  selector: 'app-categories-graph',
  templateUrl: './categories-graph.component.html',
  styleUrls: ['./categories-graph.component.css']
})
export class CategoriesGraphComponent implements OnInit {
  private data = [
    {Framework: 'Vue', Stars: '166443', Released: '2014'},
    {Framework: 'React', Stars: '150793', Released: '2013'},
    {Framework: 'Angular', Stars: '62342', Released: '2016'},
    {Framework: 'Backbone', Stars: '27647', Released: '2010'},
    {Framework: 'Ember', Stars: '21471', Released: '2011'},
    {Framework: 'Node', Stars: '51471', Released: '2012'},
  ];
  private svg: any;
  private margin: number = 50;
  private width: number = 750;
  private height: number = 600;
  // The radius of the pie chart is half the smallest side
  private radius: number = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    // this.recipeService.
    this.createSvg();
    this.createColors();
    this.drawChart();
  }

  private createSvg(): void {
    this.svg = d3.select('figure#pie')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
      .domain(this.data.map(d => d.Stars.toString()))
      .range(['var(--yellow)', 'var(--orange)', 'var(--maroon)', 'var(--pink)', 'var(--magenta)']);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.Stars));

    // Build the pie chart
    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius))
      .attr('fill', (d: any, i: any) => (this.colors(i)))
      .attr('stroke', 'white')
      .style('stroke-width', '1px');

    // Add labels
    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text((d: any) => d.data.Framework)
      .attr('transform', (d: any) => 'translate(' + labelLocation.centroid(d) + ')')
      .style('text-anchor', 'middle')
      .style('fill', 'white')
      .style('font-size', 15);

    // Add tooltips
    const tooltip = d3.select('figure#pie')
      .enter()
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('background', '#000')
      .style('color', 'white')
      .style('fill', 'white')
      .text('a simple tooltip');

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('div')
      .style('width', ((d: any) => d.x + 'px'))
      .text(((d: any) => d))
      .on('mouseover', ((event: any, d: any) => {
        tooltip.text(d);
        return tooltip.style('visibility', 'visible');
      }))
      .on('mousemove', ((event: any, d: any) => tooltip.style('top', (d3.pointer(event)[1] - 10) + 'px')
        .style('left', (d3.pointer(event)[0] + 10) + 'px')))
      .on('mouseout', ((event: any, d: any) => tooltip.style('visibility', 'hidden')));
  }
}
