import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $insertNodes } from 'lexical';
import { useEffect, useRef } from 'react';

type Props = {
  setText: (html: string) => void;
  htmlString: string;
};

/**
 * エディターに初期値をセットしたり、変更があった場合に値を保存する
 * @param props
 * @constructor
 */
export function OnChangePlugin(props: Props) {
  const [editor] = useLexicalComposerContext();

  // イベントリスナーで安全に使用するために、setText への参照を保存する
  const setText = useRef(props.setText);

  useEffect(() => {
    setText.current = props.setText;
  }, [props.setText]);

  useEffect(() => {
    console.log('update', props.htmlString);
    editor.update(() => {
      // htmlをパースしてエディターの初期値にする
      const parser = new DOMParser();
      const dom = parser.parseFromString(props.htmlString, 'text/html');
      const nodes = $generateNodesFromDOM(editor, dom);
      $getRoot().clear();
      $getRoot().select();
      $insertNodes(nodes);

      // エディターに更新があったらテキストをhtml形式で保存する
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const textInHtml = $generateHtmlFromNodes(editor, null);
          setText.current(textInHtml);
        });
      });
    });
  }, [editor, props.htmlString]);

  return null;
}
