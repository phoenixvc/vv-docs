import type React from "react"
import styles from "./ApiReference.module.css"
import { Card } from "../common/Card"
import { CodeBlock } from "./CodeBlock"
import { Badge } from "../common/Badge"

export interface ApiEndpoint {
  /**
   * HTTP method (GET, POST, PUT, DELETE, etc.)
   */
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS"
  /**
   * Endpoint path
   */
  path: string
  /**
   * Short description of what the endpoint does
   */
  description: string
  /**
   * Optional request parameters
   */
  parameters?: ApiParameter[]
  /**
   * Optional request body schema
   */
  requestBody?: {
    description?: string
    content: string
    contentType: string
  }
  /**
   * Response schema
   */
  responses: ApiResponse[]
  /**
   * Optional example code snippets
   */
  examples?: ApiExample[]
}

export interface ApiParameter {
  name: string
  type: string
  required: boolean
  description: string
  location: "path" | "query" | "header" | "cookie"
}

export interface ApiResponse {
  status: number
  description: string
  content?: string
  contentType?: string
}

export interface ApiExample {
  language: string
  title?: string
  code: string
}

export interface ApiReferenceProps {
  /**
   * Title of the API reference section
   */
  title: string
  /**
   * Optional description of the API
   */
  description?: string
  /**
   * Base URL for the API
   */
  baseUrl: string
  /**
   * List of API endpoints
   */
  endpoints: ApiEndpoint[]
  /**
   * Optional CSS class name for additional styling
   */
  className?: string
}

/**
 * ApiReference component for displaying API documentation with endpoints,
 * parameters, request/response examples, and code snippets.
 */
export const ApiReference: React.FC<ApiReferenceProps> = ({
  title,
  description,
  baseUrl,
  endpoints,
  className = "",
}) => {
  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return styles.methodGet
      case "POST":
        return styles.methodPost
      case "PUT":
        return styles.methodPut
      case "DELETE":
        return styles.methodDelete
      case "PATCH":
        return styles.methodPatch
      default:
        return styles.methodDefault
    }
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return styles.statusSuccess
    if (status >= 300 && status < 400) return styles.statusRedirect
    if (status >= 400 && status < 500) return styles.statusClientError
    if (status >= 500) return styles.statusServerError
    return styles.statusDefault
  }

  return (
    <div className={`${styles.apiReference} ${className}`}>
      <h2 className={styles.apiTitle}>{title}</h2>
      {description && <p className={styles.apiDescription}>{description}</p>}
      <div className={styles.baseUrl}>
        <span className={styles.baseUrlLabel}>Base URL:</span>
        <code className={styles.baseUrlCode}>{baseUrl}</code>
      </div>

      {endpoints.map((endpoint, index) => (
        <Card key={`endpoint-${index}`} className={styles.endpointCard}>
          <div className={styles.endpointHeader}>
            <div className={styles.endpointMethod}>
              <Badge text={endpoint.method} className={`${styles.methodBadge} ${getMethodColor(endpoint.method)}`} />
            </div>
            <div className={styles.endpointPath}>
              <code>{endpoint.path}</code>
            </div>
          </div>

          <p className={styles.endpointDescription}>{endpoint.description}</p>

          {endpoint.parameters && endpoint.parameters.length > 0 && (
            <div className={styles.parametersSection}>
              <h4 className={styles.sectionTitle}>Parameters</h4>
              <table className={styles.parametersTable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Required</th>
                    <th>Location</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {endpoint.parameters.map((param, paramIndex) => (
                    <tr key={`param-${paramIndex}`}>
                      <td>
                        <code>{param.name}</code>
                      </td>
                      <td>
                        <code>{param.type}</code>
                      </td>
                      <td>{param.required ? "Yes" : "No"}</td>
                      <td>{param.location}</td>
                      <td>{param.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {endpoint.requestBody && (
            <div className={styles.requestBodySection}>
              <h4 className={styles.sectionTitle}>Request Body</h4>
              {endpoint.requestBody.description && (
                <p className={styles.requestBodyDescription}>{endpoint.requestBody.description}</p>
              )}
              <CodeBlock
                code={endpoint.requestBody.content}
                language={endpoint.requestBody.contentType === "application/json" ? "json" : "text"}
                title="Request Body Schema"
              />
            </div>
          )}

          <div className={styles.responsesSection}>
            <h4 className={styles.sectionTitle}>Responses</h4>
            {endpoint.responses.map((response, responseIndex) => (
              <div key={`response-${responseIndex}`} className={styles.responseItem}>
                <div className={styles.responseHeader}>
                  <Badge
                    text={response.status.toString()}
                    className={`${styles.statusBadge} ${getStatusColor(response.status)}`}
                  />
                  <span className={styles.responseDescription}>{response.description}</span>
                </div>
                {response.content && (
                  <CodeBlock
                    code={response.content}
                    language={response.contentType === "application/json" ? "json" : "text"}
                    title={`${response.status} Response`}
                  />
                )}
              </div>
            ))}
          </div>

          {endpoint.examples && endpoint.examples.length > 0 && (
            <div className={styles.examplesSection}>
              <h4 className={styles.sectionTitle}>Examples</h4>
              {endpoint.examples.map((example, exampleIndex) => (
                <CodeBlock
                  key={`example-${exampleIndex}`}
                  code={example.code}
                  language={example.language}
                  title={example.title || `Example (${example.language})`}
                />
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

export default ApiReference
