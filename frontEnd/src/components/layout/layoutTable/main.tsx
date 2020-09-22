import React, { memo, useState, useRef } from 'react'
import { Tooltip, ConfigProvider } from 'antd'
import Buttons from '@/components/button'
import Line from '@/components/line'
import { TableProps, ColumnProps } from 'antd/lib/table';
import Table from '@/components/table'
import { SyncOutlined } from '@ant-design/icons';
import { LayoutTableProps, grounpProps } from '@/interfaces'
import Pagination from '@/components/pagination'
import { PaginationProps } from 'antd/lib/pagination'
import { TableSize, FullScreeOut, Filter } from '@/components/layout/layoutTable'
import '@/assets/scss/common.scss'
import './index.scss'

type sizeProps = TableProps<any>['size'];
type pagaTionProps = PaginationProps['size'];
export type LayoutTablePropsType = {
    tableProps: TableProps<any>;
    pagaTionProps?: PaginationProps | { onChanges: PaginationProps['onChange'] }
} & LayoutTableProps & loading & { receive: Function };

const LayoutTable: React.FC<LayoutTablePropsType> = memo(function LayoutTable({ btnGrounp,
    iconGrounp, tableTitle, tableProps, pagaTionProps, loading, receive, children }) {
    const [tableSize, setTableSize] = useState<sizeProps>('middle');
    const [pagaTionSize, setPagaTionSize] = useState<pagaTionProps>('default');
    const [columns, setColumns] = useState(tableProps.columns);
    const elemet = useRef(null);
    const tableSizeFunc = (size: sizeProps) => {
        setTableSize(size)
        setPagaTionSize(size === "small" ? 'small' : 'default')
    }
    const filterColunsFunc = (val: ColumnProps<any>[]) => {  //动态控制colum
        setColumns(val);
    }
    const defauluIcon: grounpProps[] = [
        {
            component: (<Tooltip title='刷新' placement="bottom">
                <SyncOutlined onClick={(event) => receive(event)} className='svg-fontSize' />
            </Tooltip>)
        }, {
            component: (<Filter tablecolumns={tableProps.columns!} filterColunsFunc={filterColunsFunc} className='svg-fontSize' />)
        }, {
            component: (<TableSize tableSize={tableSizeFunc} className='svg-fontSize' />)
        }, {
            component: (<FullScreeOut elementObj={elemet.current!} className='svg-fontSize' />)
        }
    ];
    return (
        <ConfigProvider getPopupContainer={() => ((elemet.current || document.body) as any) as HTMLElement}>
            <div className='layout-table' ref={elemet}>
                {
                    // 占位，可以是select或者其他外传的组件
                    children?<div className='header-others'>{children}</div>:null
                }
                <div className='header-option'>
                    <div className='header-option-title'>{tableTitle}</div>
                    <div className='header-option-func'>
                        <div className='option-btn'>
                            {
                                btnGrounp?.length ? btnGrounp.map((item, index) => (
                                    <div key={index}>
                                        {
                                            item.component ? <>{item.component}</> : (<Buttons
                                                title={item.title}
                                                iconClass={item.iconClass}
                                                {...item}
                                            />
                                            )
                                        }
                                    </div>
                                )) : null
                            }
                        </div>
                        <div className='option-icon'>
                            {(btnGrounp?.length) ? <Line /> : null}
                            <div className='icon-grounp'>
                                {
                                    defauluIcon.map((item, index) => <div className='icon-data' key={index}>
                                        <div>{item.component}</div>
                                    </div>)
                                }
                                {
                                    iconGrounp ? iconGrounp.map((item, index) => (
                                        (<div className='icon-data' key={index}>
                                            {
                                                item.component ? <div>{item.component}</div> : (
                                                    <Tooltip title={item.title} placement="bottom">
                                                        <div>{item.icon}</div>
                                                    </Tooltip>
                                                )
                                            }
                                        </div>))) : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Table loading={loading} size={tableSize} {...tableProps} columns={columns} />
                <Pagination {...pagaTionProps}
                    className='view-pagitaion' size={pagaTionSize} />
            </div>
        </ConfigProvider>
    )
})

LayoutTable.defaultProps = {
    tableTitle: '查询表格'
}

export default LayoutTable;