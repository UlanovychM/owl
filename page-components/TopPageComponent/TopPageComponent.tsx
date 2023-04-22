import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import cn from 'classnames';
import { Advantages, Htag, Product, Sort, Tag } from '@/components';
import { HhData } from '@/components/HhData/HhData';
import { TopLevelCategory } from '@/interface/page.interface';
import { SortEnum } from '@/components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReducer } from './sort.reducer';

export const TopPageComponent = ({
	firstCategory,
	page,
	products,
}: TopPageComponentProps): JSX.Element => {
	const [{ products: sortedProducts, sort }, dispathSort] = useReducer(
		sortReducer,
		{
			products,
			sort: SortEnum.Rating,
		}
	);

	const setSort = (sort: SortEnum) => {
		dispathSort({ type: sort });
	};
	useEffect(() => {
		dispathSort({ type: 'reset', initialState: products });
	}, [products]);

	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.title}>
					<Htag tag='h1'>{page.title}</Htag>
					{products && (
						<Tag
							color='gray'
							size='m'
							aria-label={products.length + 'елементів'}
						>
							{products.length}
						</Tag>
					)}
					<Sort sort={sort} setSort={setSort} />
				</div>
				<div role='list'>
					{sortedProducts &&
						sortedProducts.map(p => (
							<Product role='listitem' key={p._id} product={p} />
						))}
				</div>
				<div className={styles.hhTitle}>
					<Htag tag='h2'>Вакансії = {page.category}</Htag>
					<Tag color='red' size='m'>
						hh.ua
					</Tag>
					<span>Сортурувати</span>
				</div>
				{firstCategory == TopLevelCategory.Courses && page.hh && (
					<HhData {...page.hh} />
				)}
				{page.advantages && page.advantages.length > 0 && (
					<>
						<Htag tag='h2'>Переваги</Htag>
						<Advantages advantages={page.advantages} />
					</>
				)}
				{page.seoText && (
					<div
						className={styles.seo}
						dangerouslySetInnerHTML={{ __html: page.seoText }}
					/>
				)}
				<Htag tag='h2'>Отримані навички</Htag>
				{page.tags.map(t => (
					<Tag key={t} color='primary'>
						{t}
					</Tag>
				))}
			</div>
		</>
	);
};
