// Shared UI helper utilities for the timetable

import { buildClassShort } from './timetableUtils';
import type { FlatRecord } from './timetableTypes';

/** Returns a human-readable relative time string (client-side). */
export function relativeTimeClient(iso: string): string {
  const delta = Date.now() - Date.parse(iso);
  const sec = Math.floor(delta / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  if (day >= 1) return day === 1 ? '1 day ago' : `${day} days ago`;
  if (hr >= 1) return hr === 1 ? '1 hour ago' : `${hr} hours ago`;
  if (min >= 1) return min === 1 ? '1 minute ago' : `${min} minutes ago`;
  return 'just now';
}

/** Briefly shows a checkmark on a button, then restores it. */
export function animateButtonSuccess(btn: HTMLElement | null): void {
  if (!btn) return;
  const originalHTML = btn.innerHTML;
  btn.setAttribute('disabled', '');
  const checkSVG = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
  btn.innerHTML = checkSVG + '<span>Done</span>';
  btn.classList.add('success');
  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.classList.remove('success');
    btn.removeAttribute('disabled');
  }, 2000);
}

/**
 * Shows a spinning loader on a button.
 * Returns a restore function to call when the operation completes.
 */
export function setButtonLoading(
  btn: HTMLElement | null,
  label = 'Generating...'
): () => void {
  if (!btn) return () => {};
  const originalHTML = btn.innerHTML;
  btn.setAttribute('disabled', '');
  const spinnerSVG = `<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>`;
  btn.innerHTML = spinnerSVG + `<span>${label}</span>`;
  return () => {
    btn.innerHTML = originalHTML;
    btn.removeAttribute('disabled');
  };
}

/** Counts the number of distinct class groups in a record list. */
export function countDistinctClasses(list: FlatRecord[]): number {
  return new Set(
    list.map(
      (r) =>
        buildClassShort(r) + (r.semester != null ? ` (Sem #${r.semester})` : '')
    )
  ).size;
}
