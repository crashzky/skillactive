import Props from './CategoryItem.props';
import Link from 'next/link';
import useModal from '../../hooks/useModal';
import { useQuery } from 'react-query';
import { getCategories } from '../../shared/api/categories';

const CategoryItem = ({ title, items, className = '', ...props }: Props): JSX.Element => {
	const toggleShowMenu = useModal((state) => state.toggleShowMenu);

	const categories = useQuery('categories', getCategories);

	return (
		<article className={className + ' p-5'} {...props}>
			<h3 className='text-xl font-bold'>
				{title}
			</h3>
			<div className='mt-px flex gap-x-4 gap-y-1 flex-wrap'>
				{items.map((i, num) => (
					<Link href={i.link + (categories.data && categories.data.find((j) => j.name === i.title).id)} key={num} >
						<a
							className='text-sm text-grey font-semibold lg:hover:text-primary lg:hover:underline'
							onClick={toggleShowMenu}
						>
							{i.title}
						</a>
					</Link>
				))}
			</div>
		</article>
	);
};

export default CategoryItem;
