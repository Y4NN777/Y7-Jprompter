'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';

interface BifurcationAnimationProps {
  complexity: number;
  isActive: boolean;
  onComplete?: () => void;
  className?: string;
}

/**
 * Animated bifurcation visualization
 * Shows branching paths when complexity >= 5
 */
export function BifurcationAnimation({
  complexity,
  isActive,
  onComplete,
  className = '',
}: BifurcationAnimationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (!svgRef.current || complexity < 5 || !isActive) return;

    const svg = d3.select(svgRef.current);
    const width = 300;
    const height = 200;

    svg.selectAll('*').remove();
    setAnimationComplete(false);

    // Create gradient for glow effect
    const defs = svg.append('defs');

    const gradient = defs.append('linearGradient')
      .attr('id', 'bifurcation-gradient')
      .attr('x1', '0%')
      .attr('y1', '100%')
      .attr('x2', '0%')
      .attr('y2', '0%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', 'var(--accent-primary)')
      .attr('stop-opacity', 1);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', 'var(--accent-secondary)')
      .attr('stop-opacity', 1);

    // Glow filter
    const glow = defs.append('filter')
      .attr('id', 'bifurcation-glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    glow.append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'coloredBlur');

    const merge = glow.append('feMerge');
    merge.append('feMergeNode').attr('in', 'coloredBlur');
    merge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Calculate branch paths based on complexity
    const numBranches = Math.min(complexity - 3, 4); // 2-4 branches
    const startX = width / 2;
    const startY = height - 20;
    const endY = 30;

    const paths: string[] = [];
    const branchSpread = 100;

    for (let i = 0; i < numBranches; i++) {
      const progress = numBranches > 1 ? i / (numBranches - 1) : 0.5;
      const endX = startX - branchSpread / 2 + branchSpread * progress;
      const midY = height / 2;
      const controlOffset = (progress - 0.5) * 60;

      // Create curved path
      const path = `M ${startX} ${startY}
                    Q ${startX} ${midY} ${startX + controlOffset * 0.5} ${midY}
                    Q ${startX + controlOffset} ${midY} ${endX} ${endY}`;
      paths.push(path);
    }

    // Draw paths with animation
    paths.forEach((pathData, i) => {
      const path = svg.append('path')
        .attr('d', pathData)
        .attr('fill', 'none')
        .attr('stroke', 'url(#bifurcation-gradient)')
        .attr('stroke-width', 3)
        .attr('stroke-linecap', 'round')
        .attr('filter', 'url(#bifurcation-glow)')
        .attr('opacity', 0.8);

      // Get path length for animation
      const pathLength = path.node()?.getTotalLength() || 0;

      // Animate path drawing
      path
        .attr('stroke-dasharray', pathLength)
        .attr('stroke-dashoffset', pathLength)
        .transition()
        .duration(1000)
        .delay(i * 150)
        .ease(d3.easeQuadOut)
        .attr('stroke-dashoffset', 0);

      // Add endpoint circle
      const endPoint = path.node()?.getPointAtLength(pathLength);
      if (endPoint) {
        svg.append('circle')
          .attr('cx', endPoint.x)
          .attr('cy', endPoint.y)
          .attr('r', 0)
          .attr('fill', 'var(--accent-secondary)')
          .attr('filter', 'url(#bifurcation-glow)')
          .transition()
          .duration(300)
          .delay(i * 150 + 800)
          .ease(d3.easeBackOut)
          .attr('r', 6);
      }
    });

    // Add start point
    svg.append('circle')
      .attr('cx', startX)
      .attr('cy', startY)
      .attr('r', 0)
      .attr('fill', 'var(--accent-primary)')
      .attr('filter', 'url(#bifurcation-glow)')
      .transition()
      .duration(300)
      .ease(d3.easeBackOut)
      .attr('r', 8);

    // Mark animation complete
    const totalDuration = 1000 + (numBranches - 1) * 150 + 300;
    setTimeout(() => {
      setAnimationComplete(true);
      onComplete?.();
    }, totalDuration);

    return () => {
      svg.selectAll('*').remove();
    };
  }, [complexity, isActive, onComplete]);

  if (complexity < 5 || !isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`relative ${className}`}
      >
        <svg
          ref={svgRef}
          width={300}
          height={200}
          className="w-full h-full"
          viewBox="0 0 300 200"
        />

        {/* Labels */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 10 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-xs text-[var(--text-muted)]">
            {complexity - 3} alternative paths
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: animationComplete ? 1 : 0 }}
          transition={{ delay: 0.8 }}
          className="absolute top-2 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-xs font-medium text-[var(--accent-secondary)]">
            Bifurcation Active
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Mini bifurcation indicator for complexity slider
 */
export function BifurcationIndicator({
  complexity,
  className = '',
}: {
  complexity: number;
  className?: string;
}) {
  const isBifurcated = complexity >= 5;

  return (
    <motion.div
      initial={false}
      animate={{
        scale: isBifurcated ? 1 : 0.8,
        opacity: isBifurcated ? 1 : 0.3,
      }}
      className={`flex items-center gap-1 ${className}`}
    >
      <svg width="24" height="16" viewBox="0 0 24 16" className="overflow-visible">
        <motion.path
          d="M12 14 L12 8 Q12 4 8 2"
          fill="none"
          stroke="var(--accent-secondary)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isBifurcated ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.path
          d="M12 8 Q12 4 16 2"
          fill="none"
          stroke="var(--accent-secondary)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isBifurcated ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
        <motion.circle
          cx="12"
          cy="14"
          r="2"
          fill="var(--accent-primary)"
          initial={{ scale: 0 }}
          animate={{ scale: isBifurcated ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.circle
          cx="8"
          cy="2"
          r="2"
          fill="var(--accent-secondary)"
          initial={{ scale: 0 }}
          animate={{ scale: isBifurcated ? 1 : 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        />
        <motion.circle
          cx="16"
          cy="2"
          r="2"
          fill="var(--accent-secondary)"
          initial={{ scale: 0 }}
          animate={{ scale: isBifurcated ? 1 : 0 }}
          transition={{ duration: 0.2, delay: 0.3 }}
        />
      </svg>
      <motion.span
        initial={false}
        animate={{ opacity: isBifurcated ? 1 : 0 }}
        className="text-xs font-medium text-[var(--accent-secondary)]"
      >
        Bifurcated
      </motion.span>
    </motion.div>
  );
}
