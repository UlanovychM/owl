import { Htag, Button, P, Tag, Rating } from '../components/';
import { useState } from 'react';
import { withLayout } from '@/layout/Layout';

function Home(): JSX.Element {
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
		</>
	);
}

export default withLayout(Home);
