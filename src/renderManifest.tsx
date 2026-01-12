import React from "react";
import { chakra } from "@chakra-ui/react";
import { renderTabs } from "./renderers/renderTabs";
import { renderSearchAndFilters } from "./renderers/renderSearchAndFilters";
import { renderResults } from "./renderers/renderResults";
import { DataTable } from "./renderers/DataTable";
import type { SortState } from "./renderers/DataTable";

/* ---------------- Types ---------------- */

type Manifest = {
  tabs: { title: string; body: any }[];
};

function nextSort(current: SortState, col: string): SortState {
  if (!current || current.col !== col) return { col, dir: "asc" };
  if (current.dir === "asc") return { col, dir: "desc" };
  return null;
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
        {renderTabs(manifest.tabs, activeTab, setActiveTab)}

        <chakra.div pt="16px">
          {tab?.body?.type === "screen" ? (
            <>
              {/* Search + Filters */}
              {renderSearchAndFilters(searchText, setSearchText, filter1, setFilter1)}

              {/* Results */}
              <chakra.div mt="24px">
                {renderResults(
                  tab.body.resultsTitle ?? "Results",
                  tab.body.results,
                  getSort,
                  toggleSort,
                  DataTable
                )}
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
                        <chakra.span fontWeight="bold" flex="1" textAlign="center">{item.title}</chakra.span>
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



