import React from "react";

export interface ITabOption {
	value: string;
	label: string;
}

export interface IUseTabs {
	firstTab?: ITabOption;
	lastTab?: ITabOption;
	tabsLength: number;
	nextTabIndex: number;
	previousTabIndex: number;
	toggleActiveTab: (newTab?: ITabOption) => void;
	activeTabKey: string;
}

export interface IUseTabsProps {
	tabs: ITabOption[];
}

export const useTabs = (props: IUseTabsProps): IUseTabs => {
	const { tabs } = props;
	const [activeTab, setActiveTab] = React.useState<ITabOption | undefined>();

	const tabsLength = tabs.length;
	const hasTabs = tabsLength > 0;

	const currentTabIndex = React.useMemo(
		() => tabs.findIndex((x) => x.value === activeTab?.value),
		[activeTab?.value, tabs]
	);

	const nextTabIndex = currentTabIndex + 1;
	const previousTabIndex = currentTabIndex - 1;

	const firstTab = React.useMemo(() => (hasTabs ? tabs[0] : undefined), [hasTabs, tabs]);

	const lastTab = React.useMemo(() => (hasTabs ? tabs[tabsLength - 1] : undefined), [hasTabs, tabs, tabsLength]);

	const toggleActiveTab = (newTab?: ITabOption) => setActiveTab(newTab);

	return {
		tabsLength,
		firstTab,
		lastTab,
		nextTabIndex,
		previousTabIndex,
		toggleActiveTab,
		activeTabKey: activeTab?.value ?? "",
	};
};
