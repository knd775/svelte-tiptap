import { render, act } from '@testing-library/svelte';
import StarterKit from '@tiptap/starter-kit';

import { BubbleMenu, Editor } from '$lib';
import BubbleMenuComponent from './components/BubbleMenu.svelte';

afterEach(() => {
  jest.useRealTimers();
});

it('should render the bubble menu correctly', async () => {
  jest.useFakeTimers();

  const editor = new Editor({
    content: 'Hello world!',
    extensions: [StarterKit],
  });

  const { getByTestId, container } = render(BubbleMenuComponent, { editor });
  await act();

  editor.chain().selectAll().focus().run();
  await act();
  jest.runAllTimers();

  expect(container.querySelector('[data-tippy-root]')).toBeTruthy();
  expect(getByTestId('bold-button')).toBeDefined();
});

it('should throw error if editor instance is not provided', () => {
  expect(() => { render(BubbleMenu); }).toThrow();
});
