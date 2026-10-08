/**
 * 社员风采数据配置
 * --------------------------------------------------------------------------
 * 所有「社员风采」页面的内容都在这里配置，无需改动页面代码。
 *
 * 每个人（Member）可填的字段都是可选的；页面网格里默认只展示
 * 「主标识」：呼号 > SWL 呼号 > 网名 ID > 真实姓名 > “匿名成员”，
 * 点开名片后展开所有「非空」字段。
 *
 * 头像：把图片放进 public/members/ 目录（例如 public/members/xupt-icon.png），
 * 这里填相对站点的绝对路径，如 avatar: '/members/xupt-icon.png'。
 * 留空则不显示头像（用首字占位）。
 */

export interface Member {
	/** 呼号，例如 BG9ABC */
	callSign?: string;
	/** SWL（收听）呼号，没正式呼号时填这个 */
	swl?: string;
	/** 网名 / 论坛 ID */
	nickname?: string;
	/** 真实姓名 */
	realName?: string;
	/** 学校 */
	school?: string;
	/** 学院 */
	college?: string;
	/** 班级 */
	className?: string;
	/** 现 QTH（常驻地） */
	qth?: string;
	/** E-mail */
	email?: string;
	/** QRZ 主页（完整 URL） */
	qrz?: string;
	/** 个人博客主页（完整 URL） */
	blog?: string;
	/** GitHub 主页（完整 URL，如 https://github.com/用户名） */
	github?: string;
	/** QQ 号 */
	qq?: string;
	/** 备注 */
	note?: string;
	/** 座右铭 */
	motto?: string;
	/** 头像路径，如 '/members/xupt-icon.png'；留空用首字占位 */
	avatar?: string;
}

/** 一个分组（如「2026级」「校外友台」） */
export interface MemberSection {
	title: string;
	members: Member[];
}

/**
 * 字段展示顺序与类型。
 * type: 'text' 普通文本 | 'link' 外链 | 'mail' 邮件链接
 * 调整这里的顺序即可调整名片展开后的字段顺序。
 */
export const memberFields: { key: keyof Member; label: string; type: 'text' | 'link' | 'mail' }[] = [
	{ key: 'callSign', label: '呼号', type: 'text' },
	{ key: 'swl', label: 'SWL 呼号', type: 'text' },
	{ key: 'nickname', label: '网名 ID', type: 'text' },
	{ key: 'realName', label: '真实姓名', type: 'text' },
	{ key: 'school', label: '学校', type: 'text' },
	{ key: 'college', label: '学院', type: 'text' },
	{ key: 'className', label: '班级', type: 'text' },
	{ key: 'qth', label: '现 QTH', type: 'text' },
	{ key: 'email', label: 'E-mail', type: 'mail' },
	{ key: 'qrz', label: 'QRZ 主页', type: 'link' },
	{ key: 'blog', label: '个人博客', type: 'link' },
	{ key: 'github', label: 'GitHub 主页', type: 'link' },
	{ key: 'qq', label: 'QQ', type: 'text' },
	{ key: 'note', label: '备注', type: 'text' },
	{ key: 'motto', label: '座右铭', type: 'text' },
];

/** 主标识：呼号 > SWL 呼号 > 网名 ID > 真实姓名 > 匿名 */
export function memberPrimary(m: Member): string {
	return m.callSign || m.swl || m.nickname || m.realName || '匿名成员';
}

/** 头像首字占位用的字 */
export function memberInitial(m: Member): string {
	return memberPrimary(m).charAt(0);
}

/** 页面分组（顺序即展示顺序） */
export const memberSections: MemberSection[] = [
	{
		title: '现任管理层成员',
		members: [
			{
				callSign: 'BI9COB',
				nickname: 'Monoceros406',
				avatar: '/members/Monoceros406.jpg',
			},
			{
				nickname: 'LHM',
				avatar: '/members/LHM.jpg',
			},
			{
				nickname: '零2探索者',
				avatar: '/members/零2探索者.jpg',
			},
		],
	},
	{
		title: '2026 级',
		members: [

		],
	},
	{
		title: '2025 级',
		members: [
			{
				nickname: 'LHM',
				avatar: '/members/LHM.jpg',
			},
			{
				nickname: '零2探索者',
				avatar: '/members/零2探索者.jpg',
			},
		],
	},
	{
		title: '2024 级',
		members: [

		],
	},
	{
		title: '2023 级',
		members: [
			{
				callSign: 'BI9COB',
				nickname: 'Monoceros406',
				avatar: '/members/Monoceros406.jpg',
			},
		],
	},
	{
		title: '校外友台',
		members: [

		],
	},
];
