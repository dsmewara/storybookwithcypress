import React, { useState } from 'react';
import { within, userEvent, expect } from '@storybook/test';
import { fn } from '@storybook/test';
import LoginForm from './LoginForm';

export default {
  title: 'Components/LoginForm',
  component: LoginForm,
};

const Template = (args) => <LoginForm {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: { email: 'admin@example.com' },
};

export const WithRememberChecked = {
  args: {
    remember: true,
  },
};

export const InteractionTest = {
  args: {
    onSubmit: fn(),
    onForgotPassword: fn(),
    onLogout: fn(),
    user: null,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByTestId('email-input');
    const passwordInput = canvas.getByTestId('password-input');
    const rememberCheckbox = canvas.getByTestId('remember-checkbox');
    const submitButton = canvas.getByTestId('submit-btn');

    await userEvent.type(emailInput, 'admin@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(rememberCheckbox);
    await userEvent.click(submitButton);

    await expect(args.onSubmit).toHaveBeenCalledWith({
      email: 'admin@example.com',
      password: 'password123',
      remember: true,
    });
  },
};

export const Default = (args) => {
  const [user, setUser] = useState(null);
  return (
    <LoginForm
      {...args}
      user={user}
      onSubmit={({ email, password, remember }) => setUser({ email })}
      onForgotPassword={() => alert('Forgot Password Clicked!')}
      onLogout={() => setUser(null)}
    />
  );
};