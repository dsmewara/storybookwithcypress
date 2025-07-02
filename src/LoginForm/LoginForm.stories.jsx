// src/components/LoginForm.stories.jsx
import React from 'react';
import LoginForm from './LoginForm';

export default {
  title: 'Components/LoginForm',
  component: LoginForm,
};

const Template = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: (data) => alert(`Submitted: ${JSON.stringify(data)}`),
  onForgotPassword: () => alert('Forgot Password clicked!'),
};

export const WithRememberChecked = Template.bind({});
WithRememberChecked.args = {
  onSubmit: (data) => alert(`Submitted: ${JSON.stringify(data)}`),
  onForgotPassword: () => alert('Forgot Password clicked!'),
};

export const InvalidInputs = Template.bind({});
InvalidInputs.args = {
  onSubmit: () => {},
  onForgotPassword: () => {},
};
