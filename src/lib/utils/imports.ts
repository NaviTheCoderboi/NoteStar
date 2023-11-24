/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
const imports = async () => {
	const EditorJS = (await import('@editorjs/editorjs')).default;
	const Header = (await import('@editorjs/header')).default;
	const Paragraph = (await import('@editorjs/paragraph')).default;
	const MarkerTool = (await import('@editorjs/marker')).default;
	const CheckList = (await import('@editorjs/checklist')).default;
	const CodeBox = (await import('@bomdi/codebox')).default;
	const List = (await import('@editorjs/list')).default;
	const Delimiter = (await import('@editorjs/delimiter')).default;
	const Embed = (await import('@editorjs/embed')).default;
	const Link = (await import('@editorjs/link')).default;
	const Quote = (await import('@editorjs/quote')).default;
	const Table = (await import('@editorjs/table')).default;

	return {
		EditorJS,
		Header,
		Paragraph,
		MarkerTool,
		CheckList,
		CodeBox,
		List,
		Delimiter,
		Embed,
		Link,
		Quote,
		Table
	};
};

export default imports;
