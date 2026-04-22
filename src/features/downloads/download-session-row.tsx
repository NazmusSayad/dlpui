import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { type DownloadSession } from '@/store/use-download-session-store'
import { flexRender, type Row } from '@tanstack/react-table'
import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'

export function DownloadSessionRow({ row }: { row: Row<DownloadSession> }) {
  return (
    <React.Fragment>
      <TableRow
        className={cn(
          row.getIsExpanded() && 'bg-secondary/60 hover:bg-secondary/60'
        )}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>

      <AnimatePresence initial={false}>
        {row.getIsExpanded() && (
          <TableRow key={`${row.id}-expanded`}>
            <TableCell
              colSpan={row.getAllCells().length}
              className="border-0 p-0"
            >
              <motion.div
                exit={{ height: 0, opacity: 0 }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="bg-secondary/60">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="pl-12">Name</TableHead>
                        <TableHead>Link</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Format</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {row.original.contents.map((content) => (
                        <TableRow key={content.id}>
                          <TableCell className="pl-12">
                            {content.name}
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {content.link}
                          </TableCell>
                          <TableCell>{content.progress}%</TableCell>
                          <TableCell>{content.format ?? '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </motion.div>
            </TableCell>
          </TableRow>
        )}
      </AnimatePresence>
    </React.Fragment>
  )
}
