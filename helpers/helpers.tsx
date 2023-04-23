import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/cloud.svg';
import BooksIcon from './icons/book.svg';
import ProductsIcon from './icons/box.svg';
import { TopLevelCategory } from '@/interface/page.interface';
import { FirstLevelMenuItem } from '@/interface/menu.interface';

export const firstLevelMenu: FirstLevelMenuItem[] = [
	{
		route: 'courses',
		name: 'Курси',
		icon: <CoursesIcon />,
		id: TopLevelCategory.Courses,
	},
	{
		route: 'services',
		name: 'Сервіси',
		icon: <ServicesIcon />,
		id: TopLevelCategory.Services,
	},
	{
		route: 'books',
		name: 'Книги',
		icon: <BooksIcon />,
		id: TopLevelCategory.Books,
	},
	{
		route: 'products',
		name: 'Товари',
		icon: <ProductsIcon />,
		id: TopLevelCategory.Products,
	},
];

export const priceUa = (price: number): string =>
	price
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
		.concat(' ₴');

export const declOfNum = (
	number: number,
	titles: [string, string, string]
): string => {
	const cases = [2, 0, 1, 1, 1, 2];
	return titles[
		number % 100 > 4 && number % 100 < 20
			? 2
			: cases[number % 10 < 5 ? number % 10 : 5]
	];
};
