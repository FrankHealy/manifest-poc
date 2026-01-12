export type Manifest = {
  title?: string;
  tabs: { title: string; body: Node }[];
};

export type DataTable = {
  id?: string;
  sortableColumns?: string[];
  columns: { header: string; field: string }[];
  rows: Record<string, string>[];
};

export type Node =
  | { type: "stack"; children: Node[] }
  | { type: "row"; left: Node; right?: Node }
  | { type: "panel"; title: string }
  | { type: "table"; title: string }
  | { type: "accordion"; title: string }
  | {
      type: "screen";
      searchPanelTitle?: string;
      filtersPanelTitle?: string;
      resultsTitle?: string;
      results?: DataTable;
      accordion?: {
        items: { title: string; table?: DataTable }[];
      };
    }
  | { type: "placeholder"; title?: string; message?: string };
