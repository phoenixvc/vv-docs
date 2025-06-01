import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from "../ui/table"

interface TableColumn {
  header: string
  accessorKey: string
  className?: string
}

interface TableBlockProps {
  title: string
  description?: string
  columns: TableColumn[]
  data: Record<string, any>[]
  footer?: ReactNode
  className?: string
}

export function TableBlock({ title, description, columns, data, footer, className }: TableBlockProps) {
  return (
    <Card className={`mb-6 ${className || ""}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-2">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.accessorKey} className={column.className}>
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={`${rowIndex}-${column.accessorKey}`} className={column.className}>
                      {row[column.accessorKey]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            {footer && (
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={columns.length}>{footer}</TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
