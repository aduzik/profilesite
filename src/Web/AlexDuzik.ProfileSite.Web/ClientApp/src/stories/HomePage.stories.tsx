import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import HomePageComponent from '../Components/HomePage';

export default {
    title: 'HomePage',
    component: HomePageComponent,
    parameters: {
        layout: 'fullscreen'
    }
} as ComponentMeta<typeof HomePageComponent>;

const Template: ComponentStory<typeof HomePageComponent> = (args) => <HomePageComponent {...args} />;

export const HomePage = Template.bind({});