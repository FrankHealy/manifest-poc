import React from "react";
import { chakra } from "@chakra-ui/react";

type SortDir = "asc" | "desc";
export type SortState = { col: string; dir: SortDir } | null;

type DataTableSpec = {
  id: string;
  columns: { header: string; field: string }[];
  rows: Record<string, any>[];
  sortableColumns?: string[];
};

type DataTableProps = {
  title: string;
  table: DataTableSpec;
  getSort: (id: string) => SortState;
  toggleSort: (id: string, col: string) => void;
  hideTitle?: boolean;
};

function sortGlyph(sort: SortState, col: string) {
  if (!sort || sort.col !== col) return "";
  return sort.dir === "asc" ? " ^" : " v";
}

function sortRows(rows: any[], sort: SortState): any[] {
  if (!sort) return rows;
  const { col, dir } = sort;

  const sorted = [...rows].sort((a, b) => {
    const av = a?.[col];
    const bv = b?.[col];

    if (av == null && bv == null) return 0;
    if (av == null) return -1;
    if (bv == null) return 1;

    // numeric if possible
    const an = typeof av === "number" ? av : Number(av);
    const bn = typeof bv === "number" ? bv : Number(bv);
    const bothNumeric = !Number.isNaN(an) && !Number.isNaN(bn);

    if (bothNumeric) return an - bn;

    const as = String(av).toLowerCase();
    const bs = String(bv).toLowerCase();
    return as < bs ? -1 : as > bs ? 1 : 0;
  });

  return dir === "asc" ? sorted : sorted.reverse();
}

export function DataTable({
  title,
  table,
  getSort,
  toggleSort,
  hideTitle
}: DataTableProps) {
  const sortable = new Set(table?.sortableColumns ?? []);
  const sort = getSort(table.id);
  const rows = sortRows(table?.rows ?? [], sort);

  return (
    <chakra.div borderWidth="1px" rounded="md" overflow="hidden">
      {!hideTitle ? (
        <chakra.div p="16px">
          <chakra.h3 fontSize="sm" fontWeight="semibold" color="brand.600">
            {title}
          </chakra.h3>
        </chakra.div>
      ) : null}

      <chakra.table width="100%" borderCollapse="collapse" fontSize="sm">
        <chakra.thead>
          <chakra.tr bg="brand.600">
            {table.columns.map((c) => {
              const isSortable = sortable.has(c.field);
              return (
                <chakra.th
                  key={c.field}
                  textAlign="left"
                  color="white"
                  fontWeight="bold"
                  px="12px"
                  py="8px"
                  cursor={isSortable ? "pointer" : "default"}
                  userSelect="none"
                  onClick={isSortable ? () => toggleSort(table.id, c.field) : undefined}
                >
                  {c.header}
                  {isSortable ? sortGlyph(sort, c.field) : ""}
                </chakra.th>
              );
            })}
          </chakra.tr>
        </chakra.thead>

        <chakra.tbody>
          {rows.map((r, idx) => (
            <chakra.tr key={idx} bg={idx % 2 === 0 ? "white" : "gray.50"} _hover={{ bg: "gray.100" }}>
              {table.columns.map((c) => (
                <chakra.td key={c.field} px="12px" py="8px" borderTopWidth="1px" borderColor="gray.100">
                  {String(r?.[c.field] ?? "")}
                </chakra.td>
              ))}
            </chakra.tr>
          ))}
        </chakra.tbody>
      </chakra.table>
    </chakra.div>
  );
}
