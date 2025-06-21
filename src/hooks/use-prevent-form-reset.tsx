'use client';

import { useEffect } from 'react';

/**
 * サーバー側でフォームエラーが発生した時のフォームリセットを防ぐ
 * https://github.com/edmundhung/conform/issues/681
 * @param formId @conform-to/react の useFrom() の戻り値の form.id
 */
export const UsePreventFormReset = ({ formId }: { formId: string }) => {
  useEffect(() => {
    const preventDefault = (event: Event) => {
      if (event.target === document.forms.namedItem(formId)) {
        event.preventDefault();
      }
    };

    document.addEventListener('reset', preventDefault, true);
    return () => document.removeEventListener('reset', preventDefault, true);
  }, [formId]);
};
