'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useSearchParams } from 'next/navigation';

export default function GraphView() {
  const svgRef = useRef<SVGSVGElement>(null);
  const searchParams = useSearchParams();
  const target = searchParams.get('target') || 'user123';

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Mock graph data
    const nodes = [
      { id: 'user', type: 'username', label: target },
      { id: 'email', type: 'email', label: `${target}@gmail.com` },
      { id: 'domain', type: 'domain', label: `${target}.com` },
      { id: 'gh', type: 'platform', label: 'GitHub' },
    ];

    const links = [
      { source: 'user', target: 'gh', confidence: 0.95 },
      { source: 'user', target: 'email', confidence: 0.88 },
      { source: 'email', target: 'domain', confidence: 0.82 },
    ];

    const width = svgRef.current.clientWidth;
    const height = 500;

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .attr('stroke', '#444')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', (d: any) => Math.sqrt(d.confidence) * 2)
      .attr('class', 'glow');

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 12)
      .attr('fill', (d: any) => {
        switch (d.type) {
          case 'username': return '#00ffaa';
          case 'email': return '#00ffff';
          case 'domain': return '#ff55aa';
          default: return '#888888';
        }
      })
      .call(drag(simulation) as any);

    const label = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text((d: any) => d.label)
      .attr('x', 16)
      .attr('y', 4)
      .attr('font-size', '10px')
      .attr('fill', '#e0e0e0');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      label
        .attr('x', (d: any) => d.x + 16)
        .attr('y', (d: any) => d.y + 4);
    });

    function drag(simulation: any) {
      function dragstarted(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event: any, d: any) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

    return () => simulation.stop();
  }, [target]);

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-terminal text-cyber-accent mb-4">Entity Graph</h2>
      <div className="bg-cyber-surface p-4 rounded">
        <svg
          ref={svgRef}
          className="w-full h-[500px] bg-cyber-bg rounded"
        />
      </div>
      <div className="mt-4 text-sm text-cyber-low">
        Click and drag nodes. Edge brightness = confidence.
      </div>
    </div>
  );
}