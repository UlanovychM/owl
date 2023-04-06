export interface ProductCharacteristic {
	value: string;
	name: string;
}

export interface ReviewsModule {
	_id: string;
	name: string;
	title: string;
	description: string;
	rating: number;
	createdAt: Date;
}

export interface ProductModel {
	_id: string;
	categories: string[];
	tags: string[];
	title: string;
	link: string;
	price: number;
	credit: number;
	oldPrice: number;
	description: string;
	metaDescription: ProductCharacteristic[];
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	image: string;
	initialRating: number;
	reviews: ReviewsModule[];
	reviewCount: number;
	reviewAVG?: number;
	advantages?: string;
	disadvantages?: string;
}
