import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import CloseIcon from './x.svg';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '@/helpers/api';
import { da } from 'date-fns/locale';
import { useState } from 'react';

export const ReviewForm = ({
	productID,
	className,
	isOpened,
	...props
}: ReviewFormProps): JSX.Element => {
	const {
		register,
		control,
		handleSubmit,
		reset,
		clearErrors,
		formState: { errors },
	} = useForm<IReviewForm>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSentResponse>(
				API.review.createDemo,
				{
					...formData,
					productID,
				}
			);
			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setError('Щось пішло не так');
			}
		} catch (e) {
			if (e instanceof Error) {
				setError(e.message);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					{...register('name', {
						required: { value: true, message: 'Заповніть поле' },
					})}
					placeholder="ім'я"
					error={errors.name}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.name ? true : false}
				/>
				<Input
					{...register('title', {
						required: { value: true, message: 'Заповніть поле' },
					})}
					className={styles.title}
					placeholder='Загаловко відгука'
					error={errors.title}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.title ? true : false}
				/>
				<div className={styles.rating}>
					<span>Оцінка:</span>
					<Controller
						control={control}
						rules={{
							required: { value: true, message: 'Вкажіть рейтинг' },
						}}
						name='rating'
						render={({ field }) => (
							<Rating
								isEditable
								rating={field.value}
								setRating={field.onChange}
								ref={field.ref}
								error={errors.rating}
								tabIndex={isOpened ? 0 : -1}
							/>
						)}
					/>
				</div>
				<Textarea
					{...register('description', {
						required: { value: true, message: 'Заповніть поле' },
					})}
					placeholder='Текст відгуку'
					className={styles.description}
					error={errors.description}
					tabIndex={isOpened ? 0 : -1}
					aria-label='Текст відгуку'
					aria-invalid={errors.description ? true : false}
				/>
				<div className={styles.submit}>
					<Button
						appearance='primary'
						tabIndex={isOpened ? 0 : -1}
						onClick={() => clearErrors()}
					>
						Відправити
					</Button>
					<span className={styles.info}>
						* Перед публікацією відгук пройде попередню модерацію і перевірку
					</span>
				</div>
			</div>
			{isSuccess && (
				<div className={cn(styles.success, styles.panel)}>
					<div className={styles.successTitle}>Ваш відгук відправлен</div>
					<div>Дякую, Ваш відгук буде опублікований після перевіки!</div>
					<CloseIcon
						className={styles.close}
						onClick={() => setIsSuccess(false)}
					/>
				</div>
			)}
			{error && (
				<div className={cn(styles.error, styles.panel)}>
					Шось пішло не так, оновіть сторінку
					<CloseIcon
						className={styles.close}
						onClick={() => setError(undefined)}
					/>
				</div>
			)}
		</form>
	);
};
