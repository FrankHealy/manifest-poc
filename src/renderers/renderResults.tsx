import React from "react";

type TableSpec = {
  id: string;
  columns: { header: string; field: string }[];
  rows: Record<string, any>[];
  sortableColumns?: string[];
};

type DataTableProps = {
  title: string;
  table: TableSpec;
  getSort: (id: string) => { col: string; dir: "asc" | "desc" } | null;
  toggleSort: (id: string, col: string) => void;
};

type DataTableComponent = (props: DataTableProps) => React.ReactNode;

export function renderResults(
  title: string,
  table: TableSpec,
  getSort: DataTableProps["getSort"],
  toggleSort: DataTableProps["toggleSort"],
  DataTable: DataTableComponent
): React.ReactNode {
  return <DataTable title={title} table={table} getSort={getSort} toggleSort={toggleSort} />;
}
