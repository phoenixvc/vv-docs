"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useColorMode } from "@docusaurus/theme-common"
import BaseDiagram, { type BaseDiagramProps } from "../BaseDiagram"
import styles from "./styles.module.css"

// Define node and edge types
export interface FlowNode {
  id: string
  type?: string
  position: { x: number; y: number }
  data: { label: string; [key: string]: any }
  style?: React.CSSProperties
  className?: string
}

export interface FlowEdge {
  id: string
  source: string
  target: string
  type?: string
  animated?: boolean
  label?: string
  style?: React.CSSProperties
  className?: string
}

export interface FlowDiagramProps extends Omit<BaseDiagramProps, "children"> {
  /** Initial nodes for the diagram */
  nodes: FlowNode[]
  /** Initial edges for the diagram */
  edges: FlowEdge[]
  /** Whether the diagram is editable */
  editable?: boolean
  /** Optional layout direction */
  direction?: "LR" | "RL" | "TB" | "BT"
  /** Optional callback when nodes or edges change */
  onChange?: (nodes: FlowNode[], edges: FlowEdge[]) => void
}

/**
 * Flow diagram component for interactive node-based diagrams
 */
export function FlowDiagram({
  id,
  title,
  description,
  caption,
  source,
  className,
  nodes: initialNodes,
  edges: initialEdges,
  editable = false,
  direction = "TB",
  onChange,
  ...rest
}: FlowDiagramProps): JSX.Element {
  const { colorMode } = useColorMode()
  const [isClient, setIsClient] = useState(false)
  const [ReactFlow, setReactFlow] = useState<any>(null)
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  // Handle server-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Dynamically import ReactFlow to avoid SSR issues
  useEffect(() => {
    if (!isClient) return

    const loadReactFlow = async () => {
      try {
        // Import ReactFlow and its styles
        const ReactFlowModule = await import("reactflow")
        await import("reactflow/dist/style.css")
        setReactFlow(() => ReactFlowModule)
      } catch (error) {
        console.error("Error loading ReactFlow:", error)
      }
    }

    loadReactFlow()
  }, [isClient])

  // Handle node changes
  const onNodesChange = useCallback(
    (changes) => {
      if (!ReactFlow) return

      const { applyNodeChanges } = ReactFlow
      const updatedNodes = applyNodeChanges(changes, nodes)
      setNodes(updatedNodes)

      if (onChange) {
        onChange(updatedNodes, edges)
      }
    },
    [ReactFlow, nodes, edges, onChange],
  )

  // Handle edge changes
  const onEdgesChange = useCallback(
    (changes) => {
      if (!ReactFlow) return

      const { applyEdgeChanges } = ReactFlow
      const updatedEdges = applyEdgeChanges(changes, edges)
      setEdges(updatedEdges)

      if (onChange) {
        onChange(nodes, updatedEdges)
      }
    },
    [ReactFlow, nodes, edges, onChange],
  )

  // Handle connections between nodes
  const onConnect = useCallback(
    (connection) => {
      if (!ReactFlow) return

      const { addEdge } = ReactFlow
      const newEdge = {
        ...connection,
        id: `e-${connection.source}-${connection.target}`,
        animated: false,
      }

      const updatedEdges = addEdge(newEdge, edges)
      setEdges(updatedEdges)

      if (onChange) {
        onChange(nodes, updatedEdges)
      }
    },
    [ReactFlow, nodes, edges, onChange],
  )

  // Get layout direction settings
  const getLayoutDirection = () => {
    switch (direction) {
      case "LR":
        return { x: 1, y: 0 }
      case "RL":
        return { x: -1, y: 0 }
      case "BT":
        return { x: 0, y: -1 }
      case "TB":
      default:
        return { x: 0, y: 1 }
    }
  }

  if (!isClient || !ReactFlow) {
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

  const { ReactFlowProvider, Background, Controls, MiniMap, Panel } = ReactFlow

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
      <div className={styles.flowContainer}>
        <ReactFlowProvider>
          <ReactFlow.default
            nodes={nodes}
            edges={edges}
            onNodesChange={editable ? onNodesChange : undefined}
            onEdgesChange={editable ? onEdgesChange : undefined}
            onConnect={editable ? onConnect : undefined}
            nodesDraggable={editable}
            nodesConnectable={editable}
            elementsSelectable={editable}
            fitView
            attributionPosition="bottom-right"
            proOptions={{ hideAttribution: true }}
            className={styles.reactFlow}
          >
            <Background color={colorMode === "dark" ? "#555" : "#aaa"} gap={16} size={1} />
            <Controls showInteractive={false} />
            <MiniMap
              nodeStrokeColor={colorMode === "dark" ? "#555" : "#ddd"}
              nodeColor={colorMode === "dark" ? "#333" : "#fff"}
              nodeBorderRadius={2}
            />
            {editable && (
              <Panel position="top-right" className={styles.editorPanel}>
                <div className={styles.editorControls}>
                  <span className={styles.editorMode}>Edit Mode</span>
                </div>
              </Panel>
            )}
          </ReactFlow.default>
        </ReactFlowProvider>
      </div>
    </BaseDiagram>
  )
}

export default FlowDiagram
