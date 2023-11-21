// Tab.tsx

import React from 'react';

interface TabProps {
    title: string;
    active: boolean;
    onClick: () => void;
}
export
    const Tab: React.FC<TabProps> = ({ title, active, onClick }) => {
        return (
            <li className={`tab ${active ? 'active' : ''}`} onClick={onClick}>
                {title}
            </li>
        );
    };


