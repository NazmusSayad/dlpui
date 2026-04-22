import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  useDownloadSessionStore,
  type DownloadSession,
  type DownloadSessionContent,
} from '@/store/use-download-session-store'
import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  ArrowUpDownIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ExpandedState,
  type Row,
} from '@tanstack/react-table'
import * as React from 'react'
import { DownloadSessionRow } from './download-session-row'

const columnHelper = createColumnHelper<DownloadSession>()

const columns = [
  columnHelper.display({
    id: 'expander',
    cell: ({ row }: { row: Row<DownloadSession> }) => {
      return (
        <button
          disabled={!row.getCanExpand()}
          onClick={row.getToggleExpandedHandler()}
          className="size-4 cursor-pointer disabled:cursor-default disabled:opacity-30"
        >
          <HugeiconsIcon
            icon={row.getIsExpanded() ? ArrowDown01Icon : ArrowRight01Icon}
            className="size-4"
          />
        </button>
      )
    },

    size: 20,
    minSize: 20,
    maxSize: 20,
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row: DownloadSession) => row.contents.length, {
    id: 'files',
    header: 'Files',
  }),
  columnHelper.accessor(
    (row: DownloadSession) =>
      row.contents.filter((c: DownloadSessionContent) => c.progress === 100)
        .length,
    {
      id: 'completed',
      header: 'Completed',
    }
  ),
  columnHelper.accessor(
    (row: DownloadSession) => {
      const total = row.contents.length
      if (total === 0) return 0
      return Math.round(
        row.contents.reduce(
          (sum: number, c: DownloadSessionContent) => sum + c.progress,
          0
        ) / total
      )
    },
    {
      id: 'avgProgress',
      header: 'Avg Progress',
      cell: (info) => `${info.getValue()}%`,
    }
  ),
]

function SortIcon({ column }: { column: Column<DownloadSession, unknown> }) {
  const sorted = column.getIsSorted()
  if (sorted === 'asc')
    return <HugeiconsIcon icon={ArrowUp01Icon} className="size-3" />
  if (sorted === 'desc')
    return <HugeiconsIcon icon={ArrowDown01Icon} className="size-3" />
  return <HugeiconsIcon icon={ArrowUpDownIcon} className="size-3 opacity-40" />
}

export function DownloadsTable() {
  const sessions = useDownloadSessionStore((s) => s.sessions)
  const [expanded, setExpanded] = React.useState<ExpandedState>({})

  const table = useReactTable({
    columns,
    data: sessions,
    state: { expanded },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: (row) => row.original.contents.length > 0,
  })

  return (
    <Table className="w-full">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                <div
                  className={`flex items-center gap-2 select-none ${header.column.getCanSort() ? 'cursor-pointer' : ''}`}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getCanSort() && (
                    <SortIcon column={header.column} />
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <DownloadSessionRow key={row.id} row={row} />
        ))}
      </TableBody>
    </Table>
  )
}
