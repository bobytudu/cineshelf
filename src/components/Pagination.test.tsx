import type { ComponentProps } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Theme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';
import { Pagination } from './Pagination';

function renderPagination(props: ComponentProps<typeof Pagination>) {
  return render(
    <Theme theme={neutralTheme}>
      <Pagination {...props} />
    </Theme>,
  );
}

describe('Pagination', () => {
  it('renders numbered pages and changes page', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    renderPagination({
      currentPage: 2,
      totalPages: 20,
      onPageChange,
    });

    expect(
      screen.getByRole('button', { name: 'Go to page 3' }),
    ).toHaveAttribute('aria-current', 'page');
    expect(
      screen.getByRole('button', { name: 'Go to page 20' }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Go to page 4' }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('hides when there is only one page', () => {
    renderPagination({
      currentPage: 0,
      totalPages: 1,
      onPageChange: vi.fn(),
    });
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});
