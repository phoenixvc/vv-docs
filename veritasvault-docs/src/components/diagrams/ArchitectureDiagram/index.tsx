"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useColorMode } from "@docusaurus/theme-common"
import BaseDiagram, { type BaseDiagramProps } from "../BaseDiagram"
import styles from "./styles.module.css"
import clsx from "clsx"

// Define component types
export interface ArchComponent {
  id: string
  type: "service" | "database" | "client" | "server" | "queue" | "storage" | "api" | "custom"
  label: string
  description?: string
  icon?: string
  position: { x: number; y: number }
  size?: { width: number; height: number }
  layer?: string
  style?: React.CSSProperties
}

// Define connection types
export interface ArchConnection {
  id: string
  source: string
  target: string
  label?: string
  type?: "solid" | "dashed" | "dotted"
  arrow?: "none" | "forward" | "backward" | "both"
  style?: React.CSSProperties
}

// Define layer types
export interface ArchLayer {
  id: string
  label: string
  color?: string
  order: number
}

export interface ArchitectureDiagramProps extends Omit<BaseDiagramProps, "children"> {
  /** Components in the architecture diagram */
  components: ArchComponent[]
  /** Connections between components */
  connections: ArchConnection[]
  /** Optional layers for organizing components */
  layers?: ArchLayer[]
  /** Whether to show component details on hover */
  showDetails?: boolean
  /** Whether to show layer labels */
  showLayerLabels?: boolean
}

/**
 * Architecture diagram component for system architecture visualization
 */
export function ArchitectureDiagram({
  id,
  title,
  description,
  caption,
  source,
  className,
  components,
  connections,
  layers = [],
  showDetails = true,
  showLayerLabels = true,
  ...rest
}: ArchitectureDiagramProps): JSX.Element {
  const { colorMode } = useColorMode()
  const [isClient, setIsClient] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null)

  // Handle server-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Get icon for component type
  const getComponentIcon = (type: ArchComponent["type"]) => {
    switch (type) {
      case "service":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
          </svg>
        )
      case "database":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          </svg>
        )
      case "client":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        )
      case "server":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
          </svg>
        )
      case "queue":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        )
      case "storage":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"></path>
            <path d="M10 4v18"></path>
            <path d="M4 9h3"></path>
            <path d="M4 14h3"></path>
          </svg>
        )
      case "api":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        )
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          </svg>
        )
    }
  }

  // Get layer by ID
  const getLayerById = (layerId: string) => {
    return layers.find((layer) => layer.id === layerId)
  }

  // Get component by ID
  const getComponentById = (componentId: string) => {
    return components.find((component) => component.id === componentId)
  }

  // Get connection path
  const getConnectionPath = (connection: ArchConnection) => {
    const sourceComponent = getComponentById(connection.source)
    const targetComponent = getComponentById(connection.target)

    if (!sourceComponent || !targetComponent) return ""

    const sourceX = sourceComponent.position.x + (sourceComponent.size?.width || 120) / 2
    const sourceY = sourceComponent.position.y + (sourceComponent.size?.height || 80) / 2
    const targetX = targetComponent.position.x + (targetComponent.size?.width || 120) / 2
    const targetY = targetComponent.position.y + (targetComponent.size?.height || 80) / 2

    // Calculate control points for curved lines
    const dx = targetX - sourceX
    const dy = targetY - sourceY
    const distance = Math.sqrt(dx * dx + dy * dy)
    const controlPointOffset = distance / 3

    // Create curved path
    return `M ${sourceX} ${sourceY} C ${sourceX + controlPointOffset} ${sourceY}, ${targetX - controlPointOffset} ${targetY}, ${targetX} ${targetY}`
  }

  // Get connection marker based on arrow type
  const getConnectionMarker = (connection: ArchConnection) => {
    switch (connection.arrow) {
      case "forward":
        return "url(#arrow-end)"
      case "backward":
        return "url(#arrow-start)"
      case "both":
        return "url(#arrow-start) url(#arrow-end)"
      default:
        return "none"
    }
  }

  // Get connection stroke-dasharray based on type
  const getConnectionDashArray = (connection: ArchConnection) => {
    switch (connection.type) {
      case "dashed":
        return "5,5"
      case "dotted":
        return "1,5"
      default:
        return "none"
    }
  }

  // Sort layers by order
  const sortedLayers = [...layers].sort((a, b) => a.order - b.order)

  // Group components by layer
  const componentsByLayer = components.reduce(
    (acc, component) => {
      const layerId = component.layer || "default"
      if (!acc[layerId]) {
        acc[layerId] = []
      }
      acc[layerId].push(component)
      return acc
    },
    {} as Record<string, ArchComponent[]>,
  )

  if (!isClient) {
    return (
      <BaseDiagram
        id={id}
        title={title}
        description={description}
        caption={caption}
        source={source}
        className={className}
        interactive={true}
        {...rest}
      >
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner} />
          <span>Loading diagram...</span>
        </div>
      </BaseDiagram>
    )
  }

  return (
    <BaseDiagram
      id={id}
      title={title}
      description={description}
      caption={caption}
      source={source}
      className={className}
      interactive={true}
      {...rest}
    >
      <div className={styles.architectureContainer}>
        <svg className={styles.architectureSvg} viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
          {/* Define arrow markers */}
          <defs>
            <marker
              id="arrow-end"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
            <marker
              id="arrow-start"
              viewBox="0 0 10 10"
              refX="1"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 10 0 L 0 5 L 10 10 z" fill="currentColor" />
            </marker>
          </defs>

          {/* Render layers */}
          {sortedLayers.map((layer) => {
            const layerComponents = componentsByLayer[layer.id] || []
            if (layerComponents.length === 0) return null

            // Calculate layer bounds
            const minX = Math.min(...layerComponents.map((c) => c.position.x)) - 20
            const minY = Math.min(...layerComponents.map((c) => c.position.y)) - 20
            const maxX = Math.max(...layerComponents.map((c) => c.position.x + (c.size?.width || 120))) + 20
            const maxY = Math.max(...layerComponents.map((c) => c.position.y + (c.size?.height || 80))) + 20
            const width = maxX - minX
            const height = maxY - minY

            return (
              <g key={layer.id} className={styles.layer}>
                <rect
                  x={minX}
                  y={minY}
                  width={width}
                  height={height}
                  rx="8"
                  ry="8"
                  fill={layer.color || "var(--ifm-color-emphasis-100)"}
                  opacity="0.3"
                  className={styles.layerRect}
                />
                {showLayerLabels && (
                  <text x={minX + 15} y={minY + 25} className={styles.layerLabel}>
                    {layer.label}
                  </text>
                )}
              </g>
            )
          })}

          {/* Render connections */}
          {connections.map((connection) => (
            <g key={connection.id} className={styles.connection}>
              <path
                d={getConnectionPath(connection)}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={getConnectionDashArray(connection)}
                markerEnd={
                  connection.arrow === "forward" || connection.arrow === "both" ? "url(#arrow-end)" : undefined
                }
                markerStart={
                  connection.arrow === "backward" || connection.arrow === "both" ? "url(#arrow-start)" : undefined
                }
                style={connection.style}
                className={styles.connectionPath}
              />
              {connection.label && (
                <text className={styles.connectionLabel} textAnchor="middle" dy="-5">
                  <textPath href={`#${connection.id}-path`} startOffset="50%">
                    {connection.label}
                  </textPath>
                </text>
              )}
            </g>
          ))}

          {/* Render components */}
          {components.map((component) => (
            <g
              key={component.id}
              transform={`translate(${component.position.x}, ${component.position.y})`}
              className={clsx(styles.component, {
                [styles.selectedComponent]: selectedComponent === component.id,
                [styles.hoveredComponent]: hoveredComponent === component.id,
              })}
              onClick={() => setSelectedComponent(selectedComponent === component.id ? null : component.id)}
              onMouseEnter={() => setHoveredComponent(component.id)}
              onMouseLeave={() => setHoveredComponent(null)}
              style={component.style}
            >
              <rect
                x="0"
                y="0"
                width={component.size?.width || 120}
                height={component.size?.height || 80}
                rx="8"
                ry="8"
                className={styles.componentRect}
              />
              <foreignObject
                x="10"
                y="10"
                width={(component.size?.width || 120) - 20}
                height={(component.size?.height || 80) - 20}
              >
                <div className={styles.componentContent}>
                  <div className={styles.componentIcon}>
                    {component.icon ? (
                      <img src={component.icon || "/placeholder.svg"} alt="" className={styles.customIcon} />
                    ) : (
                      getComponentIcon(component.type)
                    )}
                  </div>
                  <div className={styles.componentLabel}>{component.label}</div>
                </div>
              </foreignObject>
            </g>
          ))}
        </svg>

        {/* Component details panel */}
        {showDetails && selectedComponent && (
          <div className={styles.detailsPanel}>
            {(() => {
              const component = getComponentById(selectedComponent)
              if (!component) return null

              return (
                <>
                  <h4 className={styles.detailsTitle}>{component.label}</h4>
                  {component.description && <p className={styles.detailsDescription}>{component.description}</p>}
                  <div className={styles.detailsMeta}>
                    <div className={styles.detailsMetaItem}>
                      <span className={styles.detailsMetaLabel}>Type:</span>
                      <span className={styles.detailsMetaValue}>{component.type}</span>
                    </div>
                    {component.layer && (
                      <div className={styles.detailsMetaItem}>
                        <span className={styles.detailsMetaLabel}>Layer:</span>
                        <span className={styles.detailsMetaValue}>
                          {getLayerById(component.layer)?.label || component.layer}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    className={styles.detailsCloseButton}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedComponent(null)
                    }}
                    aria-label="Close details"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </>
              )
            })()}
          </div>
        )}
      </div>
    </BaseDiagram>
  )
}

export default ArchitectureDiagram
