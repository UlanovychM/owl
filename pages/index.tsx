import { GetStaticProps } from 'next';
import { Htag, Button, P, Tag, Rating, Input, Textarea } from '@/components/';
import { useState } from 'react';
import { withLayout } from '@/layout/Layout';
import { MenuItem } from '@/interface/menu.interface';
import axios from 'axios';
import { API } from '@/helpers/api';

function Home({ menu }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(4);

	return (
		<>
			<Htag tag='h1'>РРРРР</Htag>
			<Button appearance='primary' arrow='right'>
				Button
			</Button>
			<Button appearance='ghost' arrow='right'>
				Button
			</Button>
			<P size='l'>asdasdasd</P>
			<P>asdasdasd</P>
			<P size='s'>asdasdasd</P>

			<Tag size='m' color='green'>
				green
			</Tag>
			<Tag size='s' color='red'>
				green
			</Tag>

			<Rating rating={rating} isEditable={true} setRating={setRating} />
			<Input placeholder='test' />
			<Textarea placeholder='aa' />
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory,
	});

	return {
		props: {
			menu,
			firstCategory,
		},
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
