import useContest from '../../hooks/useContest';
import ANALYTICS_CONTEST from '../../shared/consts/contestQuestions';
import Props from './ContestHeader.props';

const ContestHeader = ({ className = '', ...props }: Props): JSX.Element => {
	const answers = useContest((state) => state.answers);

	return (
		<header className={className + ' grid gap-1.5 grid-flow-col'} {...props}>
			{ANALYTICS_CONTEST.map((i, num) => (
				<div
					key={num}
					className={'h-[8px] w-full rounded-full ' + (answers.length > num ? 'bg-primary' : 'bg-veryLightGrey')}
				></div>
			))}
		</header>
	);
};

export default ContestHeader;
