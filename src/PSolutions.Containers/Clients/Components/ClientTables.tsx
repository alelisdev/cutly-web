import React, { HTMLProps, useRef } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';

type Client = {
    name: string
    email: string
    phone: string
}
  
const defaultData: Client[] = [
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    {
        name: 'Brenda Watsic',
        email: 'watsica@example.com',
        phone: '(961) 647-6123	9198'
    },
    
]

interface ListRowProps {
    style: any;
    key: string;
    index: number;
    isScrolling: boolean;
}


function ClientTables() {

  const [rowSelection, setRowSelection] = React.useState({})

  const editRow = (id : string) => {
    console.log(id + 'edit');
  }

  const deleteRow = (id: string) => {
    console.log(id + 'delete');
  }

  const columns = React.useMemo<ColumnDef<Client>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
                className : 'form-check-input',
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        header: 'Name',
        accessorKey: 'name',
        cell: info => info.getValue(),
      },
      {
        header: 'Email',
        accessorKey: 'email',
        cell: info => info.getValue(),
      },
      {
        header: 'Phone',
        accessorKey: 'phone',
        cell: info => info.getValue(),
      }
    ],
    []
  )

  const [data, setData] = React.useState(defaultData)

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  })

  return (
      <>
        <table className='w-100'>
            <thead className='table-header'>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                    return (
                    <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                        <>
                            {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                        </>
                        )}
                    </th>
                    )
                })}
                <th></th>
                </tr>
            ))}
            </thead>
            <tbody className='table-body'>
            {table.getRowModel().rows.map(row => {
                return (
                <tr className={Number(row.id) % 2 ? 'tr-even' : 'tr-odd'} key={row.id} >
                    {row.getVisibleCells().map(cell => {
                    return (
                        <td key={cell.id}>
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                        </td>
                    )
                    }
                    )}
                    <td>
                    <Dropdown className="d-inline" autoClose="outside">
                        <Dropdown.Toggle id="dropdown-autoclose-outside">
                        ...
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item onClick={() => editRow(row.id)}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={() => deleteRow(row.id)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </td>
                </tr>
                )
            })}
            </tbody>
        </table>
        <div className="h-2" />
        <div className="flex items-center gap-2">
            <div className='pagination mt-5 justify-content-center'>
                <button
                    className="border rounded p-1 mx-2"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className="border rounded p-1 mx-2"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className="border rounded p-1 mx-2"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className="border rounded p-1 mx-2"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
            </div>
            <div className='d-flex justify-content-between'>
                <div className='d-flex m-3'>
                    <span className="d-flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
                        </strong>
                    </span>
                </div>
                <div className='d-flex col-md-1 m-3' style={{alignItems: 'center'}}>
                    <select
                        className='form-control'
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                            {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            
        </div>
      </>
  )
}

function Filter({
  column,
  table,
}: {
  column: Column<any, any>
  table: Table<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={((column.getFilterValue() as any)?.[0] ?? '') as string}
        onChange={e =>
          column.setFilterValue((old: any) => [e.target.value, old?.[1]])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={((column.getFilterValue() as any)?.[1] ?? '') as string}
        onChange={e =>
          column.setFilterValue((old: any) => [old?.[0], e.target.value])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(column.getFilterValue() ?? '') as string}
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  )
}

function IndeterminateCheckbox({
  indeterminate,
  className = 'form-check-input',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <div className='mx-5'>
        <input
        type="checkbox"
        ref={ref}
        className={className + ' cursor-pointer'}
        {...rest}
        />
    </div>
  )
}


export default ClientTables;