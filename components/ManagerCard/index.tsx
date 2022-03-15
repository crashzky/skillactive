import { useRouter } from 'next/router';
import Props from './ManagerCard.props';

const ManagerCard = ({ className = '', username, managerId, isUser, ...props }: Props): JSX.Element => {
	const router = useRouter();

	return (
		<article
			className={className + ' py-5 px-4 rounded-2.5xl shadow-main cursor-pointer'}
			onClick={() => {
				if(isUser)
					router.push('/lk/users/' + managerId);
				else
					router.push('/lk/managers/' + managerId);
			}}
			{...props}
		>
			<p className='font-semibold text-sm'>
				Имя пользователя:
				{' '}
				<span className='text-primary'>
					{username}
				</span>
			</p>
			<p className='font-semibold text-sm mt-2'>
				Id:
				{' '}
				<span className='text-primary'>
					#
					{managerId}
				</span>
			</p>
		</article>
	);
};

export default ManagerCard;
