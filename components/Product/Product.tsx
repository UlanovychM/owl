import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declOfNum, priceUa } from '@/helpers/helpers';
import { Divider } from '../Divider/Divider';

export const Product = ({
	product,
	className,
	...props
}: ProductProps): JSX.Element => {
	return (
		<Card className={styles.product}>
			<div className={styles.logo}>
				<img
					src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
					alt={product.title}
				/>
			</div>
			<div className={styles.title}>{product.title}</div>
			<div className={styles.price}>
				{priceUa(product.price)}
				{product.oldPrice && (
					<Tag className={styles.oldPrice} color='green'>
						{priceUa(product.price - product.oldPrice)}
					</Tag>
				)}
			</div>
			<div className={styles.credit}>
				{priceUa(product.credit)}
				<span className={styles.month}>/мес.</span>
			</div>
			<div className={styles.rating}>
				<Rating rating={product.reviewAVG ?? product.initialRating} />
			</div>
			<div className={styles.tags}>
				{product.categories.map(c => (
					<Tag key={c} className={styles.category} color='ghost'>
						{c}
					</Tag>
				))}
			</div>
			<div className={styles.priceTitle}>ціна</div>
			<div className={styles.creditTitle}>кредит</div>
			<div className={styles.rateTitle}>
				{product.reviewCount}
				{declOfNum(product.reviewCount, ['відгук', 'відгука', 'відгуків'])}
			</div>
			<Divider className={styles.hr} />

			<div className={styles.description}>{product.description}</div>
			<div className={styles.feature}>
				{product.metaDescription.map(c => (
					<div className={styles.characteristics} key={c.name}>
						<span className={styles.characteristicsName}>{c.name}</span>
						<span className={styles.characteristicsDots}></span>
						<span className={styles.characteristicsValue}>{c.value}</span>
					</div>
				))}
			</div>
			<div className={styles.advBlock}>
				{product.advantages && (
					<div>
						<div className={styles.advTittle}>Перевага</div>
						<div>{product.advantages}</div>
					</div>
				)}
				{product.disadvantages && (
					<div className={styles.disadvantages}>
						<div className={styles.advTittle}>Недоліки</div>
						<div>{product.disadvantages}</div>
					</div>
				)}
				<Divider className={styles.hr} />
				<div className={styles.actions}>
					<Button appearance='primary'>Дізнатись детальніше</Button>
					<Button
						appearance='ghost'
						arrow={'right'}
						className={styles.reviewButton}
					>
						Читати відгук
					</Button>
				</div>
			</div>
		</Card>
	);
};
