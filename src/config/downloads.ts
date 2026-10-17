export interface DownloadItem {
	/** 文件在下载中心显示的名称 */
	name: string;
	/** 文件的一句话描述 */
	description: string;
	/**
	 * 下载链接。可为站内路径（如 /downloads/xxx.pdf，文件放 public/downloads/ 下），
	 * 也可为外链（http(s):// 开头的任意地址，文件不在当前站点）。
	 * 文本类文件（.txt/.md/.csv 等）会被强制下载而非在浏览器中直接预览；
	 * 外链因浏览器安全限制，仅当目标域名允许 CORS 时才能强制下载，否则回退为打开。
	 */
	href: string;
}

export interface DownloadSection {
	/** 栏目标题，如「操作证题库」 */
	title: string;
	/** 该栏目下的文件列表 */
	items: DownloadItem[];
}

/**
 * 下载中心配置
 * ---------------------------------------------------------------
 * 页面 src/content/docs/downloads/index.mdx 会渲染此配置：
 * 每个 section 是一个栏目（如「操作证题库」），其 items 是栏目下的文件卡片。
 *
 * 如何新增一个可下载文件：
 *   1. 站内文件：把文件放到 public/downloads/ 目录下（文件名尽量用英文/拼音，避免空格与中文，防止链接编码问题），
 *      然后加一项：{ name: '显示名称', description: '一句话描述', href: '/downloads/文件名' }
 *   2. 外链文件（文件不在当前站点）：直接写完整网址即可，
 *      例如：{ name: '显示名称', description: '一句话描述', href: 'https://example.com/path/文件.txt' }
 *      —— 外链会在新标签打开；文本文件在目标域名允许 CORS 时强制下载，否则仍为预览。
 *   3. 重新构建（astro build）即可生效。
 *
 * 栏目的增删改也直接在此处维护：增加/删除一个 section 对象即可。
 */
export const downloadSections: DownloadSection[] = [
	{
		title: '操作证题库',
		items: [
			{
				name: '业余电台操作技术能力验证题库',
				description: '业余电台操作技术能力验证题库',
				href: 'https://raw.githubusercontent.com/XUPT-HAM/download-files/refs/heads/main/%E6%93%8D%E4%BD%9C%E8%AF%81%E8%80%83%E8%AF%95%E9%A2%98%E5%BA%93.7z',
			},
		],
	},
	{
		title: '设台文件',
		items: [
			{
				name: '设台申请表',
				description: '设台申请表',
				href: 'https://raw.githubusercontent.com/XUPT-HAM/download-files/refs/heads/main/%E7%94%B5%E5%8F%B0%E7%94%B3%E8%AF%B7%E8%A1%A8%E4%B8%8E%E8%B7%A8%E7%9C%81%E7%94%B3%E8%AF%B7%E4%B9%A6.7z',
			},
		],
	},
	{
		title: '其他',
		items: [
			{
				name: 'CRAC徽标',
				description: '设计QSL卡素材',
				href: 'https://raw.githubusercontent.com/XUPT-HAM/download-files/refs/heads/main/CRAC%E5%BE%BD%E6%A0%87-%E8%AE%BE%E8%AE%A1QSL%E5%8D%A1%E7%B4%A0%E6%9D%90.7z',
			},
		],
	},
];
