import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import LayoutComponent from '../Components/Layout';

export default {
    title: 'Layout',
    component: LayoutComponent,
    parameters: {
        layout: 'fullscreen'
    }
} as ComponentMeta<typeof LayoutComponent>;

const Template: ComponentStory<typeof LayoutComponent> = (args) => <LayoutComponent {...args} />

export const Layout = Template.bind({});