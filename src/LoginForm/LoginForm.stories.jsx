import React from 'react';
import LoginForm from './LoginForm';

export default {
  title: 'Example/LoginForm',
  component: LoginForm,
};

const Template = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onLogin: () => alert('Redirecting...'),
};
