import React from "react";
import { chakra } from "@chakra-ui/react";

export function renderSearchAndFilters(
  searchText: string,
  setSearchText: React.Dispatch<React.SetStateAction<string>>,
  filter1: string,
  setFilter1: React.Dispatch<React.SetStateAction<string>>
): React.ReactNode {
  return (
    <chakra.div display="flex" gap="16px" flexWrap="wrap">
      <chakra.div flex="1" minW="360px" borderWidth="1px" rounded="md" p="16px">
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
              // POC:
            }}
          >
            Search
          </chakra.button>
        </chakra.div>
      </chakra.div>

      <chakra.div flex="1" minW="360px" borderWidth="1px" rounded="md" p="16px">
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
          <option value="Any">Filter 1</option>
          <option value="Any">Any</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
          <option value="Pending">Pending</option>
        </chakra.select>
      </chakra.div>
    </chakra.div>
  );
}
