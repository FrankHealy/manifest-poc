import React from "react";
import { chakra } from "@chakra-ui/react";

type Tab = { title: string };

export function renderTabs(
  tabs: Tab[],
  activeTab: number,
  setActiveTab: React.Dispatch<React.SetStateAction<number>>
): React.ReactNode {
  return (
    <chakra.div display="flex" gap="8px" borderBottomWidth="1px" borderColor="gray.200">
      {tabs.map((t, idx) => {
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
  );
}
