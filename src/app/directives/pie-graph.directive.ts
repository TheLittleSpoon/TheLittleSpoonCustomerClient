import {Directive, Output, EventEmitter, ElementRef, HostListener} from '@angular/core';
import * as d3 from 'd3';
import {Recipe} from '../components/recipe/types/recipe';
import {Category} from '../interfaces/category';
import {RecipeService} from '../services/recipe.service';
import {CategoryService} from '../services/categories.service';

@Directive({
  selector: '[pieGraph]',
})
export class PieGraphDirective {
  private data: { Category: string, amount: string }[] = [];
  private svg: any;
  private margin: number = 50;
  private width: number = 750;
  private height: number = 600;
  // The radius of the pie chart is half the smallest side
  private radius: number = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;

  constructor(private elementRef: ElementRef,
              private recipeService: RecipeService,
              private categoryService: CategoryService) {
    this.recipeService.getGroupByCategory().subscribe((groups: { _id: string, data: Recipe[] }[]) =>
      this.categoryService.getCategories().subscribe((categories: Category[]) => {
        groups.forEach((group: { _id: string, data: Recipe[] }) => {
          this.data.push({
            Category: categories.find((category: Category) => category._id === group._id)?.name ?? '',
            amount: group.data.length.toString()
          });
        });
        this.createSvg();
        this.createColors();
        this.drawChart();
      }));
  }

  private createSvg(): void {
    this.svg = d3.select(this.elementRef.nativeElement)
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
      .domain(this.data.map(d => d.amount.toString()))
      .range(['var(--yellow)', 'var(--orange)', 'var(--maroon)', 'var(--pink)', 'var(--magenta)']);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.amount));

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
      .text((d: any) => d.data.Category)
      .attr('transform', (d: any) => 'translate(' + labelLocation.centroid(d) + ')')
      .style('text-anchor', 'middle')
      .style('fill', 'white')
      .style('font-size', 15);
  }
}
