import React, { useState } from 'react';
import { useCoreWebVitals } from '../../hooks/useCoreWebVitals';
import './PerformanceMonitor.css';

/**
 * Componente PerformanceMonitor - Dashboard de métricas de performance
 * Muestra Core Web Vitals en tiempo real con indicadores visuales
 */
export default function PerformanceMonitor() {
  const { metrics, performanceScore, getMetricStatus, formatMetric, isLoading } = useCoreWebVitals();
  const [isExpanded, setIsExpanded] = useState(false);

  // Función para obtener el color según el estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return '#00C851';
      case 'needs-improvement':
        return '#FF8800';
      case 'poor':
        return '#CC0000';
      case 'not-measured':
        return '#666666';
      default:
        return '#999999';
    }
  };

  // Función para obtener el icono según el estado
  const getStatusIcon = (status) => {
    switch (status) {
      case 'good':
        return '✅';
      case 'needs-improvement':
        return '⚠️';
      case 'poor':
        return '❌';
      case 'not-measured':
        return '⏳';
      default:
        return '❓';
    }
  };

  // Función para obtener el texto descriptivo
  const getMetricDescription = (metric) => {
    const descriptions = {
      lcp: 'Largest Contentful Paint - Tiempo de carga del elemento más grande',
      fid: 'First Input Delay - Tiempo de respuesta a la primera interacción',
      cls: 'Cumulative Layout Shift - Cambios de layout durante la carga',
      fcp: 'First Contentful Paint - Primer contenido visible',
      ttfb: 'Time to First Byte - Tiempo de respuesta del servidor'
    };
    return descriptions[metric] || '';
  };

  // Función para obtener el score de performance como texto
  const getPerformanceScoreText = (score) => {
    if (score >= 90) return 'Excelente';
    if (score >= 70) return 'Bueno';
    if (score >= 50) return 'Necesita mejora';
    return 'Pobre';
  };

  // Función para obtener el color del score
  const getScoreColor = (score) => {
    if (score >= 90) return '#00C851';
    if (score >= 70) return '#FF8800';
    return '#CC0000';
  };

  if (isLoading) {
    return (
      <div className="performance-monitor loading">
        <div className="loading-spinner">📊</div>
        <span>Medición de performance...</span>
      </div>
    );
  }

  return (
    <div className={`performance-monitor ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {/* Header con score general */}
      <div 
        className="performance-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="score-container">
          <div 
            className="score-circle"
            style={{ 
              background: `conic-gradient(${getScoreColor(performanceScore)} ${performanceScore * 3.6}deg, #f0f0f0 0deg)` 
            }}
          >
            <span className="score-value">{performanceScore}</span>
          </div>
          <div className="score-info">
            <h4>Performance Score</h4>
            <p style={{ color: getScoreColor(performanceScore) }}>
              {getPerformanceScoreText(performanceScore)}
            </p>
          </div>
        </div>
        <div className="expand-icon">
          {isExpanded ? '📉' : '📊'}
        </div>
      </div>

      {/* Métricas detalladas */}
      {isExpanded && (
        <div className="metrics-container">
          <h3>Core Web Vitals</h3>
          
          {Object.entries(metrics).map(([metric, value]) => {
            if (metric === 'loading') return null;
            
            const status = getMetricStatus(metric, value);
            const formattedValue = formatMetric(metric, value);
            
            return (
              <div key={metric} className="metric-item">
                <div className="metric-header">
                  <span className="metric-name">{metric.toUpperCase()}</span>
                  <span 
                    className="status-indicator"
                    style={{ color: getStatusColor(status) }}
                  >
                    {getStatusIcon(status)}
                  </span>
                </div>
                
                <div className="metric-value">
                  <span className="value">{formattedValue}</span>
                  <span className="status-text" style={{ color: getStatusColor(status) }}>
                    {status === 'good' && 'Excelente'}
                    {status === 'needs-improvement' && 'Mejorar'}
                    {status === 'poor' && 'Pobre'}
                    {status === 'not-measured' && 'No medido'}
                  </span>
                </div>
                
                <div className="metric-description">
                  {getMetricDescription(metric)}
                </div>
                
                {/* Barra de progreso visual */}
                <div className="metric-progress">
                  <div 
                    className="progress-bar"
                    style={{ 
                      width: `${Math.min(100, (value || 0) / 100)}%`,
                      backgroundColor: getStatusColor(status)
                    }}
                  />
                </div>
              </div>
            );
          })}
          
          {/* Información adicional */}
          <div className="performance-info">
            <h4>💡 Información</h4>
            <ul>
              <li><strong>LCP:</strong> Objetivo: &lt; 2.5s</li>
              <li><strong>FID:</strong> Objetivo: &lt; 100ms</li>
              <li><strong>CLS:</strong> Objetivo: &lt; 0.1</li>
              <li><strong>FCP:</strong> Objetivo: &lt; 1.8s</li>
              <li><strong>TTFB:</strong> Objetivo: &lt; 800ms</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 