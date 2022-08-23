import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import NavBarComponent from '../Components/NavBar';

export default {
    title: 'NavBar',
    component: NavBarComponent
} as ComponentMeta<typeof NavBarComponent>;

const Template: ComponentStory<typeof NavBarComponent> = (args) => <NavBarComponent {...args} />

export const NavBar = Template.bind({});