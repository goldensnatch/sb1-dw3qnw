import * as React from "react";
import { cn } from "../../lib/utils";

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({ 
  className, 
  defaultValue, 
  value, 
  onValueChange, 
  children,
  ...props 
}: TabsProps) {
  const [selectedTab, setSelectedTab] = React.useState(value || defaultValue);

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedTab(value);
    }
  }, [value]);

  const handleTabChange = (newValue: string) => {
    setSelectedTab(newValue);
    onValueChange?.(newValue);
  };

  const contextValue = React.useMemo(() => ({
    selectedTab,
    onSelect: handleTabChange
  }), [selectedTab]);

  return (
    <div 
      className={cn("w-full", className)} 
      {...props}
      data-state={selectedTab}
    >
      <TabsContext.Provider value={contextValue}>
        {children}
      </TabsContext.Provider>
    </div>
  );
}

interface TabsContextType {
  selectedTab?: string;
  onSelect: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType | null>(null);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
}

export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1",
        className
      )}
      {...props}
    />
  );
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({ className, value, children, ...props }: TabsTriggerProps) {
  const { selectedTab, onSelect } = useTabsContext();
  const isSelected = selectedTab === value;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isSelected && "bg-white text-gray-950 shadow-sm",
        className
      )}
      onClick={() => onSelect(value)}
      data-state={isSelected ? "active" : "inactive"}
      {...props}
    >
      {children}
    </button>
  );
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({ className, value, children, ...props }: TabsContentProps) {
  const { selectedTab } = useTabsContext();
  const isSelected = selectedTab === value;

  if (!isSelected) return null;

  return (
    <div
      className={cn("mt-2", className)}
      data-state={isSelected ? "active" : "inactive"}
      {...props}
    >
      {children}
    </div>
  );
}