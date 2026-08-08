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
  it('shows 1-based page label and disables edges', async () => {
    const user = userEvent.setup();
    const onPrev = vi.fn();
    const onNext = vi.fn();

    const { rerender } = renderPagination({
      currentPage: 0,
      totalPages: 5,
      onPrev,
      onNext,
    });

    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(onNext).toHaveBeenCalledOnce();

    rerender(
      <Theme theme={neutralTheme}>
        <Pagination
          currentPage={4}
          totalPages={5}
          onPrev={onPrev}
          onNext={onNext}
        />
      </Theme>,
    );
    expect(screen.getByText('Page 5 of 5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: /previous/i }));
    expect(onPrev).toHaveBeenCalledOnce();
  });
});
