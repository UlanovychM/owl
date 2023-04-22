import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declOfNum, priceUa } from '@/helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

export const Product = motion(
	forwardRef(
		(
			{ product, className, ...props }: ProductProps,
			ref: ForwardedRef<HTMLDivElement>
		): JSX.Element => {
			const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
			const reviewRef = useRef<HTMLDivElement>(null);

			const variants = {
				visible: { opacity: 1, height: 'auto' },
				hidden: { opacity: 0, height: 0 },
			};

			const scrollToReview = () => {
				setIsReviewOpened(true);
				reviewRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
				reviewRef.current?.focus();
			};

			return (
				<div className={className} {...props} ref={ref}>
					<Card className={styles.product}>
						<div className={styles.logo}>
							<Image
								src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
								alt={product.title}
								width={70}
								height={70}
							/>
						</div>
						<div className={styles.title}>{product.title}</div>
						<div className={styles.price}>
							<span>
								<span className={styles.visuallyHidden}>ціна</span>
								{priceUa(product.price)}
							</span>

							{product.oldPrice && (
								<Tag className={styles.oldPrice} color='green'>
									<span className={styles.visuallyHidden}>знижка</span>
									{priceUa(product.price - product.oldPrice)}
								</Tag>
							)}
						</div>
						<div className={styles.credit}>
							<span>
								<span className={styles.visuallyHidden}>кредит</span>
								{priceUa(product.credit)}
							</span>
							<span className={styles.month}>/мес.</span>
						</div>
						<div className={styles.rating}>
							<span className={styles.visuallyHidden}>
								{'рейтінг' + (product.reviewAvg ?? product.initialRating)}
							</span>
							<Rating rating={product.reviewAvg ?? product.initialRating} />
						</div>
						<div className={styles.tags}>
							{product.categories.map(c => (
								<Tag key={c} className={styles.category} color='ghost'>
									{c}
								</Tag>
							))}
						</div>
						<div className={styles.priceTitle} aria-hidden={true}>
							ціна
						</div>
						<div className={styles.creditTitle} aria-hidden={true}>
							кредит
						</div>
						<div className={styles.rateTitle}>
							<a href='#ref' onClick={scrollToReview}>
								{product.reviewCount}
								{declOfNum(product.reviewCount, [
									'відгук',
									'відгука',
									'відгуків',
								])}
							</a>
						</div>
						<Divider className={cn(styles.hr, styles.hr2)} />

						<div className={styles.description}>{product.description}</div>
						<div className={styles.feature}>
							{product.characteristics.map(c => (
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
									arrow={isReviewOpened ? 'down' : 'right'}
									className={styles.reviewButton}
									onClick={() => setIsReviewOpened(!isReviewOpened)}
									aria-expanded={isReviewOpened}
								>
									Читати відгук
								</Button>
							</div>
						</div>
					</Card>
					<motion.div
						animate={isReviewOpened ? 'visible' : 'hidden'}
						variants={variants}
						initial='hidden'
					>
						<Card
							color='blue'
							className={cn(styles.reviews)}
							ref={reviewRef}
							tabIndex={isReviewOpened ? 0 : -1}
						>
							{product.reviews.map(r => (
								<div key={r._id}>
									<Review review={r} />
									<Divider />
								</div>
							))}
							<ReviewForm productID={product._id} isOpened={isReviewOpened} />
						</Card>
					</motion.div>
				</div>
			);
		}
	)
);
