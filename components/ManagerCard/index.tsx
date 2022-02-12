import { useRouter } from 'next/router';
import Props from './ManagerCard.props';

const ManagerCard = ({ className = '', email, username, password, managerId, ...props }: Props): JSX.Element => {
	const router = useRouter();

	return (
		<article
			className={className + ' py-5 px-4 rounded-2.5xl shadow-main'}
			onClick={() => router.push('/lk/managers/' + managerId)}
			{...props}
		>
			<p className='font-semibold text-sm'>
				Email:
				{' '}
				<span className='text-primary'>
					{email}
				</span>
			</p>
			<p className='font-semibold text-sm mt-2'>
				Имя пользователя:
				{' '}
				<span className='text-primary'>
					{username}
				</span>
			</p>
			<p className='font-semibold text-sm mt-2'>
				Пароль:
				{' '}
				<span className='text-primary'>
					{password}
				</span>
			</p>
		</article>
	);
};

export default ManagerCard;
