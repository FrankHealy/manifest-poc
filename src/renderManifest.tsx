import React from "react";
import { chakra } from "@chakra-ui/react";

/* ---------------- Types ---------------- */

type Manifest = {
  tabs: { title: string; body: any }[];
};

type SortDir = "asc" | "desc";
type SortState = { col: string; dir: SortDir } | null;

function nextSort(current: SortState, col: string): SortState {
  if (!current || current.col !== col) return { col, dir: "asc" };
  if (current.dir === "asc") return { col, dir: "desc" };
  return null;
}

function sortGlyph(sort: SortState, col: string) {
  if (!sort || sort.col !== col) return "";
  return sort.dir === "asc" ? " ▲" : " ▼";
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

/* ---------------- Component ---------------- */

export function RenderManifest({ manifest }: { manifest: Manifest }) {
  const [activeTab, setActiveTab] = React.useState(0);
  const tab = manifest.tabs[activeTab];

  const [sortByTable, setSortByTable] = React.useState<Record<string, SortState>>({});
  const getSort = (id: string) => sortByTable[id] ?? null;
  const toggleSort = (id: string, col: string) =>
    setSortByTable((p) => ({ ...p, [id]: nextSort(p[id] ?? null, col) }));

  const [open, setOpen] = React.useState<Record<string, boolean>>({
    general: true,
    siu: false,
    cics: false
  });

  const [searchText, setSearchText] = React.useState("");
  const [filter1, setFilter1] = React.useState("Any");

  // layout tokens
  const W = "6xl";

  return (
    <chakra.div>
      <chakra.div maxW={W} mx="auto" px="24px" py="24px">
        {/* Tabs */}
        <chakra.div display="flex" gap="8px" borderBottomWidth="1px" borderColor="gray.200">
          {manifest.tabs.map((t, idx) => {
            const selected = idx === activeTab;
            return (
              <chakra.button
                key={t.title}
                type="button"
                px="12px"
                py="12px"
                fontSize="lg"
                color={selected ? "gray.900" : "gray.700"}
                fontWeight={selected ? "bold" : "normal"}
                borderBottomWidth="2px"
                borderColor={selected ? "brand.600" : "transparent"}
                _hover={{ textDecoration: "underline" }}
                onClick={() => setActiveTab(idx)}
              >
                {t.title}
              </chakra.button>
            );
          })}
        </chakra.div>

        <chakra.div pt="16px">
          {tab?.body?.type === "screen" ? (
            <>
              {/* Search + Filters */}
              <chakra.div display="flex" gap="16px" flexWrap="wrap">
                <chakra.div flex="1" minW="360px" borderWidth="1px" rounded="md" p="16px">
                  <chakra.h3 fontSize="sm" fontWeight="semibold" mb="12px" color="brand.600">
                    {tab.body.searchPanelTitle ?? "Search"}
                  </chakra.h3>

                  <chakra.div display="flex" gap="8px">
                    <chakra.input
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="Search"
                      borderWidth="1px"
                      borderColor="gray.200"
                      rounded="md"
                      px="12px"
                      py="8px"
                      flex="1"
                    />
                    <chakra.button
                      type="button"
                      px="14px"
                      py="8px"
                      rounded="md"
                      borderWidth="1px"
                      borderColor="gray.200"
                      _hover={{ bg: "gray.50" }}
                      onClick={() => {
                        // POC: no-op (read-only screen)
                      }}
                    >
                      Search
                    </chakra.button>
                  </chakra.div>
                </chakra.div>

                <chakra.div flex="1" minW="360px" borderWidth="1px" rounded="md" p="16px">
                  <chakra.h3 fontSize="sm" fontWeight="semibold" mb="12px" color="brand.600">
                    {tab.body.filtersPanelTitle ?? "Quick Filters"}
                  </chakra.h3>

                  <chakra.div fontSize="sm" mb="6px" color="gray.600">
                    Filter 1
                  </chakra.div>

                  <chakra.select
                    value={filter1}
                    onChange={(e) => setFilter1(e.target.value)}
                    borderWidth="1px"
                    borderColor="gray.200"
                    rounded="md"
                    px="10px"
                    py="8px"
                    width="100%"
                  >
                    <option value="Any">Any</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="Pending">Pending</option>
                  </chakra.select>
                </chakra.div>
              </chakra.div>

              {/* Results */}
              <chakra.div mt="24px">
                <DataTable
                  title={tab.body.resultsTitle ?? "Results"}
                  table={tab.body.results}
                  getSort={getSort}
                  toggleSort={toggleSort}
                />
              </chakra.div>

              {/* Accordion: no "Results section" label */}
              <chakra.div mt="24px" display="flex" flexDirection="column" gap="8px">
                {(tab.body.accordion?.items ?? []).map((item: any) => {
                  const key = String(item.title).toLowerCase().replace(/\s+/g, "-");
                  const isOpen = !!open[key];

                  return (
                    <chakra.div key={key} borderWidth="1px" rounded="md" overflow="hidden">
                      <chakra.button
                        type="button"
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        bg="brand.600"
                        color="white"
                        px="16px"
                        py="12px"
                        _hover={{ bg: "brand.700" }}
                        onClick={() => setOpen((p) => ({ ...p, [key]: !p[key] }))}
                      >
                        <chakra.span fontWeight="bold">{item.title}</chakra.span>
                        <chakra.span aria-hidden="true">{isOpen ? "▾" : "▸"}</chakra.span>
                      </chakra.button>

                      {isOpen ? (
                        <chakra.div p="16px">
                          <DataTable
                            title={item.title}
                            table={item.table}
                            getSort={getSort}
                            toggleSort={toggleSort}
                            hideTitle
                          />
                        </chakra.div>
                      ) : null}
                    </chakra.div>
                  );
                })}
              </chakra.div>
            </>
          ) : (
            <chakra.div borderWidth="1px" rounded="md" p="16px" color="gray.500">
              Placeholder
            </chakra.div>
          )}
        </chakra.div>
      </chakra.div>
    </chakra.div>
  );
}

/* ---------------- Table ---------------- */

function DataTable({
  title,
  table,
  getSort,
  toggleSort,
  hideTitle
}: {
  title: string;
  table: {
    id: string;
    columns: { header: string; field: string }[];
    rows: Record<string, any>[];
    sortableColumns?: string[];
  };
  getSort: (id: string) => SortState;
  toggleSort: (id: string, col: string) => void;
  hideTitle?: boolean;
}) {
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
