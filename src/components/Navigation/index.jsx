import React from 'react';

import NavigationItem from './NavigationItem';
import {
    NavigationWrapper,
    NavigationContainer,
} from 'components/ui/Navigation';

import NavigationIcon from 'components/svg/NavigationIcon';

const Navigation = (props) => {
    const links = [
        {
            link: '/app/settings',
            text: 'Settings',
            icon: <NavigationIcon type="settings" />,
        },
        {
            link: '/app/calendar',
            text: 'Calendar',
            icon: <NavigationIcon type="calendar" />,
        },
        {
            link: '/logout',
            text: 'Logout',
            icon: <NavigationIcon type="logout" />,
        },
    ];

    return (
        <NavigationWrapper>
            <NavigationContainer>
                {links.map((l) => (
                    <NavigationItem
                        key={l.link}
                        link={l.link}
                        icon={l.icon}
                        text={l.text}
                    />
                ))}
            </NavigationContainer>
        </NavigationWrapper>
    );
};

export default Navigation;
