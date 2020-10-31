import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import Atomap, { AtomapProps } from './Atomap'

export default {
  title: 'Atomap',
  component: Atomap,
} as Meta

const Template: Story<AtomapProps> = (args) => <Atomap {...args} />

export const Test = Template.bind({})
Test.args = {}
