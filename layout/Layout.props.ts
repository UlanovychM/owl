import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface LayoutProps
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLParagraphElement>,
		HTMLParagraphElement
	> {
	size?: 's' | 'm' | 'l';
	children: ReactNode;
}
