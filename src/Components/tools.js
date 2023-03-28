import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Code from '@editorjs/code'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Underline from '@editorjs/underline';
import { ColorPlugin } from 'editorjs-text-color-plugin'
import Strikethrough from '@sotaproject/strikethrough';
import ChangeCase from 'editorjs-change-case';
import LinkTool from '@editorjs/link'
import NestedList from '@editorjs/nested-list';
import editorjsNestedChecklist from '@calumk/editorjs-nested-checklist';

export const EDITOR_JS_TOOLS = {
    // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
    // paragraph: Paragraph,
    embed: Embed,
    table: Table,
    list: List,
    underline:Underline,
    code: Code,
    linkTool: LinkTool,
    paragraph:Paragraph,
    colorplugin: ColorPlugin,
    strikethrough:Strikethrough,
    changecase:ChangeCase,
    nestedlist:NestedList,
    editornestedlist: editorjsNestedChecklist,
  
  
    header: Header,
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
  
    
  }