import ToolbarPlugin from '@/app/admin/posts/_components/editor/components/toolbar-plugin';
import editorTheme from '@/app/admin/posts/_components/editor/lib/editor-theme';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ParagraphNode, TextNode } from 'lexical';
import { useState } from 'react';
import '../styles-editor.css';
import { OnChangePlugin } from './on-change-plugin';

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

export function Editor({ value, onChange }: Props) {
  const [initialHtmlString] = useState(value || ''); //初期値をキャプチャーする

  const initialConfig = {
    namespace: '',
    theme: editorTheme,
    onError(error: any) {
      throw error;
    },
    nodes: [
      ParagraphNode,
      TextNode,
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={'本文...'}
                placeholder={<div className="editor-placeholder">本文...</div>}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>
      <ListPlugin />
      <LinkPlugin />
      <OnChangePlugin setText={onChange} htmlString={initialHtmlString} />
    </LexicalComposer>
  );
}
