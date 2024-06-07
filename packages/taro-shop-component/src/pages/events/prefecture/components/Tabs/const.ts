export interface TabItem {
    label: string;
    value: string | number;
}

export interface IETabsProps {
    tabs: TabItem[];
    activeTab: string | number;
    onChange?(p: string | number): void;
}